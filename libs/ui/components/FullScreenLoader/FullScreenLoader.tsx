import { Backdrop, CircularProgress, Typography } from '@mui/material';
import { Box } from '@gogaadi/component';
import { useLoader } from '@gogaadi/hooks';
import { useAuth } from '@gogaadi/hooks';

const FullScreenLoader = () => {
  const { loaderVisible, loaderMessage } = useLoader();
  const { isConsultantMode, isConsultant } = useAuth();
  const consultantMode = isConsultantMode || isConsultant;
  const accentColor = consultantMode ? '#34d399' : '#818cf8';

  return (
    <Backdrop
      open={loaderVisible}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Spinner ring */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        {/* Outer glow ring */}
        <Box
          sx={{
            position: 'absolute',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
            animation: 'pulse 1.8s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)', opacity: 0.6 },
              '50%': { transform: 'scale(1.4)', opacity: 0.2 },
            },
          }}
        />
        <CircularProgress
          size={52}
          thickness={3.5}
          sx={{
            color: accentColor,
            filter: `drop-shadow(0 0 8px ${accentColor}88)`,
          }}
        />
      </Box>

      {/* Message */}
      {loaderMessage && (
        <Typography
          sx={{
            color: '#fff',
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: '0.3px',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {loaderMessage}
        </Typography>
      )}
    </Backdrop>
  );
};

export default FullScreenLoader;
