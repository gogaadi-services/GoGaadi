import { useState, useCallback, useEffect } from 'react';
import { useAuthActionMutation } from '@gogaadi/services';
import { IAuthUser } from '@gogaadi/interfaces';

/**
 * Fetches a single admin/consultant user by numeric id.
 * Calls `get-user` directly — no list fetch.
 * Also handles draft users stored in localStorage.
 * Only active when `enabled` is true.
 */
export const useUserDetailData = (id: string | undefined, enabled: boolean) => {
  const [authAction] = useAuthActionMutation();
  const [record, setRecord] = useState<IAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);

  const fetchRecord = useCallback(async () => {
    if (!id || !enabled) return;
    setIsLoading(true);
    try {
      // Draft user — data stored in localStorage by PeopleManagement
      if (id === 'draft_local' || id.startsWith('draft_')) {
        try {
          const raw = localStorage.getItem('user_detail_draft_data');
          setRecord(raw ? (JSON.parse(raw) as IAuthUser) : null);
        } catch {
          setRecord(null);
        }
        return;
      }

      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        setRecord(null);
        return;
      }

      // Direct API call — only `get-user` fires, no list fetch
      const res = await authAction({ action: 'get-user', userId: numericId })
        .unwrap()
        .catch(() => ({ data: null }));
      setRecord((res.data as IAuthUser) ?? null);
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
