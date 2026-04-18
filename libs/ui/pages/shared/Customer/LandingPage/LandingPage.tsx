import React, { useEffect, useState, useCallback } from 'react';
import { Typography, alpha } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import HailIcon from '@mui/icons-material/Hail';
import CarRentalIcon from '@mui/icons-material/CarRental';
import BuildIcon from '@mui/icons-material/Build';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EvStationIcon from '@mui/icons-material/EvStation';
import StoreIcon from '@mui/icons-material/Store';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SecurityIcon from '@mui/icons-material/Security';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import GroupsIcon from '@mui/icons-material/Groups';
import { Box } from '@gogaadi/component';
import { useNavigate } from 'react-router-dom';
import { constants } from '@gogaadi/utils';
import { useAuthActionMutation } from '@gogaadi/services';
import { useAuth } from '@gogaadi/hooks';
import { AdminPageShell } from '@gogaadi/pages/shared/PageShell';
import { CUSTOMER_ACCESS_CONFIG, CustomerCategory } from '../CustomerAccess/hooks/useCustomerAccess';

// ── Shared ────────────────────────────────────────────────────────────────────

interface CustomerApprovalRow {
  id: number | string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  serviceCategory: string;
}

function getVisuals(color: string) {
  return {
    gradient: `linear-gradient(135deg, ${color}cc 0%, ${color} 100%)`,
    glow: alpha(color, 0.35),
  };
}

const ONBOARDING_KEYS: CustomerCategory[] = ['mobility', 'logistics', 'parcel'];
const ON_DEMAND_KEYS: CustomerCategory[] = ['driver-hire', 'vehicle-rental', 'mechanic'];
const AUTOMOTIVE_KEYS: CustomerCategory[] = ['petrol-bunk', 'ev-charging', 'showroom'];
const FINANCE_KEYS: CustomerCategory[] = ['vehicle-finance', 'finance-broker', 'insurance'];
const PLATFORM_KEYS: CustomerCategory[] = ['user'];

// ── Access Mode ───────────────────────────────────────────────────────────────

interface AccessType {
  key: CustomerCategory;
  displayName: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  color: string;
  path: string;
}

interface NotifCounts {
  pending: number;
  review: number;
}

function buildAccessTypes(p: typeof constants.AdminPath | typeof constants.ConsultantPath): AccessType[] {
  return [
    { key: 'mobility', displayName: 'Mobility Access', tagline: 'Bikes, Autos, Cabs & Shuttles', description: 'Review and approve mobility operator onboarding requests — two-wheelers, auto rickshaws, cabs, and shuttle services.', icon: DirectionsBusIcon, color: '#6366f1', path: p.MOBILITY_ACCESS },
    { key: 'logistics', displayName: 'Logistics Access', tagline: 'Mini Cargo, Goods & Heavy Trucks', description: 'Review logistics operator requests — Tata Ace, DCM, medium goods vehicles, and heavy truck operators.', icon: LocalShippingIcon, color: '#f59e0b', path: p.LOGISTICS_ACCESS },
    { key: 'parcel', displayName: 'Parcel Access', tagline: 'Last-Mile Delivery Operators', description: 'Review parcel and last-mile delivery operator onboarding requests for documents, food, and goods delivery.', icon: Inventory2Icon, color: '#ea580c', path: p.PARCEL_ACCESS },
    { key: 'driver-hire', displayName: 'Driver Hire Access', tagline: 'Dedicated Driver Providers', description: 'Review and approve driver hire service providers — dedicated drivers for personal, commercial, and fleet use.', icon: HailIcon, color: '#16a34a', path: p.DRIVER_HIRE_ACCESS },
    { key: 'vehicle-rental', displayName: 'Vehicle Rental Access', tagline: 'Self-Drive & Rental Operators', description: 'Review vehicle rental operator onboarding requests for self-drive bookings and rental services.', icon: CarRentalIcon, color: '#7c3aed', path: p.VEHICLE_RENTAL_ACCESS },
    { key: 'mechanic', displayName: 'Mechanic Access', tagline: 'Roadside Repair & Service', description: 'Review mechanic service provider requests — on-demand roadside assistance and scheduled vehicle servicing.', icon: BuildIcon, color: '#78350f', path: p.MECHANIC_ACCESS },
    { key: 'petrol-bunk', displayName: 'Petrol Bunk Access', tagline: 'Fuel Station Partners', description: 'Review petrol bunk and fuel station partner requests — Petrol, Diesel, and CNG stops for the GoGaadi network.', icon: LocalGasStationIcon, color: '#dc2626', path: p.PETROL_BUNK_ACCESS },
    { key: 'ev-charging', displayName: 'EV Charging Access', tagline: 'Electric Vehicle Charging Partners', description: 'Review EV charging station partner onboarding — AC and DC fast chargers mapped for electric vehicle operators.', icon: EvStationIcon, color: '#059669', path: p.EV_CHARGING_ACCESS },
    { key: 'showroom', displayName: 'Showroom Access', tagline: 'Vehicle Dealership Partners', description: 'Review vehicle showroom and dealership partner requests — new and used vehicle listings connected to the platform.', icon: StoreIcon, color: '#1d4ed8', path: p.SHOWROOM_ACCESS },
    { key: 'vehicle-finance', displayName: 'Vehicle Finance Access', tagline: 'Auto Loan & Finance Providers', description: 'Review vehicle finance institution onboarding — banks and NBFCs offering instant vehicle loans and EMI plans.', icon: AccountBalanceIcon, color: '#9333ea', path: p.VEHICLE_FINANCE_ACCESS },
    { key: 'finance-broker', displayName: 'Finance Broker Access', tagline: 'DSA & Loan Agent Partners', description: 'Review finance broker and DSA agent onboarding requests — loan facilitators earning referral commissions.', icon: HandshakeIcon, color: '#0f766e', path: p.FINANCE_BROKER_ACCESS },
    { key: 'insurance', displayName: 'Insurance Access', tagline: 'Vehicle & Driver Insurance Partners', description: 'Review insurance provider onboarding — vehicle insurance, health cover, and driver protection plan providers.', icon: SecurityIcon, color: '#166534', path: p.INSURANCE_ACCESS },
    { key: 'user', displayName: 'User Access', tagline: 'Platform User Registrations', description: 'Review and approve platform user registration requests — grant or deny access to the GoGaadi application.', icon: PersonSearchIcon, color: '#be185d', path: p.USER_ACCESS },
  ];
}

const AccessCard = ({
  item,
  counts,
  onClick,
}: {
  item: AccessType;
  counts: NotifCounts;
  onClick: () => void;
}) => {
  const { gradient, glow } = getVisuals(item.color);
  const Icon = item.icon;
  const total = counts.pending + counts.review;
  const hasNotif = total > 0;

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        background: 'background.paper',
        border: hasNotif ? `1.5px solid ${alpha(item.color, 0.4)}` : '1.5px solid transparent',
        boxShadow: hasNotif
          ? `0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px ${alpha(item.color, 0.15)}`
          : '0 2px 8px rgba(0,0,0,0.06)',
        borderRadius: '16px',
        p: 3,
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        '&:hover': {
          border: `1.5px solid ${item.color}`,
          boxShadow: `0 0 0 3px ${glow}, 0 12px 40px rgba(0,0,0,0.12)`,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: gradient, borderRadius: '16px 16px 0 0' }} />
      {hasNotif && (
        <Box sx={{ position: 'absolute', top: 10, right: 12, display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#ef4444', color: '#fff', borderRadius: '20px', px: 1, py: '2px', minWidth: 22, justifyContent: 'center', zIndex: 1 }}>
          <NotificationsActiveIcon sx={{ fontSize: '0.7rem' }} />
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, lineHeight: 1 }}>{total > 99 ? '99+' : total}</Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mt: 0.5 }}>
        <Box sx={{ position: 'relative', width: 52, height: 52, borderRadius: '14px', background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 18px ${glow}`, flexShrink: 0 }}>
          <Icon sx={{ fontSize: 26, color: '#fff' }} />
          {hasNotif && <Box sx={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444', border: '2px solid #fff' }} />}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2, pr: hasNotif ? 5 : 0 }}>{item.displayName}</Typography>
          <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 500, mt: 0.25 }}>{item.tagline}</Typography>
        </Box>
      </Box>
      <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', lineHeight: 1.65, mt: 2 }}>{item.description}</Typography>
      {hasNotif && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 2, px: 1.5, py: 1, borderRadius: '10px', bgcolor: alpha('#ef4444', 0.06), border: `1px solid ${alpha('#ef4444', 0.15)}` }}>
          {counts.pending > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <FiberManualRecordIcon sx={{ fontSize: '0.55rem', color: '#d97706' }} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706' }}>{counts.pending} pending</Typography>
            </Box>
          )}
          {counts.pending > 0 && counts.review > 0 && <Box sx={{ width: '1px', height: 12, bgcolor: 'divider' }} />}
          {counts.review > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <FiberManualRecordIcon sx={{ fontSize: '0.55rem', color: '#2563eb' }} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb' }}>{counts.review} in review</Typography>
            </Box>
          )}
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: hasNotif ? 1.5 : 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: hasNotif ? 1 : 0.55, transition: 'opacity 0.2s', '.MuiBox-root:hover &': { opacity: 1 } }}>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: item.color }}>{hasNotif ? 'Review Requests' : 'View Requests'}</Typography>
          <ArrowForwardIcon sx={{ fontSize: '0.9rem', color: item.color }} />
        </Box>
      </Box>
    </Box>
  );
};

const AccessSection = ({
  label,
  keys,
  counts,
  navigate,
  accessTypes,
}: {
  label: string;
  keys: CustomerCategory[];
  counts: Record<string, NotifCounts>;
  navigate: (path: string) => void;
  accessTypes: AccessType[];
}) => {
  const sectionTotal = keys.reduce((sum, k) => sum + (counts[k]?.pending ?? 0) + (counts[k]?.review ?? 0), 0);
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{label}</Typography>
        {sectionTotal > 0 && (
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, bgcolor: alpha('#ef4444', 0.1), color: '#ef4444', borderRadius: '20px', px: 1, py: '1px' }}>
            <NotificationsActiveIcon sx={{ fontSize: '0.65rem' }} />
            <Typography sx={{ fontSize: '0.68rem', fontWeight: 800 }}>{sectionTotal} awaiting</Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2.5, mb: 3 }}>
        {accessTypes.filter((t) => keys.includes(t.key)).map((item) => (
          <AccessCard key={item.key} item={item} counts={counts[item.key] ?? { pending: 0, review: 0 }} onClick={() => navigate(item.path)} />
        ))}
      </Box>
    </>
  );
};

const AccessView = () => {
  const navigate = useNavigate();
  const [authAction] = useAuthActionMutation();
  const [counts, setCounts] = useState<Record<string, NotifCounts>>({});
  const [totalPending, setTotalPending] = useState(0);
  const { isConsultantMode, isConsultant } = useAuth();
  const consultantMode = isConsultantMode || isConsultant;
  const paths = consultantMode ? constants.ConsultantPath : constants.AdminPath;
  const ACCESS_TYPES = buildAccessTypes(paths);

  const fetchCounts = useCallback(async () => {
    try {
      const res = await authAction({ action: 'get-customer-onboardings' })
        .unwrap()
        .catch(() => ({ data: [] }));
      const rows: CustomerApprovalRow[] = res.data ?? [];
      const newCounts: Record<string, NotifCounts> = {};
      for (const item of ACCESS_TYPES) {
        const cfg = CUSTOMER_ACCESS_CONFIG[item.key];
        if (!cfg) continue;
        const categoryRows = rows.filter(cfg.filterFn);
        newCounts[item.key] = {
          pending: categoryRows.filter((r) => r.status === 'pending').length,
          review: categoryRows.filter((r) => r.status === 'under_review').length,
        };
      }
      setCounts(newCounts);
      setTotalPending(rows.filter((r) => r.status === 'pending' || r.status === 'under_review').length);
    } catch {
      setCounts({});
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 3, py: 2.5, background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0ea5e9 100%)', boxShadow: '0 8px 32px rgba(14,165,233,0.3)', borderRadius: '16px', mb: 3 }}>
        <Box sx={{ width: 48, height: 48, borderRadius: '14px', background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(14,165,233,0.4)', flexShrink: 0 }}>
          <PendingActionsIcon sx={{ fontSize: 24, color: '#fff' }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.01em' }}>Customer Access</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>Select a service type to review and approve onboarding requests</Typography>
        </Box>
        {totalPending > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, bgcolor: alpha('#ef4444', 0.2), border: '1px solid rgba(239,68,68,0.4)', borderRadius: '12px', px: 2, py: 1, flexShrink: 0 }}>
            <NotificationsActiveIcon sx={{ fontSize: '1rem', color: '#fca5a5' }} />
            <Box>
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', lineHeight: 1 }}>{totalPending}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.68rem' }}>awaiting review</Typography>
            </Box>
          </Box>
        )}
      </Box>
      <AccessSection label='Consultant Onboarding' keys={ONBOARDING_KEYS} counts={counts} navigate={navigate} accessTypes={ACCESS_TYPES} />
      <AccessSection label='On-Demand Services' keys={ON_DEMAND_KEYS} counts={counts} navigate={navigate} accessTypes={ACCESS_TYPES} />
      <AccessSection label='Automotive Partners' keys={AUTOMOTIVE_KEYS} counts={counts} navigate={navigate} accessTypes={ACCESS_TYPES} />
      <AccessSection label='Finance Partners' keys={FINANCE_KEYS} counts={counts} navigate={navigate} accessTypes={ACCESS_TYPES} />
      <AccessSection label='Platform' keys={PLATFORM_KEYS} counts={counts} navigate={navigate} accessTypes={ACCESS_TYPES} />
    </Box>
  );
};

// ── Management Mode ───────────────────────────────────────────────────────────

interface ManagementType {
  key: string;
  displayName: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  color: string;
  path: string;
}

function buildManagementTypes(p: typeof constants.AdminPath | typeof constants.ConsultantPath): ManagementType[] {
  return [
    { key: 'mobility', displayName: 'Mobility Management', tagline: 'Bikes, Autos, Cabs & Shuttles', description: 'View and manage all approved mobility operators — update status, review profiles, and track activity.', icon: DirectionsBusIcon, color: '#6366f1', path: p.MOBILITY_MANAGEMENT },
    { key: 'logistics', displayName: 'Logistics Management', tagline: 'Mini Cargo, Goods & Heavy Trucks', description: 'View and manage all approved logistics operators — Tata Ace, DCM, medium goods, and heavy truck operators.', icon: LocalShippingIcon, color: '#f59e0b', path: p.LOGISTICS_MANAGEMENT },
    { key: 'parcel', displayName: 'Parcel Management', tagline: 'Last-Mile Delivery Operators', description: 'View and manage all approved parcel delivery operators and their service coverage areas.', icon: Inventory2Icon, color: '#ea580c', path: p.PARCEL_MANAGEMENT },
    { key: 'driver-hire', displayName: 'Driver Hire Management', tagline: 'Dedicated Driver Providers', description: 'View and manage all approved driver hire service providers — monitor assignments and performance.', icon: HailIcon, color: '#16a34a', path: p.DRIVER_HIRE_MANAGEMENT },
    { key: 'vehicle-rental', displayName: 'Vehicle Rental Management', tagline: 'Self-Drive & Rental Operators', description: 'View and manage all approved vehicle rental operators — track fleet availability and booking history.', icon: CarRentalIcon, color: '#7c3aed', path: p.VEHICLE_RENTAL_MANAGEMENT },
    { key: 'mechanic', displayName: 'Mechanic Management', tagline: 'Roadside Repair & Service', description: 'View and manage all approved mechanic service providers — track dispatches and service quality.', icon: BuildIcon, color: '#78350f', path: p.MECHANIC_MANAGEMENT },
    { key: 'petrol-bunk', displayName: 'Petrol Bunk Management', tagline: 'Fuel Station Partners', description: 'View and manage all approved petrol bunk partners — fuel types, locations, and discount configurations.', icon: LocalGasStationIcon, color: '#dc2626', path: p.PETROL_BUNK_MANAGEMENT },
    { key: 'ev-charging', displayName: 'EV Charging Management', tagline: 'Electric Vehicle Charging Partners', description: 'View and manage all approved EV charging station partners — charger types, slots, and availability.', icon: EvStationIcon, color: '#059669', path: p.EV_CHARGING_MANAGEMENT },
    { key: 'showroom', displayName: 'Showroom Management', tagline: 'Vehicle Dealership Partners', description: 'View and manage all approved vehicle showrooms and dealerships — listings, brands, and partner deals.', icon: StoreIcon, color: '#1d4ed8', path: p.SHOWROOM_MANAGEMENT },
    { key: 'vehicle-finance', displayName: 'Vehicle Finance Management', tagline: 'Auto Loan & Finance Providers', description: 'View and manage all approved vehicle finance partners — loan products, interest rates, and approvals.', icon: AccountBalanceIcon, color: '#9333ea', path: p.VEHICLE_FINANCE_MANAGEMENT },
    { key: 'finance-broker', displayName: 'Finance Broker Management', tagline: 'DSA & Loan Agent Partners', description: 'View and manage all approved finance brokers — commissions, lender tie-ups, and referral performance.', icon: HandshakeIcon, color: '#0f766e', path: p.FINANCE_BROKER_MANAGEMENT },
    { key: 'insurance', displayName: 'Insurance Management', tagline: 'Vehicle & Driver Insurance Partners', description: 'View and manage all approved insurance providers — policy types, coverage, and group discount programs.', icon: SecurityIcon, color: '#166534', path: p.INSURANCE_MANAGEMENT },
    { key: 'user', displayName: 'User Management', tagline: 'Platform User Accounts', description: 'View and manage all platform users — toggle status, reset access, and track registration history.', icon: ManageAccountsIcon, color: '#be185d', path: p.USER_MGMT },
  ];
}

const ManagementCard = ({ item, onClick }: { item: ManagementType; onClick: () => void }) => {
  const { gradient, glow } = getVisuals(item.color);
  const Icon = item.icon;
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        background: 'background.paper',
        border: '1.5px solid transparent',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        borderRadius: '16px',
        p: 3,
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        '&:hover': {
          border: `1.5px solid ${item.color}`,
          boxShadow: `0 0 0 3px ${glow}, 0 12px 40px rgba(0,0,0,0.12)`,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: gradient, borderRadius: '16px 16px 0 0' }} />
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mt: 0.5 }}>
        <Box sx={{ width: 52, height: 52, borderRadius: '14px', background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 18px ${glow}`, flexShrink: 0 }}>
          <Icon sx={{ fontSize: 26, color: '#fff' }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2 }}>{item.displayName}</Typography>
          <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 500, mt: 0.25 }}>{item.tagline}</Typography>
        </Box>
      </Box>
      <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', lineHeight: 1.65, mt: 2 }}>{item.description}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.55, transition: 'opacity 0.2s', '.MuiBox-root:hover &': { opacity: 1 } }}>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: item.color }}>Manage</Typography>
          <ArrowForwardIcon sx={{ fontSize: '0.9rem', color: item.color }} />
        </Box>
      </Box>
    </Box>
  );
};

const ManagementSection = ({
  label,
  keys,
  navigate,
  managementTypes,
}: {
  label: string;
  keys: string[];
  navigate: (path: string) => void;
  managementTypes: ManagementType[];
}) => (
  <>
    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.6px', mb: 1.5 }}>{label}</Typography>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2.5, mb: 3 }}>
      {managementTypes.filter((t) => keys.includes(t.key)).map((item) => (
        <ManagementCard key={item.key} item={item} onClick={() => navigate(item.path)} />
      ))}
    </Box>
  </>
);

const ManagementView = () => {
  const navigate = useNavigate();
  const { isConsultantMode, isConsultant } = useAuth();
  const consultantMode = isConsultantMode || isConsultant;
  const paths = consultantMode ? constants.ConsultantPath : constants.AdminPath;
  const MANAGEMENT_TYPES = buildManagementTypes(paths);

  return (
    <AdminPageShell
      mode='hero'
      heroIcon={GroupsIcon}
      heroTitle='Customer Management'
      heroSubtitle='Select a service type to view and manage approved accounts'
    >
      <ManagementSection label='Consultant Onboarding' keys={ONBOARDING_KEYS} navigate={navigate} managementTypes={MANAGEMENT_TYPES} />
      <ManagementSection label='On-Demand Services' keys={ON_DEMAND_KEYS} navigate={navigate} managementTypes={MANAGEMENT_TYPES} />
      <ManagementSection label='Automotive Partners' keys={AUTOMOTIVE_KEYS} navigate={navigate} managementTypes={MANAGEMENT_TYPES} />
      <ManagementSection label='Finance Partners' keys={FINANCE_KEYS} navigate={navigate} managementTypes={MANAGEMENT_TYPES} />
      <ManagementSection label='Platform' keys={PLATFORM_KEYS} navigate={navigate} managementTypes={MANAGEMENT_TYPES} />
    </AdminPageShell>
  );
};

// ── Root ──────────────────────────────────────────────────────────────────────

interface LandingPageProps {
  mode: 'access' | 'management';
}

const LandingPage = ({ mode }: LandingPageProps) => {
  if (mode === 'access') return <AccessView />;
  return <ManagementView />;
};

export const CustomerAccessLanding = () => <LandingPage mode='access' />;
export const CustomerManagementLanding = () => <LandingPage mode='management' />;
export default LandingPage;
