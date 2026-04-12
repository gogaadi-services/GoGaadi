import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '@gogaadi/utils';
import { useAuth, useDebounce, useLoader } from '@gogaadi/hooks';
import { useAuthActionMutation } from '@gogaadi/services';
import { IAuthUser } from '@gogaadi/interfaces';

export const useSharedHeader = () => {
  const navigate = useNavigate();
  const { AdminPath, AuthPath, ConsultantPath } = constants;
  const {
    user,
    isAdmin,
    isConsultant,
    isConsultantMode,
    logout,
    enterConsultantMode,
    exitConsultantMode,
  } = useAuth();
  const [authAction] = useAuthActionMutation();
  const { show: showLoader, hide: hideLoader } = useLoader();

  const consultantMode = isConsultantMode || isConsultant;

  // Menus
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);

  // Notifications
  const [notifications, setNotifications] = useState<IAuthUser[]>([]);

  // Search
  const [ticketSearch, setTicketSearch] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [allUsers, setAllUsers] = useState<IAuthUser[]>([]);
  const debouncedSearch = useDebounce(ticketSearch, 300);

  const genUserId = (role: string, id: number | string): string => {
    const prefix =
      role === 'admin'
        ? 'ADMIN'
        : role === 'consultant'
          ? 'CONSULT'
          : role === 'captain'
            ? 'CAPTAIN'
            : 'USER';
    const num = Number(String(id).replace('draft_', '')) || 0;
    return `${prefix}${String(num).padStart(5, '0')}`;
  };

  const filteredIncidents = useMemo(() => {
    if (!debouncedSearch || debouncedSearch.length < 2) return [];
    const q = debouncedSearch.toLowerCase();
    return allUsers
      .filter((u) => {
        const uid = (
          (u as any).customUserId || genUserId(u.role ?? (u as any).requestedRole ?? 'user', u.id)
        ).toLowerCase();
        const name = (u.name || `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim()).toLowerCase();
        return uid.includes(q) || name.includes(q);
      })
      .slice(0, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, allUsers]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const result = await authAction({ action: 'get-pending-role-requests' }).unwrap();
        setNotifications(result.data || []);
      } catch {
        // non-critical
      }
    };
    const fetchAllUsers = async () => {
      try {
        const result = await authAction({ action: 'get-role-requests' }).unwrap();
        setAllUsers(result.data || []);
      } catch {
        // non-critical
      }
    };
    fetchPendingRequests();
    fetchAllUsers();
  }, [authAction]);

  const userName =
    user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User';

  // Search handlers
  const handleTicketSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketSearch(e.target.value);
    setShowSearchResults(true);
  }, []);

  const handleSelectIncident = useCallback(
    (user: IAuthUser) => {
      setShowSearchResults(false);
      setTicketSearch('');
      const uid = (user as any).customUserId || user.id;
      const url = AdminPath.USER_DETAIL.replace(':id', String(uid));
      window.open(url, '_blank');
    },
    [AdminPath.USER_DETAIL],
  );

  const handleCloseSearchResults = useCallback(() => setShowSearchResults(false), []);

  // Menu handlers
  const handleSettingsOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleSettingsClose = () => setAnchorEl(null);
  const handleNotifOpen = (e: React.MouseEvent<HTMLElement>) => setNotifAnchorEl(e.currentTarget);
  const handleNotifClose = () => setNotifAnchorEl(null);
  const handleNotifClick = () => {
    handleNotifClose();
    navigate(AdminPath.ROLE_REQUESTS);
  };

  const handleNotifItemClick = (u: IAuthUser) => {
    handleNotifClose();
    const uid = (u as any).customUserId || u.id;
    const url = AdminPath.USER_DETAIL.replace(':id', String(uid));
    window.open(url, '_blank');
  };

  // Navigation handlers
  const handleLogout = () => {
    handleSettingsClose();
    logout();
    navigate(AuthPath.SIGNIN);
  };

  const handleProfile = () => {
    handleSettingsClose();
    navigate(consultantMode ? ConsultantPath.PROFILE : AdminPath.PROFILE);
  };

  const handleAddNew = () =>
    navigate(consultantMode ? ConsultantPath.CREATE_NEW : AdminPath.CREATE_NEW);

  const handleConsultantPage = () => {
    handleSettingsClose();
    showLoader('Switching to Consultant Mode...');
    setTimeout(() => {
      enterConsultantMode();
      hideLoader();
      navigate(ConsultantPath.PEOPLE_ACCESS);
    }, 1200);
  };

  const handleAdminPage = () => {
    handleSettingsClose();
    showLoader('Switching to Admin Mode...');
    setTimeout(() => {
      exitConsultantMode();
      hideLoader();
      navigate(AdminPath.DASHBOARD);
    }, 1200);
  };

  const handleLogoClick = () => {
    if (consultantMode) {
      navigate(ConsultantPath.PEOPLE_ACCESS);
    } else {
      navigate(AdminPath.DASHBOARD);
    }
  };

  return {
    // State
    user,
    isAdmin,
    isConsultant,
    isConsultantMode,
    consultantMode,
    userName,
    anchorEl,
    notifAnchorEl,
    notifications,
    ticketSearch,
    showSearchResults,
    filteredIncidents,
    // Handlers
    handleTicketSearchChange,
    handleSelectIncident,
    handleCloseSearchResults,
    handleSettingsOpen,
    handleSettingsClose,
    handleNotifOpen,
    handleNotifClose,
    handleNotifClick,
    handleNotifItemClick,
    handleAddNew,
    handleLogout,
    handleProfile,
    handleConsultantPage,
    handleAdminPage,
    handleLogoClick,
  };
};
