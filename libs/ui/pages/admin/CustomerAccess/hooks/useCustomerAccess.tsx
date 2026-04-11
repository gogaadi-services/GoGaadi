import React, { useEffect, useState, useCallback } from 'react';
import { Column } from '@gogaadi/component';
import { Chip, Typography, Button, Stack, Tooltip, Tab } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import FireTruckIcon from '@mui/icons-material/FireTruck';
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
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useAuthActionMutation } from '@gogaadi/services';
import { useNotification } from '@gogaadi/hooks';
import {
  CustomerApprovalRow,
  ApprovalStatus,
  ApprovalAction,
} from '../../CustomerApprovals/hooks/useCustomerApprovals';

export type { CustomerApprovalRow, ApprovalStatus, ApprovalAction };

export type CustomerCategory =
  | 'mobility'
  | 'logistics'
  | 'parcel'
  | 'driver-hire'
  | 'vehicle-rental'
  | 'mechanic'
  | 'petrol-bunk'
  | 'ev-charging'
  | 'showroom'
  | 'vehicle-finance'
  | 'finance-broker'
  | 'insurance'
  | 'user'
  | 'bike-scooter'
  | 'auto'
  | 'cab'
  | 'shuttle'
  | 'mini-cargo'
  | 'medium-goods'
  | 'heavy-truck';

interface CustomerTypeConfig {
  title: string;
  description: string;
  color: string;
  Icon: React.ElementType;
  filterFn: (row: CustomerApprovalRow) => boolean;
}

const MOBILITY_VEHICLE_TYPES = [
  'bike', 'scooter', 'auto', 'auto_rickshaw',
  'cab', 'hatchback', 'sedan', 'suv',
  'shuttle', 'bus', 'minibus',
];
const LOGISTICS_VEHICLE_TYPES = [
  'tata_ace', 'mini_truck', 'mini_cargo',
  'dcm', 'medium_goods', 'pickup',
  'lorry', 'heavy_truck', 'trailer',
];

const svc = (r: CustomerApprovalRow): string => (r.serviceCategory as unknown as string) ?? '';

export const CUSTOMER_ACCESS_CONFIG: Record<CustomerCategory, CustomerTypeConfig> = {
  mobility: {
    title: 'Mobility Access',
    description: 'Review mobility operator onboarding requests — bikes, autos, cabs, shuttles.',
    color: '#6366f1',
    Icon: DirectionsBusIcon,
    filterFn: (r) => MOBILITY_VEHICLE_TYPES.includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  logistics: {
    title: 'Logistics Access',
    description: 'Review logistics operator requests — mini cargo, medium goods, heavy trucks.',
    color: '#16a34a',
    Icon: LocalShippingIcon,
    filterFn: (r) => LOGISTICS_VEHICLE_TYPES.includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  parcel: {
    title: 'Parcel Access',
    description: 'Review parcel delivery operator onboarding requests.',
    color: '#ea580c',
    Icon: Inventory2Icon,
    filterFn: (r) => svc(r) === 'parcel',
  },
  'driver-hire': {
    title: 'Driver Hire Access',
    description: 'Review driver hire service provider onboarding requests.',
    color: '#f59e0b',
    Icon: HailIcon,
    filterFn: (r) => svc(r) === 'driver-hire',
  },
  'vehicle-rental': {
    title: 'Vehicle Rental Access',
    description: 'Review vehicle rental operator onboarding requests.',
    color: '#7c3aed',
    Icon: CarRentalIcon,
    filterFn: (r) => svc(r) === 'vehicle-rental',
  },
  mechanic: {
    title: 'Mechanic Access',
    description: 'Review mechanic service provider onboarding requests.',
    color: '#78350f',
    Icon: BuildIcon,
    filterFn: (r) => svc(r) === 'mechanic-hire',
  },
  'petrol-bunk': {
    title: 'Petrol Bunk Access',
    description: 'Review petrol bunk partner onboarding requests.',
    color: '#dc2626',
    Icon: LocalGasStationIcon,
    filterFn: (r) => svc(r) === 'petrol-bunk',
  },
  'ev-charging': {
    title: 'EV Charging Access',
    description: 'Review EV charging station partner onboarding requests.',
    color: '#059669',
    Icon: EvStationIcon,
    filterFn: (r) => svc(r) === 'ev-charging',
  },
  showroom: {
    title: 'Showroom Access',
    description: 'Review vehicle showroom partner onboarding requests.',
    color: '#1d4ed8',
    Icon: StoreIcon,
    filterFn: (r) => svc(r) === 'showroom',
  },
  'vehicle-finance': {
    title: 'Vehicle Finance Access',
    description: 'Review vehicle finance partner onboarding requests.',
    color: '#9333ea',
    Icon: AccountBalanceIcon,
    filterFn: (r) => svc(r) === 'vehicle-finance',
  },
  'finance-broker': {
    title: 'Finance Broker Access',
    description: 'Review finance broker partner onboarding requests.',
    color: '#0f766e',
    Icon: HandshakeIcon,
    filterFn: (r) => svc(r) === 'finance-broker',
  },
  insurance: {
    title: 'Insurance Access',
    description: 'Review insurance partner onboarding requests.',
    color: '#166534',
    Icon: SecurityIcon,
    filterFn: (r) => svc(r) === 'insurance-partner',
  },
  user: {
    title: 'User Access',
    description: 'Review and approve platform user registration requests.',
    color: '#be185d',
    Icon: PersonSearchIcon,
    filterFn: (r) => svc(r) === 'user',
  },
  'bike-scooter': {
    title: 'Bikes & Scooters Access',
    description: 'Review and approve bike and scooter operator onboarding requests.',
    color: '#6366f1',
    Icon: TwoWheelerIcon,
    filterFn: (r) => ['bike', 'scooter'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  auto: {
    title: 'Auto Access',
    description: 'Review and approve auto and auto rickshaw operator onboarding requests.',
    color: '#f59e0b',
    Icon: EmojiTransportationIcon,
    filterFn: (r) => ['auto', 'auto_rickshaw'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  cab: {
    title: 'Cab Access',
    description: 'Review and approve cab, hatchback, sedan and SUV operator onboarding requests.',
    color: '#0ea5e9',
    Icon: LocalTaxiIcon,
    filterFn: (r) => ['cab', 'hatchback', 'sedan', 'suv'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  shuttle: {
    title: 'Shuttle & Bus Access',
    description: 'Review and approve shuttle, bus and minibus operator onboarding requests.',
    color: '#16a34a',
    Icon: DirectionsBusIcon,
    filterFn: (r) => ['shuttle', 'bus', 'minibus'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  'mini-cargo': {
    title: 'Mini Cargo Access',
    description: 'Review and approve Tata Ace, mini truck and mini cargo operator requests.',
    color: '#f59e0b',
    Icon: AirportShuttleIcon,
    filterFn: (r) => ['tata_ace', 'mini_truck', 'mini_cargo'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  'medium-goods': {
    title: 'Medium Goods Access',
    description: 'Review and approve DCM, medium goods vehicle and pickup operator requests.',
    color: '#dc2626',
    Icon: LocalShippingIcon,
    filterFn: (r) => ['dcm', 'medium_goods', 'pickup'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  'heavy-truck': {
    title: 'Heavy Truck Access',
    description: 'Review and approve lorry, heavy truck and trailer operator requests.',
    color: '#7c3aed',
    Icon: FireTruckIcon,
    filterFn: (r) => ['lorry', 'heavy_truck', 'trailer'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
};

export const getCategoryFromPath = (pathname: string): CustomerCategory => {
  if (pathname.includes('mobility-access/bike-scooter')) return 'bike-scooter';
  if (pathname.includes('mobility-access/auto')) return 'auto';
  if (pathname.includes('mobility-access/cab')) return 'cab';
  if (pathname.includes('mobility-access/shuttle')) return 'shuttle';
  if (pathname.includes('logistics-access/mini-cargo')) return 'mini-cargo';
  if (pathname.includes('logistics-access/medium-goods')) return 'medium-goods';
  if (pathname.includes('logistics-access/heavy-truck')) return 'heavy-truck';
  if (pathname.includes('mobility-access')) return 'mobility';
  if (pathname.includes('logistics-access')) return 'logistics';
  if (pathname.includes('parcel-access')) return 'parcel';
  if (pathname.includes('driver-hire-access')) return 'driver-hire';
  if (pathname.includes('vehicle-rental-access')) return 'vehicle-rental';
  if (pathname.includes('mechanic-access')) return 'mechanic';
  if (pathname.includes('petrol-bunk-access')) return 'petrol-bunk';
  if (pathname.includes('ev-charging-access')) return 'ev-charging';
  if (pathname.includes('showroom-access')) return 'showroom';
  if (pathname.includes('vehicle-finance-access')) return 'vehicle-finance';
  if (pathname.includes('finance-broker-access')) return 'finance-broker';
  if (pathname.includes('insurance-access')) return 'insurance';
  if (pathname.includes('user-access')) return 'user';
  return 'mobility';
};

const STATUS_META: Record<ApprovalStatus, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: '#d97706', bg: '#fef3c7' },
  under_review: { label: 'Under Review', color: '#2563eb', bg: '#dbeafe' },
  approved: { label: 'Approved', color: '#16a34a', bg: '#dcfce7' },
  rejected: { label: 'Rejected', color: '#dc2626', bg: '#fee2e2' },
};

const fmtDate = (v: unknown) => {
  if (!v) return '—';
  try {
    return new Date(String(v)).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return String(v);
  }
};

export const useCustomerAccess = (category: CustomerCategory) => {
  const [authAction] = useAuthActionMutation();
  const notify = useNotification();
  const cfg = CUSTOMER_ACCESS_CONFIG[category];

  const [allRows, setAllRows] = useState<CustomerApprovalRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [tableSearch, setTableSearch] = useState('');
  const [detailRow, setDetailRow] = useState<CustomerApprovalRow | null>(null);
  const [actionInProgress, setActionInProgress] = useState<number | string | null>(null);
  const [actionTarget, setActionTarget] = useState<{
    row: CustomerApprovalRow;
    type: ApprovalAction;
  } | null>(null);
  const [actionNotes, setActionNotes] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await authAction({ action: 'get-customer-onboardings' })
        .unwrap()
        .catch(() => ({ data: [] }));
      setAllRows(res.data ?? []);
    } catch {
      setAllRows([]);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter rows for this category — only pending/under_review (access = approval queue)
  const categoryRows = allRows.filter(
    (r) =>
      cfg.filterFn(r) && (r.status === 'pending' || r.status === 'under_review'),
  );

  const pendingRows = categoryRows.filter((r) => r.status === 'pending');
  const reviewRows = categoryRows.filter((r) => r.status === 'under_review');

  // tabLists: All, Pending, Under Review
  const tabLists: CustomerApprovalRow[][] = [categoryRows, pendingRows, reviewRows];

  const getFilteredData = (rows: CustomerApprovalRow[]) => {
    if (!tableSearch.trim()) return rows;
    const q = tableSearch.toLowerCase();
    return rows.filter(
      (r) =>
        `${r.firstName} ${r.lastName}`.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.phone?.includes(q) ||
        r.vehicleType?.toLowerCase().includes(q) ||
        r.vehicleNumber?.toLowerCase().includes(q) ||
        r.city?.toLowerCase().includes(q) ||
        r.serviceCategory?.toLowerCase().includes(q),
    );
  };

  const handleOpenAction = (row: CustomerApprovalRow, type: ApprovalAction) => {
    setActionTarget({ row, type });
    setActionNotes('');
  };
  const handleCloseAction = () => {
    setActionTarget(null);
    setActionNotes('');
  };
  const handleConfirmAction = async () => {
    if (!actionTarget) return;
    setActionInProgress(actionTarget.row.id);
    try {
      const newStatus =
        actionTarget.type === 'approve'
          ? 'approved'
          : actionTarget.type === 'reject'
            ? 'rejected'
            : 'under_review';
      await authAction({
        action: 'update-customer-onboarding',
        onboardingId: actionTarget.row.id,
        data: { status: newStatus, adminNotes: actionNotes || undefined },
      }).unwrap();
      const label =
        actionTarget.type === 'approve'
          ? 'approved'
          : actionTarget.type === 'reject'
            ? 'rejected'
            : 'moved to under review';
      notify.success(`${cfg.title} request ${label} successfully.`);
      handleCloseAction();
      fetchData();
    } catch {
      notify.error('Action failed. Please try again.');
    } finally {
      setActionInProgress(null);
    }
  };

  const tabs = [
    <Tab key='all' icon={<cfg.Icon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='All' />,
    <Tab key='pending' icon={<PendingActionsIcon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='Pending' />,
    <Tab key='review' icon={<HowToRegIcon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='Under Review' />,
  ];

  const columns: Column<CustomerApprovalRow>[] = [
    {
      id: 'sno',
      label: '#',
      minWidth: 42,
      align: 'center',
      sortable: false,
      format: (_v: unknown, _r: CustomerApprovalRow, i?: number) => (
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8' }}>
          {(i ?? 0) + 1}
        </Typography>
      ),
    },
    {
      id: 'firstName',
      label: 'Name',
      minWidth: 130,
      format: (_v: unknown, row: CustomerApprovalRow) => (
        <Typography
          component='span'
          onClick={(e: React.MouseEvent) => { e.stopPropagation(); setDetailRow(row); }}
          sx={{
            fontWeight: 700,
            fontSize: '0.84rem',
            cursor: 'pointer',
            color: '#1d4ed8',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(29,78,216,0.35)',
            textUnderlineOffset: '3px',
            '&:hover': { color: '#1e40af' },
          }}
        >
          {`${row.firstName} ${row.lastName}`.trim() || '—'}
        </Typography>
      ),
    },
    {
      id: 'phone',
      label: 'Phone',
      minWidth: 110,
      format: (_v: unknown, row: CustomerApprovalRow) => (
        <Typography sx={{ fontSize: '0.82rem', color: '#1e293b' }}>{row.phone || '—'}</Typography>
      ),
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 160,
      format: (_v: unknown, row: CustomerApprovalRow) => (
        <Typography sx={{ fontSize: '0.82rem', color: '#1e293b' }}>{row.email || '—'}</Typography>
      ),
    },
    {
      id: 'city',
      label: 'Location',
      minWidth: 90,
      format: (_v: unknown, row: CustomerApprovalRow) => (
        <Stack spacing={0.1}>
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b' }}>
            {row.city || '—'}
          </Typography>
          {row.area && (
            <Typography sx={{ fontSize: '0.71rem', color: '#64748b' }}>{row.area}</Typography>
          )}
        </Stack>
      ),
    },
    {
      id: 'createdByName',
      label: 'Submitted',
      minWidth: 100,
      format: (_v: unknown, row: CustomerApprovalRow) => (
        <Stack spacing={0.1}>
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b' }}>
            {row.isSelfRegistered ? 'Self' : row.createdByName || '—'}
          </Typography>
          <Typography sx={{ fontSize: '0.69rem', color: '#94a3b8' }}>
            {fmtDate(row.submittedAt || row.createdAt)}
          </Typography>
        </Stack>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 102,
      align: 'center',
      format: (_v: unknown, row: CustomerApprovalRow) => {
        const s = row.status ?? 'pending';
        const meta = STATUS_META[s] ?? STATUS_META['pending'];
        return (
          <Stack spacing={0.4} alignItems='center'>
            <Chip
              label={meta.label}
              size='small'
              sx={{ fontSize: '0.72rem', fontWeight: 700, bgcolor: meta.bg, color: meta.color, border: 'none' }}
            />
            {row.adminNotes && (
              <Tooltip title={row.adminNotes} arrow>
                <Typography
                  sx={{
                    fontSize: '0.68rem',
                    color: 'text.disabled',
                    cursor: 'help',
                    maxWidth: 100,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.adminNotes}
                </Typography>
              </Tooltip>
            )}
          </Stack>
        );
      },
    },
    {
      id: 'vehicleNumber',
      label: 'Actions',
      minWidth: 160,
      align: 'center',
      sortable: false,
      format: (_v: unknown, row: CustomerApprovalRow) => {
        const isProcessing = actionInProgress === row.id;
        if (row.status === 'approved') {
          return (
            <Chip
              icon={<CheckCircleOutlineIcon style={{ fontSize: 13 }} />}
              label='Approved'
              size='small'
              sx={{ fontSize: '0.7rem', fontWeight: 700, bgcolor: '#dcfce7', color: '#15803d', border: 'none' }}
            />
          );
        }
        if (row.status === 'rejected') {
          return (
            <Chip
              icon={<CancelOutlinedIcon style={{ fontSize: 13 }} />}
              label='Rejected'
              size='small'
              sx={{ fontSize: '0.7rem', fontWeight: 700, bgcolor: '#fee2e2', color: '#dc2626', border: 'none' }}
            />
          );
        }
        return (
          <Stack direction='row' spacing={0.75} justifyContent='center'>
            <Tooltip title='Approve request'>
              <Button
                size='small'
                variant='contained'
                color='success'
                disabled={isProcessing}
                onClick={() => handleOpenAction(row, 'approve')}
                startIcon={<CheckCircleOutlineIcon sx={{ fontSize: '0.9rem !important' }} />}
                sx={{ fontSize: '0.7rem', textTransform: 'none', borderRadius: 1.5, minWidth: 0, px: 1 }}
              >
                Approve
              </Button>
            </Tooltip>
            <Tooltip title='Reject request'>
              <Button
                size='small'
                variant='outlined'
                color='error'
                disabled={isProcessing}
                onClick={() => handleOpenAction(row, 'reject')}
                startIcon={<CancelOutlinedIcon sx={{ fontSize: '0.9rem !important' }} />}
                sx={{ fontSize: '0.7rem', textTransform: 'none', borderRadius: 1.5, minWidth: 0, px: 1 }}
              >
                Reject
              </Button>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  return {
    cfg,
    isLoading,
    categoryRows,
    pendingRows,
    reviewRows,
    tabLists,
    tabValue,
    setTabValue,
    tableSearch,
    setTableSearch,
    tabs,
    columns,
    detailRow,
    setDetailRow,
    actionTarget,
    actionNotes,
    setActionNotes,
    actionInProgress,
    handleOpenAction,
    handleCloseAction,
    handleConfirmAction,
    getFilteredData,
  };
};
