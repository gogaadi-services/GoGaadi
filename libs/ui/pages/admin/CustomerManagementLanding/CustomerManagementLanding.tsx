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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GroupsIcon from '@mui/icons-material/Groups';
import { Box } from '@gogaadi/component';
import { useNavigate } from 'react-router-dom';
import { constants } from '@gogaadi/utils';
import { useAuth } from '@gogaadi/hooks';
import React from 'react';
import { AdminPageShell } from '../shared';

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

const ONBOARDING: ManagementType['key'][] = ['mobility', 'logistics', 'parcel'];
const ON_DEMAND: ManagementType['key'][] = ['driver-hire', 'vehicle-rental', 'mechanic'];
const AUTOMOTIVE: ManagementType['key'][] = ['petrol-bunk', 'ev-charging', 'showroom'];
const FINANCE: ManagementType['key'][] = ['vehicle-finance', 'finance-broker', 'insurance'];
const PLATFORM: ManagementType['key'][] = ['user'];

function getVisuals(color: string) {
  return {
    gradient: `linear-gradient(135deg, ${color}cc 0%, ${color} 100%)`,
    glow: alpha(color, 0.35),
  };
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
      {/* Accent top bar */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: gradient,
          borderRadius: '16px 16px 0 0',
        }}
      />

      {/* Icon + title */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mt: 0.5 }}>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '14px',
            background: gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 6px 18px ${glow}`,
            flexShrink: 0,
          }}
        >
          <Icon sx={{ fontSize: 26, color: '#fff' }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2 }}>
            {item.displayName}
          </Typography>
          <Typography
            sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 500, mt: 0.25 }}
          >
            {item.tagline}
          </Typography>
        </Box>
      </Box>

      {/* Description */}
      <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', lineHeight: 1.65, mt: 2 }}>
        {item.description}
      </Typography>

      {/* CTA hint */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 2.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            opacity: 0.55,
            transition: 'opacity 0.2s',
            '.MuiBox-root:hover &': { opacity: 1 },
          }}
        >
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: item.color }}>
            Manage
          </Typography>
          <ArrowForwardIcon sx={{ fontSize: '0.9rem', color: item.color }} />
        </Box>
      </Box>
    </Box>
  );
};

const Section = ({
  label,
  keys,
  navigate,
  managementTypes,
}: {
  label: string;
  keys: ManagementType['key'][];
  navigate: (path: string) => void;
  managementTypes: ManagementType[];
}) => (
  <>
    <Typography
      sx={{
        fontSize: '0.72rem',
        fontWeight: 700,
        color: 'text.secondary',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
        mb: 1.5,
      }}
    >
      {label}
    </Typography>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        gap: 2.5,
        mb: 3,
      }}
    >
      {managementTypes.filter((t) => keys.includes(t.key)).map((item) => (
        <ManagementCard key={item.key} item={item} onClick={() => navigate(item.path)} />
      ))}
    </Box>
  </>
);

const CustomerManagementLanding = () => {
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
      <Section label='Captain Onboarding' keys={ONBOARDING} navigate={navigate} managementTypes={MANAGEMENT_TYPES} />
      <Section label='On-Demand Services' keys={ON_DEMAND} navigate={navigate} managementTypes={MANAGEMENT_TYPES} />
      <Section label='Automotive Partners' keys={AUTOMOTIVE} navigate={navigate} managementTypes={MANAGEMENT_TYPES} />
      <Section label='Finance Partners' keys={FINANCE} navigate={navigate} managementTypes={MANAGEMENT_TYPES} />
      <Section label='Platform' keys={PLATFORM} navigate={navigate} managementTypes={MANAGEMENT_TYPES} />
    </AdminPageShell>
  );
};

export default CustomerManagementLanding;
