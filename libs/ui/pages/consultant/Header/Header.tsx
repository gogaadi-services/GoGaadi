import { useState } from 'react';
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Avatar,
  Typography as MuiTypography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box, Tooltip, Typography } from '@gogaadi/component';
import { constants } from '@gogaadi/utils';
import { useAuth } from '@gogaadi/hooks';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import BadgeIcon from '@mui/icons-material/Badge';

const ConsultantHeader = () => {
  const navigate = useNavigate();
  const { AuthPath, AdminPath } = constants;
  const { user, isAdmin, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const userName =
    user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Consultant';

  const handleSettingsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const handleAdminPage = () => {
    handleSettingsClose();
    setLoadingMessage('Switching to Admin Mode...');
    setIsLoading(true);
    setTimeout(() => {
      navigate(AdminPath.DASHBOARD);
      setIsLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    handleSettingsClose();
    logout();
    navigate(AuthPath.SIGNIN);
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.35)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: 56, gap: 2 }}>
        {/* Logo area */}
        <Box
          onClick={() => navigate(AdminPath.PEOPLE_ACCESS)}
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BadgeIcon sx={{ color: '#fff', fontSize: '1.1rem' }} />
          </Box>
          <Typography
            sx={{ fontWeight: 700, fontSize: '1rem', color: '#fff', letterSpacing: '0.3px' }}
          >
            GoGaadi
          </Typography>
        </Box>

        <Chip
          label='CONSULTANT'
          size='small'
          sx={{
            bgcolor: 'rgba(99,102,241,0.22)',
            color: '#a5b4fc',
            fontWeight: 700,
            fontSize: '0.65rem',
            border: '1px solid rgba(99,102,241,0.45)',
            letterSpacing: '0.07em',
            height: 20,
          }}
        />

        <Box sx={{ flex: 1 }} />

        {/* User info + settings */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#e2e8f0' }}>
              {userName}
            </Typography>
            <Typography sx={{ fontSize: '0.65rem', color: '#94a3b8' }}>Consultant</Typography>
          </Box>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#6366f1',
              fontSize: '0.78rem',
              fontWeight: 700,
            }}
          >
            {userName
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </Avatar>
          <Tooltip title='Settings' placement='bottom'>
            <IconButton onClick={handleSettingsOpen} size='small'>
              <SettingsIcon sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.15rem' }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleSettingsClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{ paper: { sx: { mt: 1, minWidth: 180 } } }}
        >
          {isAdmin && (
            <MenuItem onClick={handleAdminPage}>
              <ListItemIcon>
                <AdminPanelSettingsIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Admin Page</ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2, flexDirection: 'column', gap: 2 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' size={52} />
        <MuiTypography variant='h6' sx={{ fontWeight: 700 }}>
          {loadingMessage}
        </MuiTypography>
      </Backdrop>
    </AppBar>
  );
};

export default ConsultantHeader;
