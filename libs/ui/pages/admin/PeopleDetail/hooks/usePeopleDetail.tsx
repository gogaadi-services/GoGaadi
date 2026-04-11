import { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAuthActionMutation } from '@gogaadi/services';
import { useNotification } from '@gogaadi/hooks';
import { CustomerApprovalRow, ApprovalStatus, ApprovalAction } from '../../CustomerApprovals/hooks/useCustomerApprovals';

export type { CustomerApprovalRow, ApprovalStatus, ApprovalAction };

export type DetailContext = 'customer' | 'user';

export const getDetailContext = (pathname: string): DetailContext => {
  if (pathname.includes('/user/')) return 'user';
  if (pathname.includes('/customer/')) return 'customer';
  return 'customer';
};

export const usePeopleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const [authAction] = useAuthActionMutation();
  const notify = useNotification();

  const context = getDetailContext(pathname);

  const [record, setRecord] = useState<CustomerApprovalRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionNotes, setActionNotes] = useState('');
  const [actionTarget, setActionTarget] = useState<{
    type: ApprovalAction;
  } | null>(null);
  const [actionInProgress, setActionInProgress] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      if (context === 'user') {
        // Fetch platform user by ID
        const res = await authAction({ action: 'get-user', id }).unwrap().catch(() => ({ data: null }));
        setRecord(res.data ?? null);
      } else {
        // No single-record endpoint — fetch all and find by ID
        const res = await authAction({ action: 'get-customer-onboardings' }).unwrap().catch(() => ({ data: [] }));
        const rows: CustomerApprovalRow[] = res.data ?? [];
        const found = rows.find((r) => String(r.id) === String(id)) ?? null;
        setRecord(found);
      }
    } catch {
      setRecord(null);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, context]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenAction = (type: ApprovalAction) => {
    setActionTarget({ type });
    setActionNotes('');
  };
  const handleCloseAction = () => {
    setActionTarget(null);
    setActionNotes('');
  };

  const handleConfirmAction = async () => {
    if (!actionTarget || !record) return;
    setActionInProgress(true);
    try {
      const newStatus: ApprovalStatus =
        actionTarget.type === 'approve'
          ? 'approved'
          : actionTarget.type === 'reject'
            ? 'rejected'
            : 'under_review';
      await authAction({
        action: 'update-customer-onboarding',
        onboardingId: record.id,
        data: { status: newStatus, adminNotes: actionNotes || undefined },
      }).unwrap();
      notify.success(`Status updated to ${newStatus}.`);
      handleCloseAction();
      fetchData();
    } catch {
      notify.error('Action failed. Please try again.');
    } finally {
      setActionInProgress(false);
    }
  };

  return {
    id,
    context,
    record,
    isLoading,
    actionTarget,
    actionNotes,
    setActionNotes,
    actionInProgress,
    handleOpenAction,
    handleCloseAction,
    handleConfirmAction,
  };
};
