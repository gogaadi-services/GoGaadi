import { Typography } from '@mui/material';
import { Box } from '@gogaadi/component';

interface LogoMarkProps {
  compact?: boolean;
}

const STATIC_COLORS = {
  G: '#fbbf24',
  d: '#60a5fa',
  I: '#c084fc',
};

const LogoMark = ({ compact = false }: LogoMarkProps) => {
  const textSize = compact ? '1.1rem' : '1.4rem';
  const textSx = {
    fontWeight: 900,
    fontSize: textSize,
    lineHeight: 1,
    letterSpacing: '0.04em',
    fontFamily: '"Segoe UI Black","Segoe UI","Helvetica Neue",Arial,sans-serif',
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: compact ? 0.875 : 1.25, flexShrink: 0 }}>
      {/* Icon badge */}
      <Box
        sx={{
          width: compact ? 30 : 40,
          height: compact ? 30 : 40,
          borderRadius: compact ? '8px' : '11px',
          background: 'linear-gradient(145deg, #6d28d9 0%, #2563eb 35%, #059669 70%, #d97706 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          boxShadow:
            '0 0 0 1.5px rgba(255,255,255,0.22), 0 4px 18px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.18)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '48%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)',
            borderRadius: compact ? '8px 8px 0 0' : '11px 11px 0 0',
            zIndex: 0,
          }}
        />
        <svg
          width={compact ? 16 : 22}
          height={compact ? 16 : 22}
          viewBox='0 0 24 24'
          fill='none'
          style={{
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.3))',
          }}
        >
          <path
            d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'
            fill='rgba(255,255,255,0.2)'
            stroke='white'
            strokeWidth='1.4'
            strokeLinejoin='round'
          />
          <circle cx='12' cy='9' r='2.5' fill='white' />
        </svg>
      </Box>

      {/* Wordmark: GogaadI */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: compact ? '1px' : '2px',
            overflow: 'visible',
          }}
        >
          {/* G */}
          <Typography
            component='span'
            sx={{
              ...textSx,
              color: STATIC_COLORS.G,
              textShadow: `0 0 10px ${STATIC_COLORS.G}66, 0 1px 3px rgba(0,0,0,0.2)`,
            }}
          >
            G
          </Typography>

          {/* o */}
          <Typography component='span' sx={{ ...textSx, color: '#f1f5f9' }}>o</Typography>

          {/* g */}
          <Typography component='span' sx={{ ...textSx, color: '#f1f5f9' }}>g</Typography>

          {/* a */}
          <Typography component='span' sx={{ ...textSx, color: '#f1f5f9' }}>a</Typography>

          {/* a */}
          <Typography component='span' sx={{ ...textSx, color: '#f1f5f9' }}>a</Typography>

          {/* d */}
          <Typography
            component='span'
            sx={{
              ...textSx,
              color: STATIC_COLORS.d,
              textShadow: `0 0 10px ${STATIC_COLORS.d}66, 0 1px 3px rgba(0,0,0,0.2)`,
            }}
          >
            d
          </Typography>

          {/* I */}
          <Typography
            component='span'
            sx={{
              ...textSx,
              color: STATIC_COLORS.I,
              textShadow: `0 0 10px ${STATIC_COLORS.I}66, 0 1px 3px rgba(0,0,0,0.2)`,
            }}
          >
            I
          </Typography>
        </Box>

        {!compact && (
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.42rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 700,
              lineHeight: 1,
              marginTop: '4px',
            }}
          >
            Travel Platform
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LogoMark;
