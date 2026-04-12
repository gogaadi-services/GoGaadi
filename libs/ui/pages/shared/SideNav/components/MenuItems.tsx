import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CategoryIcon from '@mui/icons-material/Category';
import TollIcon from '@mui/icons-material/Toll';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PercentIcon from '@mui/icons-material/Percent';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import RuleIcon from '@mui/icons-material/Rule';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import MapIcon from '@mui/icons-material/Map';
import ExtensionIcon from '@mui/icons-material/Extension';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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

export const useAdminMenuItems = (): MenuGroup[] => {
  const { AdminPath } = constants;
  return [
    {
      group: 'Overview',
      items: [{ label: 'Dashboard', icon: <DashboardIcon />, path: AdminPath.DASHBOARD }],
    },
    {
      group: 'People',
      items: [
        { label: 'People Requests', icon: <AssignmentIndIcon />, path: AdminPath.ROLE_REQUESTS },
        { label: 'People Management', icon: <VpnKeyIcon />, path: AdminPath.ACCESS_MANAGEMENT },
      ],
    },
    {
      group: 'Customer',
      items: [
        { label: 'Customer Access', icon: <HowToRegIcon />, path: AdminPath.PEOPLE_ACCESS },
        {
          label: 'Customer Management',
          icon: <ManageAccountsIcon />,
          path: AdminPath.PEOPLE_MANAGEMENT,
        },
      ],
    },
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
    {
      group: 'Reports',
      items: [
        { label: 'Analytics', icon: <QueryStatsIcon />, path: AdminPath.ANALYTICS },
        { label: 'Activity Logs', icon: <CalendarMonthIcon />, path: AdminPath.EVENTS },
        { label: 'Audit Logs', icon: <ManageSearchIcon />, path: AdminPath.AUDIT_TRAILS },
      ],
    },
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

export const useConsultantMenuItems = (): MenuGroup[] => {
  const { ConsultantPath } = constants;
  return [
    {
      group: 'Customer',
      items: [
        { label: 'Customer Access', icon: <HowToRegIcon />, path: ConsultantPath.PEOPLE_ACCESS },
        {
          label: 'Customer Management',
          icon: <ManageAccountsIcon />,
          path: ConsultantPath.PEOPLE_MANAGEMENT,
        },
      ],
    },
  ];
};
