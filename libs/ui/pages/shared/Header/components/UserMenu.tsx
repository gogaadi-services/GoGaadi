import { Menu, MenuItem, Divider, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onProfile: () => void;
  onConsultantPage: () => void;
  onAdminPage: () => void;
  onLogout: () => void;
  isAdmin: boolean;
  isConsultantMode: boolean;
}

const UserMenu = ({
  anchorEl,
  onClose,
  onProfile,
  onConsultantPage,
  onAdminPage,
  onLogout,
  isAdmin,
  isConsultantMode,
}: UserMenuProps) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <MenuItem onClick={onProfile}>
      <ListItemIcon>
        <AccountCircleIcon fontSize='small' />
      </ListItemIcon>
      <ListItemText>Your Profile</ListItemText>
    </MenuItem>
    <Divider />
    {isAdmin && !isConsultantMode && (
      <MenuItem onClick={onConsultantPage}>
        <ListItemIcon>
          <BusinessCenterIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Consultant Page</ListItemText>
      </MenuItem>
    )}
    {isAdmin && isConsultantMode && (
      <MenuItem onClick={onAdminPage}>
        <ListItemIcon>
          <AdminPanelSettingsIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Admin Page</ListItemText>
      </MenuItem>
    )}
    <Divider />
    <MenuItem onClick={onClose}>
      <ListItemIcon>
        <HelpOutlineIcon fontSize='small' />
      </ListItemIcon>
      <ListItemText>Help & Support</ListItemText>
    </MenuItem>
    <Divider />
    <MenuItem onClick={onLogout}>
      <ListItemIcon>
        <LogoutIcon fontSize='small' />
      </ListItemIcon>
      <ListItemText>Logout</ListItemText>
    </MenuItem>
  </Menu>
);

export default UserMenu;
