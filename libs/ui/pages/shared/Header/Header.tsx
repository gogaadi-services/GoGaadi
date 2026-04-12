import {
  AppBar,
  Badge,
  Chip,
  IconButton,
  Toolbar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@gogaadi/component';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useStyles } from './styles';
import { useSharedHeader } from './hooks/useSharedHeader';
import LogoMark from './components/LogoMark';
import SearchBar from './components/SearchBar';
import NotificationsMenu from './components/NotificationsMenu';
import UserMenu from './components/UserMenu';

// ── Color tokens ─────────────────────────────────────────────────────────────
const ADMIN_COLORS = {
  appBarBg: 'linear-gradient(135deg, #0d1b3e 0%, #0f2355 45%, #1a3a6b 100%)',
  chipBg: 'linear-gradient(135deg, rgba(99,102,241,0.35), rgba(79,70,229,0.25))',
  chipColor: '#c7d2fe',
  chipBorder: 'rgba(99,102,241,0.4)',
  chipIconColor: '#a5b4fc',
};

const CONSULTANT_COLORS = {
  appBarBg: 'linear-gradient(135deg, #052e16 0%, #064e3b 45%, #065f46 100%)',
  chipBg: 'linear-gradient(135deg, rgba(16,185,129,0.35), rgba(5,150,105,0.25))',
  chipColor: '#6ee7b7',
  chipBorder: 'rgba(16,185,129,0.45)',
  chipIconColor: '#34d399',
};

const Header = () => {
  const { classes } = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    isAdmin,
    isConsultantMode,
    consultantMode,
    anchorEl,
    notifAnchorEl,
    notifications,
    ticketSearch,
    showSearchResults,
    filteredIncidents,
    handleTicketSearchChange,
    handleSelectIncident,
    handleCloseSearchResults,
    handleSettingsOpen,
    handleSettingsClose,
    handleNotifOpen,
    handleNotifClose,
    handleNotifClick,
    handleNotifItemClick,
    handleAddNew,
    handleLogout,
    handleProfile,
    handleConsultantPage,
    handleAdminPage,
    handleLogoClick,
  } = useSharedHeader();

  const colors = consultantMode ? CONSULTANT_COLORS : ADMIN_COLORS;

  return (
    <AppBar position='fixed' className={classes.headerAppbar} sx={{ background: colors.appBarBg }}>
      <Toolbar className={classes.headerToolbar}>
        {/* Logo */}
        <Box className={classes.desktopLogoArea} onClick={handleLogoClick}>
          <LogoMark compact={isMobile} />
        </Box>

        <Box className={classes.logoDivider} />

        {/* Left: mode chip + notifications + add new */}
        <Box className={classes.headerLeft}>
          <Chip
            className={classes.adminChip}
            icon={
              consultantMode ? (
                <BadgeIcon sx={{ fontSize: '15px !important' }} />
              ) : (
                <AdminPanelSettingsIcon sx={{ fontSize: 15 }} />
              )
            }
            label={consultantMode ? 'CONSULTANT' : 'ADMIN'}
            size='small'
            sx={{
              background: `${colors.chipBg} !important`,
              color: `${colors.chipColor} !important`,
              border: `1px solid ${colors.chipBorder} !important`,
              '& .MuiChip-icon': { color: `${colors.chipIconColor} !important` },
            }}
          />

          <Tooltip title='Notifications' placement='bottom'>
            <IconButton onClick={handleNotifOpen} size='small' className={classes.iconBtnBase}>
              <Badge badgeContent={notifications.length} color='error'>
                <NotificationsIcon sx={{ fontSize: '1.25rem' }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title='Create New User' placement='bottom'>
            <IconButton onClick={handleAddNew} size='small' className={classes.iconBtnBase}>
              <AddCircleOutlineIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
          </Tooltip>
        </Box>

        <NotificationsMenu
          anchorEl={notifAnchorEl}
          onClose={handleNotifClose}
          onViewAll={handleNotifClick}
          onItemClick={handleNotifItemClick}
          notifications={notifications}
        />

        {/* Center: mobile search */}
        <Box className={classes.centerSearchWrap}>
          <Box className={classes.mobileSearch}>
            <SearchBar
              value={ticketSearch}
              onChange={handleTicketSearchChange}
              onClickAway={handleCloseSearchResults}
              showResults={showSearchResults}
              incidents={filteredIncidents}
              onSelectIncident={handleSelectIncident}
              className={classes.mobileSearchField}
              wrapperClassName={classes.ticketSearchWrapper}
              dropdownClassName={classes.searchDropdown}
              noResultsClassName={classes.searchNoResults}
            />
          </Box>
        </Box>

        {/* Right: desktop search + settings */}
        <Box className={classes.headerRight}>
          <Box className={classes.headerFields}>
            <SearchBar
              value={ticketSearch}
              onChange={handleTicketSearchChange}
              onClickAway={handleCloseSearchResults}
              showResults={showSearchResults}
              incidents={filteredIncidents}
              onSelectIncident={handleSelectIncident}
              className={classes.textField}
              wrapperClassName={classes.ticketSearchWrapper}
              dropdownClassName={classes.searchDropdown}
              noResultsClassName={classes.searchNoResults}
            />
          </Box>

          <Tooltip title='Settings' placement='bottom'>
            <IconButton size='small' className={classes.iconBtnBase} onClick={handleSettingsOpen}>
              <SettingsIcon className={classes.icon} />
            </IconButton>
          </Tooltip>

          <UserMenu
            anchorEl={anchorEl}
            onClose={handleSettingsClose}
            onProfile={handleProfile}
            onConsultantPage={handleConsultantPage}
            onAdminPage={handleAdminPage}
            onLogout={handleLogout}
            isAdmin={isAdmin}
            isConsultantMode={isConsultantMode}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
