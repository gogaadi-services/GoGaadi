import React, { useEffect, useState, useCallback } from 'react';
import { Column } from '@gogaadi/component';
import { Chip, Typography, Stack, Tooltip, Tab } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import GroupIcon from '@mui/icons-material/Group';
import HowToRegIcon from '@mui/icons-material/HowToReg';
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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useAuthActionMutation } from '@gogaadi/services';
import { useNotification } from '@gogaadi/hooks';
import {
  CustomerApprovalRow,
  ApprovalStatus,
} from '../../CustomerApprovals/hooks/useCustomerApprovals';

export type { CustomerApprovalRow, ApprovalStatus };

export type CustomerManagementCategory =
  | 'customer'
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

interface CustomerManagementTypeConfig {
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

export const CUSTOMER_MANAGEMENT_CONFIG: Record<CustomerManagementCategory, CustomerManagementTypeConfig> = {
  customer: {
    title: 'Customer Management',
    description: 'View and manage all approved customer accounts.',
    color: '#0ea5e9',
    Icon: HowToRegIcon,
    filterFn: (r) =>
      svc(r) === 'customer' ||
      (!svc(r) && !MOBILITY_VEHICLE_TYPES.includes(r.vehicleType?.toLowerCase() ?? '') &&
       !LOGISTICS_VEHICLE_TYPES.includes(r.vehicleType?.toLowerCase() ?? '')),
  },
  mobility: {
    title: 'Mobility Management',
    description: 'View and manage all approved mobility operators.',
    color: '#6366f1',
    Icon: DirectionsBusIcon,
    filterFn: (r) => MOBILITY_VEHICLE_TYPES.includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  logistics: {
    title: 'Logistics Management',
    description: 'View and manage all approved logistics operators.',
    color: '#16a34a',
    Icon: LocalShippingIcon,
    filterFn: (r) => LOGISTICS_VEHICLE_TYPES.includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  parcel: {
    title: 'Parcel Management',
    description: 'View and manage all approved parcel delivery operators.',
    color: '#ea580c',
    Icon: Inventory2Icon,
    filterFn: (r) => svc(r) === 'parcel',
  },
  'driver-hire': {
    title: 'Driver Hire Management',
    description: 'View and manage all approved driver hire providers.',
    color: '#f59e0b',
    Icon: HailIcon,
    filterFn: (r) => svc(r) === 'driver-hire',
  },
  'vehicle-rental': {
    title: 'Vehicle Rental Management',
    description: 'View and manage all approved vehicle rental operators.',
    color: '#7c3aed',
    Icon: CarRentalIcon,
    filterFn: (r) => svc(r) === 'vehicle-rental',
  },
  mechanic: {
    title: 'Mechanic Management',
    description: 'View and manage all approved mechanic service providers.',
    color: '#78350f',
    Icon: BuildIcon,
    filterFn: (r) => svc(r) === 'mechanic-hire',
  },
  'petrol-bunk': {
    title: 'Petrol Bunk Management',
    description: 'View and manage all approved petrol bunk partners.',
    color: '#dc2626',
    Icon: LocalGasStationIcon,
    filterFn: (r) => svc(r) === 'petrol-bunk',
  },
  'ev-charging': {
    title: 'EV Charging Management',
    description: 'View and manage all approved EV charging station partners.',
    color: '#059669',
    Icon: EvStationIcon,
    filterFn: (r) => svc(r) === 'ev-charging',
  },
  showroom: {
    title: 'Showroom Management',
    description: 'View and manage all approved vehicle showroom partners.',
    color: '#1d4ed8',
    Icon: StoreIcon,
    filterFn: (r) => svc(r) === 'showroom',
  },
  'vehicle-finance': {
    title: 'Vehicle Finance Management',
    description: 'View and manage all approved vehicle finance partners.',
    color: '#9333ea',
    Icon: AccountBalanceIcon,
    filterFn: (r) => svc(r) === 'vehicle-finance',
  },
  'finance-broker': {
    title: 'Finance Broker Management',
    description: 'View and manage all approved finance broker partners.',
    color: '#0f766e',
    Icon: HandshakeIcon,
    filterFn: (r) => svc(r) === 'finance-broker',
  },
  insurance: {
    title: 'Insurance Management',
    description: 'View and manage all approved insurance partners.',
    color: '#166534',
    Icon: SecurityIcon,
    filterFn: (r) => svc(r) === 'insurance-partner',
  },
  user: {
    title: 'User Management',
    description: 'View and manage all platform users.',
    color: '#be185d',
    Icon: ManageAccountsIcon,
    filterFn: (r) => svc(r) === 'user',
  },
  'bike-scooter': {
    title: 'Bikes & Scooters Management',
    description: 'View and manage all approved bike and scooter operators.',
    color: '#6366f1',
    Icon: TwoWheelerIcon,
    filterFn: (r) => ['bike', 'scooter'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  auto: {
    title: 'Auto Management',
    description: 'View and manage all approved auto and auto rickshaw operators.',
    color: '#f59e0b',
    Icon: EmojiTransportationIcon,
    filterFn: (r) => ['auto', 'auto_rickshaw'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  cab: {
    title: 'Cab Management',
    description: 'View and manage all approved cab, hatchback, sedan and SUV operators.',
    color: '#0ea5e9',
    Icon: LocalTaxiIcon,
    filterFn: (r) => ['cab', 'hatchback', 'sedan', 'suv'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  shuttle: {
    title: 'Shuttle & Bus Management',
    description: 'View and manage all approved shuttle, bus and minibus operators.',
    color: '#16a34a',
    Icon: DirectionsBusIcon,
    filterFn: (r) => ['shuttle', 'bus', 'minibus'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  'mini-cargo': {
    title: 'Mini Cargo Management',
    description: 'View and manage all approved Tata Ace, mini truck and mini cargo operators.',
    color: '#f59e0b',
    Icon: AirportShuttleIcon,
    filterFn: (r) => ['tata_ace', 'mini_truck', 'mini_cargo'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  'medium-goods': {
    title: 'Medium Goods Management',
    description: 'View and manage all approved DCM, medium goods vehicle and pickup operators.',
    color: '#dc2626',
    Icon: LocalShippingIcon,
    filterFn: (r) => ['dcm', 'medium_goods', 'pickup'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
  'heavy-truck': {
    title: 'Heavy Truck Management',
    description: 'View and manage all approved lorry, heavy truck and trailer operators.',
    color: '#7c3aed',
    Icon: FireTruckIcon,
    filterFn: (r) => ['lorry', 'heavy_truck', 'trailer'].includes(r.vehicleType?.toLowerCase() ?? ''),
  },
};

export const getManagementCategoryFromPath = (pathname: string): CustomerManagementCategory => {
  if (pathname.includes('mobility-management/bike-scooter')) return 'bike-scooter';
  if (pathname.includes('mobility-management/auto')) return 'auto';
  if (pathname.includes('mobility-management/cab')) return 'cab';
  if (pathname.includes('mobility-management/shuttle')) return 'shuttle';
  if (pathname.includes('logistics-management/mini-cargo')) return 'mini-cargo';
  if (pathname.includes('logistics-management/medium-goods')) return 'medium-goods';
  if (pathname.includes('logistics-management/heavy-truck')) return 'heavy-truck';
  if (pathname.includes('user-management')) return 'customer';
  if (pathname.includes('mobility-management')) return 'mobility';
  if (pathname.includes('logistics-management')) return 'logistics';
  if (pathname.includes('parcel-management')) return 'parcel';
  if (pathname.includes('driver-hire-management')) return 'driver-hire';
  if (pathname.includes('vehicle-rental-management')) return 'vehicle-rental';
  if (pathname.includes('mechanic-management')) return 'mechanic';
  if (pathname.includes('petrol-bunk-management')) return 'petrol-bunk';
  if (pathname.includes('ev-charging-management')) return 'ev-charging';
  if (pathname.includes('showroom-management')) return 'showroom';
  if (pathname.includes('vehicle-finance-management')) return 'vehicle-finance';
  if (pathname.includes('finance-broker-management')) return 'finance-broker';
  if (pathname.includes('insurance-management')) return 'insurance';
  if (pathname.includes('user-mgmt')) return 'user';
  return 'customer';
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

export const useCustomerManagement = (category: CustomerManagementCategory) => {
  const [authAction] = useAuthActionMutation();
  const notify = useNotification();
  const cfg = CUSTOMER_MANAGEMENT_CONFIG[category];

  const [allRows, setAllRows] = useState<CustomerApprovalRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [tableSearch, setTableSearch] = useState('');
  const [detailRow, setDetailRow] = useState<CustomerApprovalRow | null>(null);

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

  // Management shows ALL statuses
  const categoryRows = allRows.filter(cfg.filterFn);
  const approvedRows = categoryRows.filter((r) => r.status === 'approved');
  const pendingRows = categoryRows.filter((r) => r.status === 'pending' || r.status === 'under_review');
  const rejectedRows = categoryRows.filter((r) => r.status === 'rejected');

  // tabLists: All, Approved, Pending, Rejected
  const tabLists: CustomerApprovalRow[][] = [categoryRows, approvedRows, pendingRows, rejectedRows];

  const getFilteredData = (rows: CustomerApprovalRow[]) => {
    if (!tableSearch.trim()) return rows;
    const q = tableSearch.toLowerCase();
    return rows.filter(
      (r) =>
        `${r.firstName} ${r.lastName}`.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.phone?.includes(q) ||
        r.vehicleType?.toLowerCase().includes(q) ||
        r.city?.toLowerCase().includes(q) ||
        r.status?.toLowerCase().includes(q),
    );
  };

  const handleToggleStatus = async (row: CustomerApprovalRow, newStatus: 'approved' | 'rejected') => {
    try {
      await authAction({
        action: 'update-customer-onboarding',
        onboardingId: row.id,
        data: { status: newStatus },
      }).unwrap();
      notify.success(`Status updated to ${newStatus}.`);
      fetchData();
    } catch {
      notify.error('Failed to update status.');
    }
  };

  const tabs = [
    <Tab key='all' icon={<GroupIcon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='All' />,
    <Tab key='approved' icon={<CheckCircleOutlineIcon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='Approved' />,
    <Tab key='pending' icon={<PendingActionsIcon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='Pending' />,
    <Tab key='rejected' icon={<CancelOutlinedIcon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='Rejected' />,
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
            color: '#0f766e',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(15,118,110,0.35)',
            textUnderlineOffset: '3px',
            '&:hover': { color: '#134e4a' },
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
      id: 'createdAt',
      label: 'Registered',
      minWidth: 100,
      format: (_v: unknown, row: CustomerApprovalRow) => (
        <Typography sx={{ fontSize: '0.82rem', color: '#64748b' }}>
          {fmtDate(row.createdAt)}
        </Typography>
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
      id: 'customerId',
      label: 'Actions',
      minWidth: 140,
      align: 'center',
      sortable: false,
      format: (_v: unknown, row: CustomerApprovalRow) => {
        if (row.status === 'approved') {
          return (
            <Tooltip title='Revoke access'>
              <Chip
                icon={<CancelOutlinedIcon style={{ fontSize: 13 }} />}
                label='Revoke'
                size='small'
                onClick={() => handleToggleStatus(row, 'rejected')}
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  bgcolor: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#fecaca' },
                }}
              />
            </Tooltip>
          );
        }
        if (row.status === 'rejected') {
          return (
            <Tooltip title='Restore access'>
              <Chip
                icon={<CheckCircleOutlineIcon style={{ fontSize: 13 }} />}
                label='Restore'
                size='small'
                onClick={() => handleToggleStatus(row, 'approved')}
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  bgcolor: '#dcfce7',
                  color: '#15803d',
                  border: 'none',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#bbf7d0' },
                }}
              />
            </Tooltip>
          );
        }
        return (
          <Chip
            label='Pending Review'
            size='small'
            sx={{ fontSize: '0.7rem', fontWeight: 700, bgcolor: '#fef3c7', color: '#d97706', border: 'none' }}
          />
        );
      },
    },
  ];

  return {
    cfg,
    isLoading,
    categoryRows,
    approvedRows,
    pendingRows,
    rejectedRows,
    tabLists,
    tabValue,
    setTabValue,
    tableSearch,
    setTableSearch,
    tabs,
    columns,
    detailRow,
    setDetailRow,
    getFilteredData,
  };
};
