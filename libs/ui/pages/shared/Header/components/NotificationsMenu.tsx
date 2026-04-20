import { Menu, MenuItem, Divider, Avatar, ListItemIcon, ListItemText, Chip, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { NotificationItem } from '../hooks/useSharedHeader';

interface NotificationsMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onViewAll: () => void;
  onItemClick: (item: NotificationItem) => void;
  notifications: NotificationItem[];
}

const fmtTime = (iso?: string): string => {
  if (!iso) return '';
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  } catch { return ''; }
};

const getInitials = (name: string): string =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '?';

const NotificationsMenu = ({
  anchorEl,
  onClose,
  onViewAll,
  onItemClick,
  notifications,
}: NotificationsMenuProps) => {
  const onboardingItems = notifications.filter((n) => n.type === 'onboarding');
  const roleItems = notifications.filter((n) => n.type === 'role-request');

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: {
          sx: {
            minWidth: 340,
            maxWidth: 380,
            maxHeight: 500,
            borderRadius: '14px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
            overflow: 'hidden',
          },
        },
      }}
    >
      {/* Header */}
      <MenuItem disabled sx={{ opacity: '1 !important', px: 2, py: 1.25 }}>
        <ListItemText
          primary={
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'text.primary' }}>
              Notifications
              {notifications.length > 0 && (
                <Chip
                  label={notifications.length}
                  size='small'
                  color='error'
                  sx={{ ml: 1, height: 18, fontSize: '0.68rem', fontWeight: 700 }}
                />
              )}
            </Typography>
          }
        />
      </MenuItem>
      <Divider sx={{ my: 0 }} />

      {notifications.length === 0 ? (
        <MenuItem disabled sx={{ py: 3 }}>
          <ListItemText
            primary='All caught up!'
            secondary='No pending requests'
            primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}
            secondaryTypographyProps={{ fontSize: '0.78rem', textAlign: 'center' }}
          />
        </MenuItem>
      ) : (
        <>
          {/* Onboarding section */}
          {onboardingItems.length > 0 && (
            <>
              <MenuItem disabled sx={{ opacity: '1 !important', py: 0.5, px: 2 }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  New Tickets ({onboardingItems.length})
                </Typography>
              </MenuItem>
              {onboardingItems.slice(0, 8).map((item) => (
                <MenuItem
                  key={item.id}
                  onClick={() => onItemClick(item)}
                  sx={{
                    px: 2,
                    py: 1,
                    gap: 1.25,
                    '&:hover': { bgcolor: `${item.color}0d` },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <Avatar
                      sx={{
                        width: 34,
                        height: 34,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        bgcolor: item.color,
                        flexShrink: 0,
                      }}
                    >
                      {getInitials(item.name)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    secondary={item.subtitle}
                    primaryTypographyProps={{ fontSize: '0.84rem', fontWeight: 600, lineHeight: 1.3 }}
                    secondaryTypographyProps={{ fontSize: '0.72rem', color: item.color, fontWeight: 500 }}
                  />
                  <ListItemText
                    sx={{ textAlign: 'right', flexShrink: 0, minWidth: 0 }}
                    secondary={
                      <>
                        <Typography component='span' sx={{ fontSize: '0.65rem', color: 'text.disabled', display: 'block' }}>
                          {fmtTime(item.createdAt)}
                        </Typography>
                        <Chip
                          label={item.status === 'under_review' ? 'In Review' : 'Pending'}
                          size='small'
                          sx={{
                            height: 16,
                            fontSize: '0.6rem',
                            fontWeight: 700,
                            bgcolor: item.status === 'under_review' ? '#dbeafe' : '#fef3c7',
                            color: item.status === 'under_review' ? '#1d4ed8' : '#92400e',
                            mt: 0.25,
                          }}
                        />
                      </>
                    }
                  />
                </MenuItem>
              ))}
              {onboardingItems.length > 8 && (
                <MenuItem disabled sx={{ py: 0.5, px: 2 }}>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.disabled' }}>
                    +{onboardingItems.length - 8} more tickets
                  </Typography>
                </MenuItem>
              )}
            </>
          )}

          {/* Role requests section */}
          {roleItems.length > 0 && (
            <>
              {onboardingItems.length > 0 && <Divider sx={{ my: 0.5 }} />}
              <MenuItem disabled sx={{ opacity: '1 !important', py: 0.5, px: 2 }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  Access Requests ({roleItems.length})
                </Typography>
              </MenuItem>
              {roleItems.slice(0, 5).map((item) => (
                <MenuItem
                  key={item.id}
                  onClick={() => onItemClick(item)}
                  sx={{
                    px: 2,
                    py: 1,
                    gap: 1.25,
                    '&:hover': { bgcolor: `${item.color}0d` },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <Avatar
                      sx={{
                        width: 34,
                        height: 34,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        bgcolor: item.color,
                        flexShrink: 0,
                      }}
                    >
                      {getInitials(item.name)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    secondary={item.subtitle}
                    primaryTypographyProps={{ fontSize: '0.84rem', fontWeight: 600, lineHeight: 1.3 }}
                    secondaryTypographyProps={{ fontSize: '0.72rem', color: item.color, fontWeight: 500 }}
                  />
                  <ListItemText
                    sx={{ textAlign: 'right', flexShrink: 0, minWidth: 0 }}
                    secondary={
                      <Typography component='span' sx={{ fontSize: '0.65rem', color: 'text.disabled', display: 'block' }}>
                        {fmtTime(item.createdAt)}
                      </Typography>
                    }
                  />
                </MenuItem>
              ))}
            </>
          )}
        </>
      )}

      <Divider sx={{ my: 0 }} />
      <MenuItem
        onClick={onViewAll}
        sx={{
          py: 1.25,
          justifyContent: 'center',
          gap: 0.75,
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <AssignmentIndIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: 'primary.main' }}>
          View All Access Requests
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default NotificationsMenu;
