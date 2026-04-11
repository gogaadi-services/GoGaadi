import React, { useEffect, useState, useCallback } from 'react';
import { Typography, alpha } from '@mui/material';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Box } from '@gogaadi/component';
import { useNavigate, useLocation } from 'react-router-dom';
import { constants } from '@gogaadi/utils';
import { useAuthActionMutation } from '@gogaadi/services';
import { CustomerApprovalRow } from '../CustomerApprovals/hooks/useCustomerApprovals';

const { AdminPath } = constants;

interface MobilitySub {
  key: string;
  displayName: string;
  tagline: string;
  description: string;
  Icon: React.ElementType;
  color: string;
  vehicleTypes: string[];
  accessPath: string;
  managementPath: string;
}

const MOBILITY_SUBS: MobilitySub[] = [
  {
    key: 'bike-scooter',
    displayName: 'Bikes & Scooters',
    tagline: 'Two-Wheeler Operators',
    description: 'Review bike and scooter operator onboarding requests for last-mile and intracity mobility.',
    Icon: TwoWheelerIcon,
    color: '#6366f1',
    vehicleTypes: ['bike', 'scooter'],
    accessPath: AdminPath.MOBILITY_BIKE_SCOOTER_ACCESS,
    managementPath: AdminPath.MOBILITY_BIKE_SCOOTER_MANAGEMENT,
  },
  {
    key: 'auto',
    displayName: 'Autos',
    tagline: 'Auto & Auto Rickshaw Operators',
    description: 'Review auto and auto rickshaw operator onboarding requests for shared and private rides.',
    Icon: EmojiTransportationIcon,
    color: '#f59e0b',
    vehicleTypes: ['auto', 'auto_rickshaw'],
    accessPath: AdminPath.MOBILITY_AUTO_ACCESS,
    managementPath: AdminPath.MOBILITY_AUTO_MANAGEMENT,
  },
  {
    key: 'cab',
    displayName: 'Cabs',
    tagline: 'Hatchback, Sedan & SUV Operators',
    description: 'Review cab operator onboarding requests — hatchbacks, sedans and SUVs for city and outstation rides.',
    Icon: LocalTaxiIcon,
    color: '#0ea5e9',
    vehicleTypes: ['cab', 'hatchback', 'sedan', 'suv'],
    accessPath: AdminPath.MOBILITY_CAB_ACCESS,
    managementPath: AdminPath.MOBILITY_CAB_MANAGEMENT,
  },
  {
    key: 'shuttle',
    displayName: 'Shuttles & Buses',
    tagline: 'Shared Shuttle & Bus Operators',
    description: 'Review shuttle and bus operator onboarding requests for group transport and fixed-route services.',
    Icon: DirectionsBusIcon,
    color: '#16a34a',
    vehicleTypes: ['shuttle', 'bus', 'minibus'],
    accessPath: AdminPath.MOBILITY_SHUTTLE_ACCESS,
    managementPath: AdminPath.MOBILITY_SHUTTLE_MANAGEMENT,
  },
];

interface SubCounts {
  pending: number;
  review: number;
  approved: number;
}

function getVisuals(color: string) {
  return {
    gradient: `linear-gradient(135deg, ${color}cc 0%, ${color} 100%)`,
    glow: alpha(color, 0.35),
  };
}

const SubCard = ({
  sub,
  counts,
  isAccess,
  onClick,
}: {
  sub: MobilitySub;
  counts: SubCounts;
  isAccess: boolean;
  onClick: () => void;
}) => {
  const { gradient, glow } = getVisuals(sub.color);
  const Icon = sub.Icon;
  const notifCount = isAccess ? counts.pending + counts.review : 0;
  const hasNotif = notifCount > 0;
  const infoCount = !isAccess && counts.approved > 0 ? counts.approved : 0;
  const hasInfo = infoCount > 0;

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        background: 'background.paper',
        border: hasNotif
          ? `1.5px solid ${alpha(sub.color, 0.4)}`
          : '1.5px solid transparent',
        boxShadow: hasNotif
          ? `0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px ${alpha(sub.color, 0.15)}`
          : '0 2px 8px rgba(0,0,0,0.06)',
        borderRadius: '16px',
        p: 3,
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        '&:hover': {
          border: `1.5px solid ${sub.color}`,
          boxShadow: `0 0 0 3px ${glow}, 0 12px 40px rgba(0,0,0,0.12)`,
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* Accent top bar */}
      <Box
        sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: gradient,
          borderRadius: '16px 16px 0 0',
        }}
      />

      {/* Notification badge — top right (access mode only) */}
      {hasNotif && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            bgcolor: '#ef4444',
            color: '#fff',
            borderRadius: '20px',
            px: 1,
            py: '2px',
            minWidth: 22,
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <NotificationsActiveIcon sx={{ fontSize: '0.7rem' }} />
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, lineHeight: 1 }}>
            {notifCount > 99 ? '99+' : notifCount}
          </Typography>
        </Box>
      )}

      {/* Info badge — top right (management mode, approved count) */}
      {!hasNotif && hasInfo && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            bgcolor: alpha(sub.color, 0.12),
            color: sub.color,
            borderRadius: '20px',
            px: 1,
            py: '2px',
            minWidth: 22,
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, lineHeight: 1 }}>
            {infoCount > 99 ? '99+' : infoCount}
          </Typography>
        </Box>
      )}

      {/* Icon + title */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mt: 0.5 }}>
        <Box
          sx={{
            position: 'relative',
            width: 52, height: 52,
            borderRadius: '14px',
            background: gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 6px 18px ${glow}`,
            flexShrink: 0,
          }}
        >
          <Icon sx={{ fontSize: 26, color: '#fff' }} />
          {hasNotif && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 1, right: 1,
                width: 10, height: 10,
                borderRadius: '50%',
                bgcolor: '#ef4444',
                border: '2px solid #fff',
              }}
            />
          )}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2, pr: (hasNotif || hasInfo) ? 5 : 0 }}>
            {sub.displayName}
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 500, mt: 0.25 }}>
            {sub.tagline}
          </Typography>
        </Box>
      </Box>

      {/* Description */}
      <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', lineHeight: 1.65, mt: 2 }}>
        {sub.description}
      </Typography>

      {/* Notification breakdown (access mode) */}
      {hasNotif && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mt: 2,
            px: 1.5,
            py: 1,
            borderRadius: '10px',
            bgcolor: alpha('#ef4444', 0.06),
            border: `1px solid ${alpha('#ef4444', 0.15)}`,
          }}
        >
          {counts.pending > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <FiberManualRecordIcon sx={{ fontSize: '0.55rem', color: '#d97706' }} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706' }}>
                {counts.pending} pending
              </Typography>
            </Box>
          )}
          {counts.pending > 0 && counts.review > 0 && (
            <Box sx={{ width: '1px', height: 12, bgcolor: 'divider' }} />
          )}
          {counts.review > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <FiberManualRecordIcon sx={{ fontSize: '0.55rem', color: '#2563eb' }} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb' }}>
                {counts.review} in review
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* CTA hint */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: hasNotif ? 1.5 : 2.5 }}>
        <Box
          sx={{
            display: 'flex', alignItems: 'center', gap: 0.5,
            opacity: hasNotif ? 1 : 0.55,
            transition: 'opacity 0.2s',
            '.MuiBox-root:hover &': { opacity: 1 },
          }}
        >
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: sub.color }}>
            {isAccess ? (hasNotif ? 'Review Requests' : 'View Requests') : 'Manage'}
          </Typography>
          <ArrowForwardIcon sx={{ fontSize: '0.9rem', color: sub.color }} />
        </Box>
      </Box>
    </Box>
  );
};

const MobilityLanding = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [authAction] = useAuthActionMutation();
  const [counts, setCounts] = useState<Record<string, SubCounts>>({});
  const [totalPending, setTotalPending] = useState(0);

  const isAccess = pathname.includes('mobility-access');

  const fetchCounts = useCallback(async () => {
    try {
      const res = await authAction({ action: 'get-customer-onboardings' })
        .unwrap()
        .catch(() => ({ data: [] }));
      const rows: CustomerApprovalRow[] = res.data ?? [];

      const newCounts: Record<string, SubCounts> = {};
      for (const sub of MOBILITY_SUBS) {
        const subRows = rows.filter((r) =>
          sub.vehicleTypes.includes(r.vehicleType?.toLowerCase() ?? ''),
        );
        newCounts[sub.key] = {
          pending: subRows.filter((r) => r.status === 'pending').length,
          review: subRows.filter((r) => r.status === 'under_review').length,
          approved: subRows.filter((r) => r.status === 'approved').length,
        };
      }
      setCounts(newCounts);
      const mobilityRows = rows.filter((r) =>
        MOBILITY_SUBS.some((s) =>
          s.vehicleTypes.includes(r.vehicleType?.toLowerCase() ?? ''),
        ),
      );
      setTotalPending(
        mobilityRows.filter((r) => r.status === 'pending' || r.status === 'under_review').length,
      );
    } catch {
      setCounts({});
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  const heroTitle = isAccess ? 'Mobility Access' : 'Mobility Management';
  const heroSubtitle = isAccess
    ? 'Select a vehicle category to review mobility operator onboarding requests'
    : 'Select a vehicle category to manage mobility operators';

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Hero */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 3,
          py: 2.5,
          background: 'linear-gradient(135deg, #0f172a 0%, #312e81 55%, #6366f1 100%)',
          boxShadow: '0 8px 32px rgba(99,102,241,0.3)',
          borderRadius: '16px',
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 48, height: 48,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
            flexShrink: 0,
          }}
        >
          {isAccess
            ? <PendingActionsIcon sx={{ fontSize: 24, color: '#fff' }} />
            : <ManageAccountsIcon sx={{ fontSize: 24, color: '#fff' }} />}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.01em' }}>
            {heroTitle}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
            {heroSubtitle}
          </Typography>
        </Box>
        {isAccess && totalPending > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              bgcolor: alpha('#ef4444', 0.2),
              border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: '12px',
              px: 2,
              py: 1,
              flexShrink: 0,
            }}
          >
            <NotificationsActiveIcon sx={{ fontSize: '1rem', color: '#fca5a5' }} />
            <Box>
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', lineHeight: 1 }}>
                {totalPending}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.68rem' }}>
                awaiting review
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Sub-category grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
        }}
      >
        {MOBILITY_SUBS.map((sub) => (
          <SubCard
            key={sub.key}
            sub={sub}
            counts={counts[sub.key] ?? { pending: 0, review: 0, approved: 0 }}
            isAccess={isAccess}
            onClick={() => navigate(isAccess ? sub.accessPath : sub.managementPath)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MobilityLanding;
