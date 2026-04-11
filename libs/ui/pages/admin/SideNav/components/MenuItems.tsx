import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CategoryIcon from '@mui/icons-material/Category';
import TollIcon from '@mui/icons-material/Toll';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import CommuteIcon from '@mui/icons-material/Commute';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PercentIcon from '@mui/icons-material/Percent';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import RuleIcon from '@mui/icons-material/Rule';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import MapIcon from '@mui/icons-material/Map';
import ExtensionIcon from '@mui/icons-material/Extension';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HailIcon from '@mui/icons-material/Hail';
import CarRentalIcon from '@mui/icons-material/CarRental';
import BuildIcon from '@mui/icons-material/Build';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EvStationIcon from '@mui/icons-material/EvStation';
import StoreIcon from '@mui/icons-material/Store';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SecurityIcon from '@mui/icons-material/Security';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';
import { constants } from '@gogaadi/utils';

export interface MenuItem {
  label: string;
  icon: React.ReactElement;
  path: string;
}

export interface MenuGroup {
  group: string;
  items: MenuItem[];
}

export const useMenuItems = (): MenuGroup[] => {
  const { AdminPath } = constants;
  return [
    // ── Overview ────────────────────────────────────────────────────────────────
    {
      group: 'Overview',
      items: [{ label: 'Dashboard', icon: <DashboardIcon />, path: AdminPath.DASHBOARD }],
    },

    // ── People ───────────────────────────────────────────────────────────────────
    {
      group: 'People',
      items: [
        { label: 'People Requests', icon: <AssignmentIndIcon />, path: AdminPath.ROLE_REQUESTS },
        { label: 'People Management', icon: <VpnKeyIcon />, path: AdminPath.ACCESS_MANAGEMENT },
      ],
    },

    // ── Customer ─────────────────────────────────────────────────────────────────
    {
      group: 'Customer',
      items: [
        { label: 'Customer Access', icon: <HowToRegIcon />, path: AdminPath.PEOPLE_ACCESS },
        { label: 'Customer Management', icon: <ManageAccountsIcon />, path: AdminPath.PEOPLE_MANAGEMENT },
      ],
    },

    // ── Finance ──────────────────────────────────────────────────────────────────
    {
      group: 'Finance',
      items: [
        { label: 'Transactions', icon: <PaymentsIcon />, path: AdminPath.TRANSACTIONS },
        {
          label: 'Collections',
          icon: <AccountBalanceWalletIcon />,
          path: AdminPath.DRIVER_EARNINGS,
        },
        { label: 'Commissions', icon: <PercentIcon />, path: AdminPath.COMMISSIONS },
        { label: 'Subscriptions', icon: <CardMembershipIcon />, path: AdminPath.SUBSCRIPTIONS },
        { label: 'Fast Tag Requests', icon: <TollIcon />, path: AdminPath.TAGS },
      ],
    },

    // ── Reports ──────────────────────────────────────────────────────────────────
    {
      group: 'Reports',
      items: [
        { label: 'Analytics', icon: <QueryStatsIcon />, path: AdminPath.ANALYTICS },
        { label: 'Activity Logs', icon: <CalendarMonthIcon />, path: AdminPath.EVENTS },
        { label: 'Audit Logs', icon: <ManageSearchIcon />, path: AdminPath.AUDIT_TRAILS },
      ],
    },

    // ── Configuration ────────────────────────────────────────────────────────────
    {
      group: 'Configuration',
      items: [
        { label: 'Service Types', icon: <MiscellaneousServicesIcon />, path: AdminPath.SERVICES },
        { label: 'Pricing Rules', icon: <PriceChangeIcon />, path: AdminPath.PRICING },
        { label: 'Categories', icon: <CategoryIcon />, path: AdminPath.CATEGORIES },
        { label: 'Business Rules', icon: <RuleIcon />, path: AdminPath.RULES },
        { label: 'Feature Flags', icon: <ToggleOnIcon />, path: AdminPath.FEATURE_FLAGS },
        { label: 'Service Zones', icon: <MapIcon />, path: AdminPath.ZONES },
        { label: 'Integrations', icon: <ExtensionIcon />, path: AdminPath.INTEGRATIONS },
      ],
    },
  ];
};
