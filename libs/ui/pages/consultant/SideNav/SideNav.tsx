import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from '@gogaadi/component';
import { useCollapse } from '@gogaadi/hooks';
import { constants } from '@gogaadi/utils';
import { useStyles } from '../../admin/SideNav/styles';

const MENU_ITEMS = [
  {
    label: 'Customer Access',
    icon: <HowToRegIcon />,
    path: constants.AdminPath.PEOPLE_ACCESS,
  },
  {
    label: 'Customer Management',
    icon: <ManageAccountsIcon />,
    path: constants.AdminPath.PEOPLE_MANAGEMENT,
  },
];

const GROUP_COLOR = {
  gradient: 'linear-gradient(90deg, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0.05) 100%)',
  labelColor: '#a5b4fc',
  border: 'rgba(99,102,241,0.55)',
  glowColor: 'rgba(99,102,241,0.3)',
  dotColor: '#6366f1',
};

const ConsultantSideNav = () => {
  const { cx, classes } = useStyles();
  const { collapsed, toggleCollapse } = useCollapse();
  const location = useLocation();

  return (
    <Drawer
      variant='permanent'
      className={cx(classes.drawer, collapsed ? classes.drawerCollapsed : '')}
    >
      {/* Collapse toggle */}
      <Box className={collapsed ? classes.toggleButtonCenter : classes.toggleButtonRight}>
        <IconButton onClick={toggleCollapse}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Box className={classes.navScrollArea}>
        <List className={classes.navList}>
          <Box className={classes.navGroupBox}>
            {/* Section header */}
            {!collapsed ? (
              <Box
                className={classes.sectionHeaderExpanded}
                sx={{
                  mt: 1,
                  mb: '15px',
                  background: GROUP_COLOR.gradient,
                  borderLeft: `3px solid ${GROUP_COLOR.border}`,
                  boxShadow: `0 2px 12px ${GROUP_COLOR.glowColor}`,
                }}
              >
                <Box
                  className={classes.sectionGroupDot}
                  sx={{
                    background: GROUP_COLOR.dotColor,
                    boxShadow: `0 0 8px ${GROUP_COLOR.dotColor}, 0 0 14px ${GROUP_COLOR.dotColor}88`,
                  }}
                />
                <Typography
                  className={classes.sectionGroupLabel}
                  sx={{
                    color: GROUP_COLOR.labelColor,
                    textShadow: `0 0 12px ${GROUP_COLOR.labelColor}88`,
                  }}
                >
                  Customer
                </Typography>
              </Box>
            ) : (
              <Tooltip title='Customer' placement='right' arrow>
                <Box
                  className={classes.sectionDividerCollapsed}
                  sx={{
                    mt: 1,
                    mb: 0.75,
                    background: `linear-gradient(90deg, ${GROUP_COLOR.border}, transparent)`,
                    boxShadow: `0 0 8px ${GROUP_COLOR.glowColor}`,
                  }}
                />
              </Tooltip>
            )}

            {/* Nav items */}
            {MENU_ITEMS.map((item) => {
              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(`${item.path}/`);
              return (
                <Tooltip
                  key={item.label}
                  title={collapsed ? item.label : ''}
                  placement='right'
                  arrow
                >
                  <Box>
                    <ListItem
                      component={Link}
                      to={item.path}
                      className={cx(classes.listItem, isActive ? classes.activeItem : '')}
                    >
                      <ListItemIcon
                        className={cx(
                          classes.icon,
                          collapsed ? classes.iconMarginCollapsed : classes.iconMarginExpanded,
                        )}
                      >
                        {item.icon}
                      </ListItemIcon>
                      {!collapsed && (
                        <ListItemText primary={item.label} className={classes.text} />
                      )}
                    </ListItem>
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        </List>
      </Box>
    </Drawer>
  );
};

export default ConsultantSideNav;
