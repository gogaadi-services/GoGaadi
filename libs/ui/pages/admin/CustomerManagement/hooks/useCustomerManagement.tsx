import React, { useEffect, useState, useCallback } from 'react';
import { Column } from '@gogaadi/component';
import { Switch, Typography, Stack, Tooltip, Tab } from '@mui/material';
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

export interface VehicleSubTypeMgmt {
  key: string;
  label: string;
  Icon: React.ElementType;
  color: string;
  filterFn: (r: CustomerApprovalRow) => boolean;
}

const VEHICLE_SUB_TYPES_MGMT: Record<'mobility' | 'logistics', VehicleSubTypeMgmt[]> = {
  mobility: [
    {
      key: 'bike-scooter', label: 'Bikes & Scooters', Icon: TwoWheelerIcon, color: '#6366f1',
      filterFn: (r) => ['bike', 'scooter'].includes(r.vehicleType?.toLowerCase() ?? ''),
    },
    {
      key: 'auto', label: 'Autos', Icon: EmojiTransportationIcon, color: '#f59e0b',
      filterFn: (r) => ['auto', 'auto_rickshaw'].includes(r.vehicleType?.toLowerCase() ?? ''),
    },
    {
      key: 'cab', label: 'Cabs', Icon: LocalTaxiIcon, color: '#0ea5e9',
      filterFn: (r) => ['cab', 'hatchback', 'sedan', 'suv'].includes(r.vehicleType?.toLowerCase() ?? ''),
    },
    {
      key: 'shuttle', label: 'Shuttles & Buses', Icon: DirectionsBusIcon, color: '#16a34a',
      filterFn: (r) => ['shuttle', 'bus', 'minibus'].includes(r.vehicleType?.toLowerCase() ?? ''),
    },
  ],
  logistics: [
    {
      key: 'mini-cargo', label: 'Mini Cargo', Icon: AirportShuttleIcon, color: '#f59e0b',
      filterFn: (r) => ['tata_ace', 'mini_truck', 'mini_cargo'].includes(r.vehicleType?.toLowerCase() ?? ''),
    },
    {
      key: 'medium-goods', label: 'Medium Goods', Icon: LocalShippingIcon, color: '#0f766e',
      filterFn: (r) => ['dcm', 'medium_goods', 'pickup'].includes(r.vehicleType?.toLowerCase() ?? ''),
    },
    {
      key: 'heavy-truck', label: 'Heavy Trucks', Icon: FireTruckIcon, color: '#dc2626',
      filterFn: (r) => ['lorry', 'heavy_truck', 'trailer'].includes(r.vehicleType?.toLowerCase() ?? ''),
    },
  ],
};
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
import { constants } from '@gogaadi/utils';
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
  const isMultiType = category === 'mobility' || category === 'logistics';
  const vehicleSubTypes = isMultiType ? VEHICLE_SUB_TYPES_MGMT[category as 'mobility' | 'logistics'] : null;

  const [allRows, setAllRows] = useState<CustomerApprovalRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [tableSearch, setTableSearch] = useState('');
  const [selectedRow, setSelectedRow] = useState<CustomerApprovalRow | null>(null);

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

  // tabLists: multi-type → [All, ...perSubType, Rejected, Draft(pending)]; single → [All, Rejected, Draft(pending)]
  const tabLists: CustomerApprovalRow[][] = isMultiType && vehicleSubTypes
    ? [categoryRows, ...vehicleSubTypes.map((st) => categoryRows.filter(st.filterFn)), rejectedRows, pendingRows]
    : [categoryRows, rejectedRows, pendingRows];

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

  const subTypeOffset = isMultiType && vehicleSubTypes ? vehicleSubTypes.length : 0;

  const tabs = isMultiType && vehicleSubTypes
    ? [
        <Tab key='all' icon={<cfg.Icon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='All' />,
        ...vehicleSubTypes.map((st) => (
          <Tab key={st.key} icon={<st.Icon sx={{ fontSize: '1rem' }} />} iconPosition='start' label={st.label} />
        )),
        <Tab key='rejected' icon={<CancelOutlinedIcon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='Rejected' />,
        <Tab key='draft' icon={<PendingActionsIcon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='Draft' />,
      ]
    : [
        <Tab key='all' icon={<GroupIcon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='All' />,
        <Tab key='rejected' icon={<CancelOutlinedIcon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='Rejected' />,
        <Tab key='draft' icon={<PendingActionsIcon sx={{ fontSize: '1rem' }} />} iconPosition='start' label='Draft' />,
      ];

  // Expiry colour helper — green → amber (>50% elapsed) → red (≤6 h or expired)
  const expiryNode = (expiryStr: string | null, createdAt: string): React.ReactNode => {
    if (!expiryStr) return <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>—</span>;
    const now = Date.now();
    const expiry = new Date(expiryStr).getTime();
    const start = new Date(createdAt).getTime();
    const total = expiry - start;
    const remaining = expiry - now;
    let color = '#16a34a';
    if (remaining <= 0) color = '#dc2626';
    else if (remaining <= 6 * 3_600_000) color = '#dc2626';
    else if (total > 0 && (now - start) / total >= 0.5) color = '#d97706';
    const label = remaining <= 0 ? 'Expired' : fmtDate(expiryStr);
    return (
      <span style={{ color, fontWeight: remaining <= 6 * 3_600_000 ? 700 : 500, fontSize: '0.8rem' }}>
        {label}
      </span>
    );
  };

  const columns: Column<CustomerApprovalRow>[] = [
    // ── # ──────────────────────────────────────────────────────────────────────
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

    // ── Customer ───────────────────────────────────────────────────────────────
    {
      id: 'firstName',
      label: 'Customer',
      minWidth: 162,
      format: (_v: unknown, row: CustomerApprovalRow) => {
        const r = row as CustomerApprovalRow & Record<string, unknown>;
        const uid = (r.customerId as string) ?? String(r.id);
        return (
          <Stack spacing={0.15}>
            <Typography
              component='span'
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                window.open(
                  constants.AdminPath.CUSTOMER_DETAIL.replace(':id', uid),
                  '_blank',
                );
              }}
              sx={{
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer',
                color: '#1d4ed8',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(29,78,216,0.35)',
                textUnderlineOffset: '3px',
                lineHeight: 1.3,
                '&:hover': { color: '#1e40af' },
              }}
            >
              {`${row.firstName} ${row.lastName}`.trim() || '—'}
            </Typography>
            {row.email && (
              <Typography sx={{ fontSize: '0.71rem', color: '#64748b' }}>{row.email}</Typography>
            )}
            {row.phone && (
              <Typography sx={{ fontSize: '0.71rem', color: '#64748b' }}>{row.phone}</Typography>
            )}
            <Typography sx={{ fontSize: '0.69rem', fontWeight: 700, fontFamily: 'monospace', color: '#6366f1', letterSpacing: '0.3px' }}>
              {uid}
            </Typography>
          </Stack>
        );
      },
    },

    // ── Vehicle ────────────────────────────────────────────────────────────────
    {
      id: 'vehicleType',
      label: 'Vehicle',
      minWidth: 138,
      format: (_v: unknown, row: CustomerApprovalRow) => {
        const r = row as CustomerApprovalRow & Record<string, unknown>;
        const subType = r.vehicleSubType as string | undefined;
        const number = r.vehicleNumber as string | undefined;
        const fuel = r.fuelType as string | undefined;
        return (
          <Stack spacing={0.15}>
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, textTransform: 'capitalize', color: '#1e293b' }}>
              {row.vehicleType || '—'}{subType ? ` · ${subType}` : ''}
            </Typography>
            {number && (
              <Typography sx={{ fontSize: '0.74rem', fontFamily: 'monospace', fontWeight: 700, color: '#1d4ed8', letterSpacing: '0.5px' }}>
                {number}
              </Typography>
            )}
            {fuel && (
              <Typography sx={{ fontSize: '0.67rem', color: '#94a3b8', textTransform: 'capitalize' }}>
                {fuel}
              </Typography>
            )}
          </Stack>
        );
      },
    },

    // ── Vehicle Docs ───────────────────────────────────────────────────────────
    {
      id: 'rcNumber',
      label: 'Vehicle Docs',
      minWidth: 158,
      format: (_v: unknown, row: CustomerApprovalRow) => {
        const r = row as CustomerApprovalRow & Record<string, unknown>;
        const docs = [
          { label: 'RC',      number: r.rcNumber as string,        expiry: r.rcExpiry as string },
          { label: 'Ins',     number: r.insuranceNumber as string,  expiry: r.insuranceExpiry as string },
          { label: 'PUC',     number: r.pucNumber as string,        expiry: r.pucExpiry as string },
          { label: 'Fitness', number: r.fitnessNumber as string,    expiry: r.fitnessExpiry as string },
          { label: 'Permit',  number: r.permitNumber as string,     expiry: r.permitExpiry as string },
        ].filter((d) => d.number);
        if (!docs.length)
          return <Typography sx={{ fontSize: '0.72rem', color: '#cbd5e1' }}>—</Typography>;
        return (
          <Stack spacing={0.25}>
            {docs.map((d) => (
              <Typography key={d.label} sx={{ fontSize: '0.71rem', lineHeight: 1.4 }}>
                <span style={{ color: '#475569', fontWeight: 700, display: 'inline-block', minWidth: 42 }}>{d.label}</span>
                <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{d.number}</span>
                {d.expiry && (
                  <span style={{ display: 'inline-block', marginLeft: 4 }}>
                    {expiryNode(d.expiry, row.createdAt ?? '')}
                  </span>
                )}
              </Typography>
            ))}
          </Stack>
        );
      },
    },

    // ── Driver Docs ────────────────────────────────────────────────────────────
    {
      id: 'dlNumber',
      label: 'Driver Docs',
      minWidth: 142,
      format: (_v: unknown, row: CustomerApprovalRow) => {
        const r = row as CustomerApprovalRow & Record<string, unknown>;
        const docs = [
          { label: 'DL',  number: r.dlNumber as string,     expiry: r.dlExpiry as string | null },
          { label: ((r.idProofType as string) || 'ID').toUpperCase(), number: r.idProofNumber as string, expiry: null as string | null },
        ].filter((d) => d.number);
        if (!docs.length)
          return <Typography sx={{ fontSize: '0.72rem', color: '#cbd5e1' }}>—</Typography>;
        return (
          <Stack spacing={0.25}>
            {docs.map((d) => (
              <Typography key={d.label} sx={{ fontSize: '0.71rem', lineHeight: 1.4 }}>
                <span style={{ color: '#475569', fontWeight: 700, display: 'inline-block', minWidth: 28 }}>{d.label}</span>
                <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{d.number}</span>
                {d.expiry && (
                  <span style={{ display: 'inline-block', marginLeft: 4 }}>
                    {expiryNode(d.expiry, row.createdAt ?? '')}
                  </span>
                )}
              </Typography>
            ))}
          </Stack>
        );
      },
    },

    // ── Location ───────────────────────────────────────────────────────────────
    {
      id: 'city',
      label: 'Location',
      minWidth: 95,
      format: (_v: unknown, row: CustomerApprovalRow) => {
        const r = row as CustomerApprovalRow & Record<string, unknown>;
        return (
          <Stack spacing={0.15}>
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b' }}>
              {row.city || '—'}
            </Typography>
            {row.area && (
              <Typography sx={{ fontSize: '0.71rem', color: '#64748b' }}>{row.area}</Typography>
            )}
            {(r.pincode as string) && (
              <Typography sx={{ fontSize: '0.69rem', fontFamily: 'monospace', color: '#94a3b8' }}>
                {r.pincode as string}
              </Typography>
            )}
          </Stack>
        );
      },
    },

    // ── Active toggle ──────────────────────────────────────────────────────────
    {
      id: 'status',
      label: 'Active',
      minWidth: 80,
      align: 'center',
      sortable: false,
      format: (_v: unknown, row: CustomerApprovalRow) => {
        const isActive = row.status === 'approved';
        const label = isActive
          ? 'Active'
          : row.status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        return (
          <Tooltip title={label} placement='top'>
            <Stack alignItems='center' spacing={0.2}>
              <Switch
                size='small'
                checked={isActive}
                onChange={() => handleToggleStatus(row, isActive ? 'rejected' : 'approved')}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#16a34a' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#16a34a' },
                }}
              />
              <Typography sx={{ fontSize: '0.62rem', color: isActive ? '#16a34a' : '#94a3b8', fontWeight: 600 }}>
                {label}
              </Typography>
            </Stack>
          </Tooltip>
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
    selectedRow,
    setSelectedRow,
    handleToggleStatus,
    getFilteredData,
    isMultiType,
    vehicleSubTypes,
    subTypeOffset,
  };
};
