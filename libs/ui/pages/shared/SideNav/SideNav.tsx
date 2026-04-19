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
import { Link, useLocation } from 'react-router-dom';
import { useStyles } from './SideNav.styles';
import { useAdminMenuItems, useConsultantMenuItems } from './components/MenuItems';
import { Tooltip } from '../../../components';
import { useCollapse, useAuth } from '@gogaadi/hooks';

// ── Group accent config ───────────────────────────────────────────────────────
const ADMIN_GROUP_CONFIG: Record<
  string,
  { gradient: string; labelColor: string; border: string; glowColor: string; dotColor: string }
> = {
  Governance: {
    gradient: 'linear-gradient(90deg, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0.05) 100%)',
    labelColor: '#a5b4fc',
    border: 'rgba(99,102,241,0.55)',
    glowColor: 'rgba(99,102,241,0.3)',
    dotColor: '#6366f1',
  },
  Administration: {
    gradient: 'linear-gradient(90deg, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.04) 100%)',
    labelColor: '#6ee7b7',
    border: 'rgba(16,185,129,0.55)',
    glowColor: 'rgba(16,185,129,0.25)',
    dotColor: '#10b981',
  },
  'People & Organizations': {
    gradient: 'linear-gradient(90deg, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0.04) 100%)',
    labelColor: '#7dd3fc',
    border: 'rgba(14,165,233,0.55)',
    glowColor: 'rgba(14,165,233,0.25)',
    dotColor: '#0ea5e9',
  },
  'Mobility Services': {
    gradient: 'linear-gradient(90deg, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.05) 100%)',
    labelColor: '#c4b5fd',
    border: 'rgba(139,92,246,0.55)',
    glowColor: 'rgba(139,92,246,0.3)',
    dotColor: '#8b5cf6',
  },
  Overview: {
    gradient: 'linear-gradient(90deg, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0.05) 100%)',
    labelColor: '#a5b4fc',
    border: 'rgba(99,102,241,0.55)',
    glowColor: 'rgba(99,102,241,0.3)',
    dotColor: '#6366f1',
  },
  People: {
    gradient: 'linear-gradient(90deg, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.04) 100%)',
    labelColor: '#d8b4fe',
    border: 'rgba(168,85,247,0.55)',
    glowColor: 'rgba(168,85,247,0.28)',
    dotColor: '#a855f7',
  },
  Customer: {
    gradient: 'linear-gradient(90deg, rgba(14,165,233,0.2) 0%, rgba(14,165,233,0.04) 100%)',
    labelColor: '#7dd3fc',
    border: 'rgba(14,165,233,0.55)',
    glowColor: 'rgba(14,165,233,0.28)',
    dotColor: '#0ea5e9',
  },
  Finance: {
    gradient: 'linear-gradient(90deg, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0.04) 100%)',
    labelColor: '#fcd34d',
    border: 'rgba(245,158,11,0.55)',
    glowColor: 'rgba(245,158,11,0.25)',
    dotColor: '#f59e0b',
  },
  Reports: {
    gradient: 'linear-gradient(90deg, rgba(239,68,68,0.18) 0%, rgba(239,68,68,0.04) 100%)',
    labelColor: '#fca5a5',
    border: 'rgba(239,68,68,0.5)',
    glowColor: 'rgba(239,68,68,0.22)',
    dotColor: '#ef4444',
  },
  Configuration: {
    gradient: 'linear-gradient(90deg, rgba(107,114,128,0.2) 0%, rgba(107,114,128,0.04) 100%)',
    labelColor: '#d1d5db',
    border: 'rgba(107,114,128,0.5)',
    glowColor: 'rgba(107,114,128,0.22)',
    dotColor: '#6b7280',
  },
};

// Green accent for consultant Customer group
const CONSULTANT_GROUP_CONFIG: Record<
  string,
  { gradient: string; labelColor: string; border: string; glowColor: string; dotColor: string }
> = {
  Customer: {
    gradient: 'linear-gradient(90deg, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.05) 100%)',
    labelColor: '#6ee7b7',
    border: 'rgba(16,185,129,0.55)',
    glowColor: 'rgba(16,185,129,0.3)',
    dotColor: '#10b981',
  },
};

const ADMIN_DRAWER_BG = 'linear-gradient(180deg, #0d1b3e 0%, #0f2355 40%, #0a1a3a 100%)';
const CONSULTANT_DRAWER_BG = 'linear-gradient(180deg, #052e16 0%, #064e3b 40%, #042f1f 100%)';

const SideNav = () => {
  const { cx, classes } = useStyles();
  const { isConsultantMode, isConsultant } = useAuth();
  const consultantMode = isConsultantMode || isConsultant;

  const adminMenuGroups = useAdminMenuItems();
  const consultantMenuGroups = useConsultantMenuItems();
  const menuGroups = consultantMode ? consultantMenuGroups : adminMenuGroups;
  const groupConfig = consultantMode ? CONSULTANT_GROUP_CONFIG : ADMIN_GROUP_CONFIG;

  const { collapsed, toggleCollapse } = useCollapse();
  const location = useLocation();

  return (
    <Drawer
      variant='permanent'
      className={cx(classes.drawer, collapsed ? classes.drawerCollapsed : '')}
      sx={{
        '& .MuiDrawer-paper': {
          background: consultantMode ? CONSULTANT_DRAWER_BG : ADMIN_DRAWER_BG,
          boxShadow: consultantMode
            ? '4px 0 32px rgba(5,46,22,0.7), inset -1px 0 0 rgba(255,255,255,0.06)'
            : '4px 0 32px rgba(13,27,62,0.7), inset -1px 0 0 rgba(255,255,255,0.06)',
        },
      }}
    >
      {/* Collapse toggle */}
      <Box className={collapsed ? classes.toggleButtonCenter : classes.toggleButtonRight}>
        <IconButton onClick={toggleCollapse}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      {/* Scrollable nav area */}
      <Box className={classes.navScrollArea}>
        <List className={classes.navList}>
          {menuGroups.map((group, groupIdx) => {
            const cfg = groupConfig[group.group] ?? ADMIN_GROUP_CONFIG['Overview'];

            return (
              <Box key={group.group} className={classes.navGroupBox}>
                {/* Section header */}
                {!collapsed ? (
                  <Box
                    className={classes.sectionHeaderExpanded}
                    sx={{
                      mt: groupIdx === 0 ? 1 : 2.5,
                      mb: '15px',
                      background: cfg.gradient,
                      borderLeft: `3px solid ${cfg.border}`,
                      boxShadow: `0 2px 12px ${cfg.glowColor}`,
                    }}
                  >
                    <Box
                      className={classes.sectionGroupDot}
                      sx={{
                        background: cfg.dotColor,
                        boxShadow: `0 0 8px ${cfg.dotColor}, 0 0 14px ${cfg.dotColor}88`,
                      }}
                    />
                    <Typography
                      className={classes.sectionGroupLabel}
                      sx={{
                        color: cfg.labelColor,
                        textShadow: `0 0 12px ${cfg.labelColor}88`,
                      }}
                    >
                      {group.group}
                    </Typography>
                  </Box>
                ) : (
                  <Tooltip title={group.group} placement='right' arrow>
                    <Box
                      className={classes.sectionDividerCollapsed}
                      sx={{
                        mt: groupIdx === 0 ? 1 : 2,
                        mb: 0.75,
                        background: `linear-gradient(90deg, ${cfg.border}, transparent)`,
                        boxShadow: `0 0 8px ${cfg.glowColor}`,
                      }}
                    />
                  </Tooltip>
                )}

                {/* Nav items */}
                {group.items.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== '/' && location.pathname.startsWith(`${item.path}/`));

                  return (
                    <Tooltip
                      key={item.label}
                      title={collapsed ? item.label : ''}
                      placement='right'
                      arrow
                    >
                      <Box>
                        <ListItem
                          component={item.path ? Link : 'div'}
                          to={item.path || ''}
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
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideNav;
