import { Typography, alpha } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// Management icons
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
// Customer icons
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BusinessIcon from '@mui/icons-material/Business';
import HailIcon from '@mui/icons-material/Hail';
import CarRentalIcon from '@mui/icons-material/CarRental';
import BuildIcon from '@mui/icons-material/Build';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EvStationIcon from '@mui/icons-material/EvStation';
import StoreIcon from '@mui/icons-material/Store';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SecurityIcon from '@mui/icons-material/Security';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { Box } from '@gogaadi/component';
import { useNavigate } from 'react-router-dom';
import { constants } from '@gogaadi/utils';
import { useAuth } from '@gogaadi/hooks';
import { AdminPageShell } from '../shared';

const { AdminPath } = constants;

interface CardDef {
  type: string;
  displayName: string;
  tagline: string;
  description: string;
  perks: { icon: React.ElementType; text: string }[];
  icon: React.ElementType;
  color: string;
  navigateTo: string;
}

// ── Management accounts ────────────────────────────────────────────────────────
const MANAGEMENT_CARDS: CardDef[] = [
  {
    type: 'admin',
    displayName: 'Admin',
    tagline: 'Full Platform Access',
    description:
      'Create an admin account with complete control over platform settings, users, configuration, and management capabilities.',
    perks: [
      { icon: AdminPanelSettingsOutlinedIcon, text: 'Manage users & roles' },
      { icon: VerifiedUserOutlinedIcon, text: 'Full configuration access' },
      { icon: AnalyticsOutlinedIcon, text: 'All reports & dashboards' },
    ],
    icon: ManageAccountsIcon,
    color: '#6366f1',
    navigateTo: AdminPath.CREATE_MANAGEMENT_TYPE.replace(':type', 'admin'),
  },
  {
    type: 'consultant',
    displayName: 'Consultant',
    tagline: 'Scoped Read Access',
    description:
      'Onboard a consultant with read-only access to review analytics, collaborate on platform operations, and provide advisory support.',
    perks: [
      { icon: AnalyticsOutlinedIcon, text: 'Reports & analytics view' },
      { icon: VerifiedUserOutlinedIcon, text: 'Advisory collaboration' },
      { icon: AdminPanelSettingsOutlinedIcon, text: 'No config changes' },
    ],
    icon: BusinessCenterIcon,
    color: '#0ea5e9',
    navigateTo: AdminPath.CREATE_MANAGEMENT_TYPE.replace(':type', 'consultant'),
  },
];

// ── Customer / captain cards ───────────────────────────────────────────────────
const CUSTOMER_CARDS: CardDef[] = [
  {
    type: 'mobility',
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
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'mobility'),
  },
  {
    type: 'logistics',
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
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'logistics'),
  },
  {
    type: 'parcel',
    displayName: 'Parcel Delivery',
    tagline: 'Last-Mile Delivery',
    description:
      'Register a captain for parcel and last-mile delivery services — Bike, Auto, and Tata Ace for fast document, food, and goods delivery.',
    perks: [
      { icon: Inventory2Icon, text: 'Documents, food & general goods' },
      { icon: LocationOnIcon, text: 'Local & outstation delivery' },
      { icon: FlashOnIcon, text: 'Same-trip parcel + ride earning' },
    ],
    icon: Inventory2Icon,
    color: '#ea580c',
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'parcel'),
  },
  {
    type: 'driver-hire',
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
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'driver-hire'),
  },
  {
    type: 'vehicle-rental',
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
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'vehicle-rental'),
  },
  {
    type: 'mechanic-hire',
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
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'mechanic-hire'),
  },
  {
    type: 'petrol-bunk',
    displayName: 'Petrol Bunk',
    tagline: 'Fuel Station Partner',
    description:
      'Register a petrol bunk or fuel station as a GoGaadi partner — Petrol, Diesel, and CNG refuelling stops mapped on the platform.',
    perks: [
      { icon: LocalGasStationIcon, text: 'Petrol, Diesel & CNG' },
      { icon: MyLocationIcon, text: 'Listed on driver route maps' },
      { icon: CurrencyRupeeIcon, text: 'Offer discounts to GoGaadi users' },
    ],
    icon: LocalGasStationIcon,
    color: '#dc2626',
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'petrol-bunk'),
  },
  {
    type: 'ev-charging',
    displayName: 'EV Charging Station',
    tagline: 'Electric Vehicle Charging Partner',
    description:
      'Onboard an EV charging point as a platform partner — visible to all electric vehicle operators and riders.',
    perks: [
      { icon: EvStationIcon, text: 'AC & DC fast charger support' },
      { icon: MyLocationIcon, text: 'Mapped for EV drivers' },
      { icon: FlashOnIcon, text: 'Scheduled slot booking' },
    ],
    icon: EvStationIcon,
    color: '#059669',
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'ev-charging'),
  },
  {
    type: 'showroom',
    displayName: 'Vehicle Showroom',
    tagline: 'Dealership & Sales Partner',
    description:
      'Partner a vehicle showroom or dealership with GoGaadi — list new & used vehicles and connect with buyers on the platform.',
    perks: [
      { icon: StoreIcon, text: 'New & used vehicle listings' },
      { icon: GroupsIcon, text: 'Connect with GoGaadi operators' },
      { icon: AutoAwesomeIcon, text: 'Exclusive partner deals' },
    ],
    icon: StoreIcon,
    color: '#1d4ed8',
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'showroom'),
  },
  {
    type: 'vehicle-finance',
    displayName: 'Vehicle Finance',
    tagline: 'Auto Loan & Finance Provider',
    description:
      'Register a financial institution offering vehicle loans and EMI options — enable drivers and buyers to access instant financing.',
    perks: [
      { icon: AccountBalanceIcon, text: 'Vehicle loan & EMI plans' },
      { icon: FlashOnIcon, text: 'Instant approval workflows' },
      { icon: CurrencyRupeeIcon, text: 'Flexible repayment options' },
    ],
    icon: AccountBalanceIcon,
    color: '#9333ea',
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'vehicle-finance'),
  },
  {
    type: 'finance-broker',
    displayName: 'Finance Broker',
    tagline: 'DSA & Loan Agent Partner',
    description:
      'Onboard a finance broker or DSA agent who facilitates vehicle loans for GoGaadi operators — earn referral commissions.',
    perks: [
      { icon: HandshakeIcon, text: 'Multiple lender tie-ups' },
      { icon: CurrencyRupeeIcon, text: 'Commission on each referral' },
      { icon: GroupsIcon, text: 'Access to operator network' },
    ],
    icon: HandshakeIcon,
    color: '#0f766e',
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'finance-broker'),
  },
  {
    type: 'insurance-partner',
    displayName: 'Insurance Partner',
    tagline: 'Vehicle & Driver Insurance Provider',
    description:
      'Partner an insurance provider with GoGaadi — offer vehicle insurance, health cover, and driver protection plans.',
    perks: [
      { icon: SecurityIcon, text: 'Vehicle & commercial insurance' },
      { icon: HealthAndSafetyIcon, text: 'Driver health & accident cover' },
      { icon: AutoAwesomeIcon, text: 'Group policy discounts' },
    ],
    icon: SecurityIcon,
    color: '#166534',
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'insurance-partner'),
  },
  {
    type: 'user',
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
    navigateTo: AdminPath.CREATE_CUSTOMER_TYPE.replace(':type', 'user'),
  },
];

function getVisuals(color: string) {
  return {
    gradient: `linear-gradient(135deg, ${color}cc 0%, ${color} 100%)`,
    glow: alpha(color, 0.35),
  };
}

// ── Card ───────────────────────────────────────────────────────────────────────
const Card = ({ card, onClick }: { card: CardDef; onClick: () => void }) => {
  const { gradient, glow } = getVisuals(card.color);
  const Icon = card.icon;
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
          border: `1.5px solid ${card.color}`,
          boxShadow: `0 0 0 3px ${glow}, 0 12px 40px rgba(0,0,0,0.12)`,
          transform: 'translateY(-4px)',
          '& .card-cta': { opacity: 1 },
        },
      }}
    >
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
            {card.displayName}
          </Typography>
          <Typography
            sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 500, mt: 0.25 }}
          >
            {card.tagline}
          </Typography>
        </Box>
      </Box>
      <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', lineHeight: 1.65, mt: 2 }}>
        {card.description}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6, mt: 2 }}>
        {card.perks.map(({ icon: PerkIcon, text }) => (
          <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <PerkIcon sx={{ fontSize: '0.85rem', color: card.color, flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.76rem', color: 'text.secondary' }}>{text}</Typography>
          </Box>
        ))}
      </Box>
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
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: card.color }}>
            Get Started
          </Typography>
          <ArrowForwardIcon sx={{ fontSize: '0.9rem', color: card.color }} />
        </Box>
      </Box>
    </Box>
  );
};

// ── Section ────────────────────────────────────────────────────────────────────
const Section = ({
  label,
  cards,
  cols = 3,
  navigate,
}: {
  label: string;
  cards: CardDef[];
  cols?: number;
  navigate: (path: string) => void;
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
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: `repeat(${cols}, 1fr)` },
        gap: 2.5,
        mb: 3,
      }}
    >
      {cards.map((card) => (
        <Card key={card.type} card={card} onClick={() => navigate(card.navigateTo)} />
      ))}
    </Box>
  </>
);

// ── Page ───────────────────────────────────────────────────────────────────────
const CreateNew = () => {
  const navigate = useNavigate();
  const { isConsultantMode, isConsultant } = useAuth();
  const consultantMode = isConsultantMode || isConsultant;

  return (
    <AdminPageShell
      mode='hero'
      heroGradient='linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0369a1 100%)'
      heroBoxShadow='0 8px 32px rgba(37,99,235,0.3)'
      heroIcon={AddCircleOutlineIcon}
      heroTitle='Create New User'
      heroSubtitle='Select a role or service type to open the registration form'
      heroIconBg='linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
      heroIconShadow='0 8px 24px rgba(99,102,241,0.4)'
    >
      {!consultantMode && (
        <Section
          label='Management Accounts'
          cards={MANAGEMENT_CARDS}
          cols={2}
          navigate={navigate}
        />
      )}
      <Section
        label='Captain Onboarding'
        cards={CUSTOMER_CARDS.filter((c) => ['mobility', 'logistics', 'parcel'].includes(c.type))}
        navigate={navigate}
      />
      <Section
        label='On-Demand Services'
        cards={CUSTOMER_CARDS.filter((c) =>
          ['driver-hire', 'vehicle-rental', 'mechanic-hire'].includes(c.type),
        )}
        navigate={navigate}
      />
      <Section
        label='Automotive Partners'
        cards={CUSTOMER_CARDS.filter((c) =>
          ['petrol-bunk', 'ev-charging', 'showroom'].includes(c.type),
        )}
        navigate={navigate}
      />
      <Section
        label='Finance Partners'
        cards={CUSTOMER_CARDS.filter((c) =>
          ['vehicle-finance', 'finance-broker', 'insurance-partner'].includes(c.type),
        )}
        navigate={navigate}
      />
      <Section
        label='Platform User'
        cards={CUSTOMER_CARDS.filter((c) => c.type === 'user')}
        cols={1}
        navigate={navigate}
      />
    </AdminPageShell>
  );
};

export default CreateNew;
