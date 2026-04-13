import { useState, useCallback, useEffect } from 'react';
import { useAuthActionMutation } from '@gogaadi/services';
import { CustomerApprovalRow } from '../../CustomerApprovals/hooks/useCustomerApprovals';

const parseJson = (v: unknown): unknown => {
  if (typeof v === 'string') {
    try { return JSON.parse(v); } catch { return v; }
  }
  return v;
};

/**
 * Fetches a single customer-onboarding record by id.
 * Calls `get-customer-onboardings` and finds the match locally.
 * Only active when `enabled` is true.
 */
export const useCustomerDetailData = (id: string | undefined, enabled: boolean) => {
  const [authAction] = useAuthActionMutation();
  const [record, setRecord] = useState<CustomerApprovalRow | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);

  const fetchRecord = useCallback(async () => {
    if (!id || !enabled) return;
    setIsLoading(true);
    try {
      const res = await authAction({ action: 'get-customer-onboardings' }).unwrap();
      const all: CustomerApprovalRow[] = (res.data ?? []).map((r: CustomerApprovalRow) => ({
        ...r,
        bundleTypes: parseJson(r.bundleTypes) as string[] | undefined,
        additionalVehicles: parseJson(r.additionalVehicles) as CustomerApprovalRow['additionalVehicles'],
        parcelComboTypes: parseJson(r.parcelComboTypes) as string[] | undefined,
        uploadedFiles: parseJson(r.uploadedFiles) as string[] | undefined,
      }));
      const found =
        all.find((r) => r.customerId === id) ?? all.find((r) => String(r.id) === String(id));
      setRecord(found ?? null);
    } catch {
      setRecord(null);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, enabled]);

  useEffect(() => {
    if (enabled) fetchRecord();
    else { setRecord(null); setIsLoading(false); }
  }, [fetchRecord, enabled]);

  return { record, isLoading, refetch: fetchRecord };
};
