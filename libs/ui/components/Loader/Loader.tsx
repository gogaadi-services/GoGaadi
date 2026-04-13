import { Backdrop, CircularProgress, Box, LinearProgress, Typography } from '@mui/material';
import { useStyles } from './styles';
import { useAuth, useLoader } from '@gogaadi/hooks';

export interface DSLoaderProps {
  size?: number | string;
  thickness?: number;
  color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'success' | 'warning';
  text?: string;
  fullScreen?: boolean;
  className?: string;
  variant?: 'circular' | 'linear';
  value?: number;
  sx?: any;
  overlay?: boolean;
  overlayColor?: string;
  globalOverlay?: boolean;
}

const Loader: React.FC<DSLoaderProps> = ({
  size = 40,
  thickness = 4,
  color = 'primary',
  text,
  fullScreen = false,
  className,
  variant = 'circular',
  value,
  sx,
  overlay = false,
  overlayColor = 'rgba(255, 255, 255, 0.8)',
  globalOverlay = false,
  ...rest
}) => {
  const { cx, classes } = useStyles();
  const { loaderVisible, loaderMessage } = useLoader();
  const { isConsultantMode, isConsultant } = useAuth();

  if (globalOverlay) {
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
  }

  const loader =
    variant === 'circular' ? (
      <CircularProgress size={size} thickness={thickness} color={color} {...rest} />
    ) : (
      <LinearProgress
        variant={value !== undefined ? 'determinate' : 'indeterminate'}
        value={value}
        color={color}
        sx={{ width: '100%', ...sx }}
        {...rest}
      />
    );

  if (overlay) {
    return (
      <Box className={cx(classes.overlay, className)} style={{ backgroundColor: overlayColor }}>
        <Box className={classes.overlayContent}>
          {loader}
          {text && <Box className={classes.text}>{text}</Box>}
        </Box>
      </Box>
    );
  }

  return (
    <Box className={cx(classes.root, fullScreen && classes.fullScreen, className)} sx={sx}>
      {loader}
      {text && <Box className={classes.text}>{text}</Box>}
    </Box>
  );
};

export default Loader;
