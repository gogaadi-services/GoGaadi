import { Typography, alpha } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GroupsIcon from '@mui/icons-material/Groups';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BusinessIcon from '@mui/icons-material/Business';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HailIcon from '@mui/icons-material/Hail';
import CarRentalIcon from '@mui/icons-material/CarRental';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/Smartphone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BuildIcon from '@mui/icons-material/Build';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EvStationIcon from '@mui/icons-material/EvStation';
import StoreIcon from '@mui/icons-material/Store';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SecurityIcon from '@mui/icons-material/Security';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Box } from '@gogaadi/component';
import { useNavigate } from 'react-router-dom';
import { constants } from '@gogaadi/utils';

type CustomerType =
  | 'mobility'
  | 'logistics'
  | 'parcel'
  | 'user'
  | 'driver-hire'
  | 'vehicle-rental'
  | 'mechanic-hire'
  | 'petrol-bunk'
  | 'ev-charging'
  | 'showroom'
  | 'vehicle-finance'
  | 'finance-broker'
  | 'insurance-partner';

const CUSTOMER_TYPES = [
  // ── Captain Onboarding ───────────────────────────────────────────────────────
  {
    type: 'mobility' as CustomerType,
    displayName: 'Mobility',
    tagline: 'Passenger Transport',
    description:
      'Register a captain for ride-hailing and passenger transport — Bike, Auto Rickshaw, Cab, and Shuttle services across the city or outstation.',
    perks: [
      { icon: TwoWheelerIcon, text: 'Bike, Auto, Cab & Shuttle rides' },
      { icon: AutoAwesomeIcon, text: 'On-demand & scheduled bookings' },
      { icon: DirectionsBusIcon, text: 'City & outstation travel' },
    ],
    icon: DirectionsBusIcon,
    color: '#6366f1',
  },
  {
    type: 'logistics' as CustomerType,
    displayName: 'Logistics',
    tagline: 'Goods Transport',
    description:
      'Onboard a captain for freight and cargo services — Tata Ace, DCM, Lorry, and full-truckload for goods movement across the city or outstation.',
    perks: [
      { icon: LocalShippingIcon, text: 'Tata Ace, DCM & Lorry' },
      { icon: BusinessIcon, text: 'B2B & commercial freight' },
      { icon: AutoAwesomeIcon, text: 'Parcel & bulk cargo' },
    ],
    icon: LocalShippingIcon,
    color: '#f59e0b',
  },
  {
    type: 'parcel' as CustomerType,
    displayName: 'Parcel Delivery',
    tagline: 'Last-Mile Delivery',
    description:
      'Register a captain for parcel and last-mile delivery services — Bike, Auto, and Tata Ace for fast document, food, and goods delivery across the city.',
    perks: [
      { icon: Inventory2Icon, text: 'Documents, food & general goods' },
      { icon: LocationOnIcon, text: 'Local & outstation delivery' },
      { icon: FlashOnIcon, text: 'Same-trip parcel + ride earning' },
    ],
    icon: Inventory2Icon,
    color: '#ea580c',
  },
  // ── On-Demand Services ───────────────────────────────────────────────────────
  {
    type: 'driver-hire' as CustomerType,
    displayName: 'Driver Hire',
    tagline: 'Dedicated Driver Services',
    description:
      'Register a customer who needs a dedicated driver — specify vehicle type, shift hours, number of drivers and daily budget.',
    perks: [
      { icon: HailIcon, text: 'Dedicated driver assignment' },
      { icon: AccessTimeIcon, text: 'Flexible shift configuration' },
      { icon: CurrencyRupeeIcon, text: 'Budget & pricing setup' },
    ],
    icon: HailIcon,
    color: '#16a34a',
  },
  {
    type: 'vehicle-rental' as CustomerType,
    displayName: 'Vehicle Rental',
    tagline: 'Self-Drive & Rentals',
    description:
      'Onboard a customer for vehicle rental — choose the vehicle preference and rental duration for self-drive bookings.',
    perks: [
      { icon: CarRentalIcon, text: 'Self-drive vehicle booking' },
      { icon: CalendarTodayIcon, text: 'Daily, weekly & monthly plans' },
      { icon: DirectionsCarIcon, text: 'Multiple vehicle options' },
    ],
    icon: CarRentalIcon,
    color: '#7c3aed',
  },
  {
    type: 'mechanic-hire' as CustomerType,
    displayName: 'Mechanic Hire',
    tagline: 'On-Demand Roadside Repair',
    description:
      'Register a customer who needs an emergency mechanic — a nearby mechanic is dispatched to resolve the breakdown on the spot.',
    perks: [
      { icon: MyLocationIcon, text: 'Nearest mechanic dispatched' },
      { icon: FlashOnIcon, text: 'Emergency breakdown support' },
      { icon: DirectionsCarIcon, text: 'All vehicle types covered' },
    ],
    icon: BuildIcon,
    color: '#78350f',
  },
  // ── Automotive & Finance Partners ────────────────────────────────────────────
  {
    type: 'petrol-bunk' as CustomerType,
    displayName: 'Petrol Bunk',
    tagline: 'Fuel Station Partner',
    description:
      'Register a petrol bunk or fuel station as a GoGaadi partner — Petrol, Diesel, and CNG refuelling stops mapped on the platform for drivers and customers.',
    perks: [
      { icon: LocalGasStationIcon, text: 'Petrol, Diesel & CNG availability' },
      { icon: MyLocationIcon, text: 'Listed on driver route maps' },
      { icon: CurrencyRupeeIcon, text: 'Offer discounts to GoGaadi users' },
    ],
    icon: LocalGasStationIcon,
    color: '#dc2626',
  },
  {
    type: 'ev-charging' as CustomerType,
    displayName: 'EV Charging Station',
    tagline: 'Electric Vehicle Charging Partner',
    description:
      'Onboard an EV charging point as a platform partner — visible to all electric vehicle operators and riders for fast and scheduled charging.',
    perks: [
      { icon: EvStationIcon, text: 'AC & DC fast charger support' },
      { icon: MyLocationIcon, text: 'Mapped for EV drivers' },
      { icon: FlashOnIcon, text: 'Scheduled slot booking' },
    ],
    icon: EvStationIcon,
    color: '#059669',
  },
  {
    type: 'showroom' as CustomerType,
    displayName: 'Vehicle Showroom',
    tagline: 'Dealership & Sales Partner',
    description:
      'Partner a vehicle showroom or dealership with GoGaadi — list new & used vehicles, connect with buyers, and offer exclusive deals to platform operators.',
    perks: [
      { icon: StoreIcon, text: 'New & used vehicle listings' },
      { icon: GroupsIcon, text: 'Connect with GoGaadi operators' },
      { icon: AutoAwesomeIcon, text: 'Exclusive partner deals' },
    ],
    icon: StoreIcon,
    color: '#1d4ed8',
  },
  {
    type: 'vehicle-finance' as CustomerType,
    displayName: 'Vehicle Finance',
    tagline: 'Auto Loan & Finance Provider',
    description:
      'Register a financial institution offering vehicle loans and EMI options — enable drivers and buyers to access instant financing directly through the platform.',
    perks: [
      { icon: AccountBalanceIcon, text: 'Vehicle loan & EMI plans' },
      { icon: FlashOnIcon, text: 'Instant approval workflows' },
      { icon: CurrencyRupeeIcon, text: 'Flexible repayment options' },
    ],
    icon: AccountBalanceIcon,
    color: '#9333ea',
  },
  {
    type: 'finance-broker' as CustomerType,
    displayName: 'Finance Broker',
    tagline: 'DSA & Loan Agent Partner',
    description:
      'Onboard a finance broker or DSA agent who facilitates vehicle loans for GoGaadi operators — earn referral commissions on every successful deal.',
    perks: [
      { icon: HandshakeIcon, text: 'Multiple lender tie-ups' },
      { icon: CurrencyRupeeIcon, text: 'Commission on each referral' },
      { icon: GroupsIcon, text: 'Access to operator network' },
    ],
    icon: HandshakeIcon,
    color: '#0f766e',
  },
  {
    type: 'insurance-partner' as CustomerType,
    displayName: 'Insurance Partner',
    tagline: 'Vehicle & Driver Insurance Provider',
    description:
      'Partner an insurance provider with GoGaadi — offer vehicle insurance, health cover, and driver protection plans to the entire operator and captain network.',
    perks: [
      { icon: SecurityIcon, text: 'Vehicle & commercial insurance' },
      { icon: HealthAndSafetyIcon, text: 'Driver health & accident cover' },
      { icon: AutoAwesomeIcon, text: 'Group policy discounts' },
    ],
    icon: SecurityIcon,
    color: '#166534',
  },
  // ── Platform User ────────────────────────────────────────────────────────────
  {
    type: 'user' as CustomerType,
    displayName: 'App User',
    tagline: 'Platform User Registration',
    description:
      'Register a new platform user with basic profile details — name, contact, and location for app access without vehicle onboarding.',
    perks: [
      { icon: PersonAddIcon, text: 'Basic profile setup' },
      { icon: LocationOnIcon, text: 'City & area onboarding' },
      { icon: PhoneAndroidIcon, text: 'App account ready instantly' },
    ],
    icon: PersonAddIcon,
    color: '#be185d',
  },
] as const;

function getVisuals(color: string) {
  return {
    accent: color,
    gradient: `linear-gradient(135deg, ${color}cc 0%, ${color} 100%)`,
    glow: alpha(color, 0.35),
  };
}

const ONBOARDING_TYPES: CustomerType[] = ['mobility', 'logistics', 'parcel'];
const SERVICE_TYPES: CustomerType[] = ['driver-hire', 'vehicle-rental', 'mechanic-hire'];
const AUTOMOTIVE_TYPES: CustomerType[] = ['petrol-bunk', 'ev-charging', 'showroom'];
const FINANCE_TYPES: CustomerType[] = ['vehicle-finance', 'finance-broker', 'insurance-partner'];

const CreateCustomer = () => {
  const navigate = useNavigate();
  const { AdminPath } = constants;

  const handleSelect = (type: CustomerType) => {
    navigate(AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', type));
  };

  const renderSection = (label: string, types: CustomerType[]) => (
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
        {CUSTOMER_TYPES.filter((t) => types.includes(t.type)).map((t) => {
          const { accent, gradient, glow } = getVisuals(t.color);
          const Icon = t.icon;
          return (
            <CardItem
              key={t.type}
              t={t}
              accent={accent}
              gradient={gradient}
              glow={glow}
              Icon={Icon}
              onSelect={() => handleSelect(t.type)}
            />
          );
        })}
      </Box>
    </>
  );

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 3,
          py: 2.5,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0369a1 100%)',
          boxShadow: '0 8px 32px rgba(37,99,235,0.3)',
          borderRadius: '16px',
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
            flexShrink: 0,
          }}
        >
          <GroupsIcon sx={{ fontSize: 24, color: '#fff' }} />
        </Box>
        <Box>
          <Typography
            sx={{
              color: '#f1f5f9',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.01em',
            }}
          >
            Create New Customer
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
            Select a service type to open the registration form
          </Typography>
        </Box>
      </Box>

      {renderSection('Captain Onboarding', ONBOARDING_TYPES)}
      {renderSection('On-Demand Services', SERVICE_TYPES)}
      {renderSection('Automotive Partners', AUTOMOTIVE_TYPES)}
      {renderSection('Finance Partners', FINANCE_TYPES)}

      {/* ── Platform User (single card, no grid) ───────────────────────── */}
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
        Platform User
      </Typography>
      <Box sx={{ mb: 3 }}>
        {CUSTOMER_TYPES.filter((t) => t.type === 'user').map((t) => {
          const { accent, gradient, glow } = getVisuals(t.color);
          const Icon = t.icon;
          return (
            <CardItem
              key={t.type}
              t={t}
              accent={accent}
              gradient={gradient}
              glow={glow}
              Icon={Icon}
              onSelect={() => handleSelect(t.type)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

// ── Reusable card ──────────────────────────────────────────────────────────────

interface CardItemProps {
  t: (typeof CUSTOMER_TYPES)[number];
  accent: string;
  gradient: string;
  glow: string;
  Icon: React.ElementType;
  onSelect: () => void;
}

const CardItem = ({ t, accent, gradient, glow, Icon, onSelect }: CardItemProps) => (
  <Box
    onClick={onSelect}
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
        border: `1.5px solid ${accent}`,
        boxShadow: `0 0 0 3px ${glow}, 0 12px 40px rgba(0,0,0,0.12)`,
        transform: 'translateY(-4px)',
        '& .card-cta': { opacity: 1 },
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
        <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', lineHeight: 1.2 }}>
          {t.displayName}
        </Typography>
        <Typography
          sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 500, mt: 0.25 }}
        >
          {t.tagline}
        </Typography>
      </Box>
    </Box>

    {/* Description */}
    <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', lineHeight: 1.65, mt: 2 }}>
      {t.description}
    </Typography>

    {/* Perks */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6, mt: 2 }}>
      {t.perks.map(({ icon: PerkIcon, text }) => (
        <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <PerkIcon sx={{ fontSize: '0.85rem', color: accent, flexShrink: 0 }} />
          <Typography sx={{ fontSize: '0.76rem', color: 'text.secondary' }}>{text}</Typography>
        </Box>
      ))}
    </Box>

    {/* CTA hint */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 2.5 }}>
      <Box
        className='card-cta'
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          opacity: 0.45,
          transition: 'opacity 0.2s',
        }}
      >
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: accent }}>
          Get Started
        </Typography>
        <ArrowForwardIcon sx={{ fontSize: '0.9rem', color: accent }} />
      </Box>
    </Box>
  </Box>
);

export default CreateCustomer;
