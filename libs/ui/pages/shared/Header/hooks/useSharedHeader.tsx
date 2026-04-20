import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '@gogaadi/utils';
import { useAuth, useDebounce, useLoader } from '@gogaadi/hooks';
import { useAuthActionMutation } from '@gogaadi/services';
import { IAuthUser } from '@gogaadi/interfaces';

export interface NotificationItem {
  id: string;
  type: 'onboarding' | 'role-request';
  name: string;
  subtitle: string;
  createdAt?: string;
  navigateTo: string;
  color: string;
  status?: string;
  rawUser?: IAuthUser;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const MOBILITY_VT = ['bike', 'scooter', 'auto', 'auto_rickshaw', 'cab', 'hatchback', 'sedan', 'suv', 'shuttle', 'bus', 'minibus'];
const LOGISTICS_VT = ['tata_ace', 'mini_truck', 'mini_cargo', 'dcm', 'medium_goods', 'pickup', 'lorry', 'heavy_truck', 'trailer'];

function getAccessPath(
  cat: string,
  vt: string | undefined,
  P: typeof constants.AdminPath | typeof constants.ConsultantPath,
): string {
  const v = vt?.toLowerCase() ?? '';
  if (['bike', 'scooter'].includes(v)) return P.MOBILITY_BIKE_SCOOTER_ACCESS;
  if (['auto', 'auto_rickshaw'].includes(v)) return P.MOBILITY_AUTO_ACCESS;
  if (['cab', 'hatchback', 'sedan', 'suv'].includes(v)) return P.MOBILITY_CAB_ACCESS;
  if (['shuttle', 'bus', 'minibus'].includes(v)) return P.MOBILITY_SHUTTLE_ACCESS;
  if (['tata_ace', 'mini_truck', 'mini_cargo'].includes(v)) return P.LOGISTICS_MINI_CARGO_ACCESS;
  if (['dcm', 'medium_goods', 'pickup'].includes(v)) return P.LOGISTICS_MEDIUM_GOODS_ACCESS;
  if (['lorry', 'heavy_truck', 'trailer'].includes(v)) return P.LOGISTICS_HEAVY_TRUCK_ACCESS;
  if (MOBILITY_VT.includes(v) || cat === 'mobility') return P.MOBILITY_ACCESS;
  if (LOGISTICS_VT.includes(v) || cat === 'logistics') return P.LOGISTICS_ACCESS;
  const MAP: Record<string, keyof typeof P> = {
    parcel: 'PARCEL_ACCESS',
    'driver-hire': 'DRIVER_HIRE_ACCESS',
    'vehicle-rental': 'VEHICLE_RENTAL_ACCESS',
    'mechanic-hire': 'MECHANIC_ACCESS',
    'petrol-bunk': 'PETROL_BUNK_ACCESS',
    'ev-charging': 'EV_CHARGING_ACCESS',
    showroom: 'SHOWROOM_ACCESS',
    'vehicle-finance': 'VEHICLE_FINANCE_ACCESS',
    'finance-broker': 'FINANCE_BROKER_ACCESS',
    'insurance-partner': 'INSURANCE_ACCESS',
    user: 'USER_ACCESS',
  };
  const key = MAP[cat];
  return key ? (P[key] as string) : P.PEOPLE_ACCESS;
}

function getCategoryLabel(cat: string, vt?: string): string {
  const v = vt?.toLowerCase() ?? '';
  if (['bike', 'scooter'].includes(v)) return 'Bikes & Scooters Access';
  if (['auto', 'auto_rickshaw'].includes(v)) return 'Auto Access';
  if (['cab', 'hatchback', 'sedan', 'suv'].includes(v)) return 'Cab Access';
  if (['shuttle', 'bus', 'minibus'].includes(v)) return 'Shuttle & Bus Access';
  if (['tata_ace', 'mini_truck', 'mini_cargo'].includes(v)) return 'Mini Cargo Access';
  if (['dcm', 'medium_goods', 'pickup'].includes(v)) return 'Medium Goods Access';
  if (['lorry', 'heavy_truck', 'trailer'].includes(v)) return 'Heavy Truck Access';
  const LABELS: Record<string, string> = {
    mobility: 'Mobility Access', logistics: 'Logistics Access',
    parcel: 'Parcel Access', 'driver-hire': 'Driver Hire Access',
    'vehicle-rental': 'Vehicle Rental Access', 'mechanic-hire': 'Mechanic Access',
    'petrol-bunk': 'Petrol Bunk Access', 'ev-charging': 'EV Charging Access',
    showroom: 'Showroom Access', 'vehicle-finance': 'Vehicle Finance Access',
    'finance-broker': 'Finance Broker Access', 'insurance-partner': 'Insurance Access',
    user: 'User Access',
  };
  return LABELS[cat] || 'Customer Access';
}

function getCategoryColor(cat: string, vt?: string): string {
  const v = vt?.toLowerCase() ?? '';
  if (['bike', 'scooter'].includes(v)) return '#6366f1';
  if (['auto', 'auto_rickshaw'].includes(v)) return '#f59e0b';
  if (['cab', 'hatchback', 'sedan', 'suv'].includes(v)) return '#0ea5e9';
  if (['shuttle', 'bus', 'minibus'].includes(v)) return '#16a34a';
  if (['tata_ace', 'mini_truck', 'mini_cargo'].includes(v)) return '#f59e0b';
  if (['dcm', 'medium_goods', 'pickup'].includes(v)) return '#0f766e';
  if (['lorry', 'heavy_truck', 'trailer'].includes(v)) return '#dc2626';
  const COLORS: Record<string, string> = {
    mobility: '#6366f1', logistics: '#16a34a', parcel: '#ea580c',
    'driver-hire': '#f59e0b', 'vehicle-rental': '#7c3aed', 'mechanic-hire': '#78350f',
    'petrol-bunk': '#dc2626', 'ev-charging': '#059669', showroom: '#1d4ed8',
    'vehicle-finance': '#9333ea', 'finance-broker': '#0f766e',
    'insurance-partner': '#166534', user: '#be185d',
  };
  return COLORS[cat] || '#0ea5e9';
}

// ── Hook ─────────────────────────────────────────────────────────────────────

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

  // Unified notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Search
  const [ticketSearch, setTicketSearch] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [allUsers, setAllUsers] = useState<IAuthUser[]>([]);
  const debouncedSearch = useDebounce(ticketSearch, 300);

  const genUserId = (role: string, id: number | string): string => {
    const prefix = role === 'admin' ? 'ADMIN' : role === 'consultant' ? 'CONSULT' : 'USER';
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
    const paths = consultantMode ? ConsultantPath : AdminPath;

    const fetchNotifications = async () => {
      const items: NotificationItem[] = [];

      // ── Pending customer onboardings ────────────────────────────────────────
      try {
        const res = await authAction({ action: 'get-customer-onboardings' }).unwrap();
        const rows: any[] = res.data || [];
        rows
          .filter((r) => r.status === 'pending' || r.status === 'under_review')
          .slice(0, 30)
          .forEach((r) => {
            const cat = (r.serviceCategory as string) || '';
            const vt = r.vehicleType as string | undefined;
            items.push({
              id: `onboarding-${r.id}`,
              type: 'onboarding',
              name: `${r.firstName || ''} ${r.lastName || ''}`.trim() || 'Unknown',
              subtitle: getCategoryLabel(cat, vt),
              createdAt: r.submittedAt || r.createdAt,
              navigateTo: getAccessPath(cat, vt, paths),
              color: getCategoryColor(cat, vt),
              status: r.status,
            });
          });
      } catch { /* non-critical */ }

      // ── Pending role requests (admin only) ─────────────────────────────────
      if (!consultantMode) {
        try {
          const res = await authAction({ action: 'get-pending-role-requests' }).unwrap();
          const users: IAuthUser[] = res.data || [];
          users.forEach((u) => {
            items.push({
              id: `role-${u.id}`,
              type: 'role-request',
              name: u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Unknown',
              subtitle: u.requestedRole === 'admin' ? 'Admin Access Request' : 'Consultant Access Request',
              createdAt: u.createdAt,
              navigateTo: AdminPath.ROLE_REQUESTS,
              color: u.requestedRole === 'admin' ? '#6366f1' : '#0ea5e9',
              rawUser: u,
            });
          });
        } catch { /* non-critical */ }
      }

      setNotifications(items);
    };

    const fetchAllUsers = async () => {
      try {
        const result = await authAction({ action: 'get-role-requests' }).unwrap();
        setAllUsers(result.data || []);
      } catch { /* non-critical */ }
    };

    fetchNotifications();
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authAction, consultantMode]);

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

  const handleNotifItemClick = useCallback(
    (item: NotificationItem) => {
      handleNotifClose();
      navigate(item.navigateTo);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate],
  );

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
      hideLoader();
      enterConsultantMode();
      navigate(ConsultantPath.PEOPLE_ACCESS);
    }, 1200);
  };

  const handleAdminPage = () => {
    handleSettingsClose();
    showLoader('Switching to Admin Mode...');
    setTimeout(() => {
      hideLoader();
      exitConsultantMode();
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
