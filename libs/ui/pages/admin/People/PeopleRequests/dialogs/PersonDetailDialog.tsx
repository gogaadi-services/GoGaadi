import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Chip,
  Divider,
  Button,
  Grid,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { AccessRequestRow, ActionType } from '../types/accessRequests.types';

const Field = ({ label, value }: { label: string; value?: string | number | boolean | null }) => (
  <Box>
    <Typography
      variant='caption'
      sx={{
        color: 'text.secondary',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontSize: '0.68rem',
      }}
    >
      {label}
    </Typography>
    <Typography variant='body2' sx={{ mt: 0.25, fontWeight: 500, wordBreak: 'break-word' }}>
      {value != null && value !== '' ? String(value) : '—'}
    </Typography>
  </Box>
);

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  pending_approval: { color: '#d97706', bg: '#fef3c7' },
  approved: { color: '#16a34a', bg: '#dcfce7' },
  rejected: { color: '#dc2626', bg: '#fee2e2' },
  active: { color: '#16a34a', bg: '#dcfce7' },
  inactive: { color: '#6b7280', bg: '#f3f4f6' },
};

interface PersonDetailDialogProps {
  open: boolean;
  row: AccessRequestRow | null;
  actionInProgress: number | null;
  onClose: () => void;
  onAction: (row: AccessRequestRow, type: ActionType) => void;
}

const PersonDetailDialog = ({
  open,
  row,
  actionInProgress,
  onClose,
  onAction,
}: PersonDetailDialogProps) => {
  if (!row) return null;

  const statusMeta = STATUS_COLORS[row.status ?? ''] ?? { color: '#6b7280', bg: '#f3f4f6' };
  const isPending = row.status === 'pending_approval';
  const RoleIcon = row.requestedRole === 'admin' ? AdminPanelSettingsIcon : BusinessCenterIcon;
  const roleColor = row.requestedRole === 'admin' ? '#f59e0b' : '#10b981';
  const isProcessing = actionInProgress === (row.id as number);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 3, overflow: 'hidden' } } }}
    >
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3a6b 100%)',
          px: 3,
          py: 2.5,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={onClose}
          size='small'
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            color: 'rgba(255,255,255,0.7)',
            '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.12)' },
          }}
        >
          <CloseIcon fontSize='small' />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={row.profilePicture ?? undefined}
            sx={{ width: 52, height: 52, bgcolor: `${roleColor}33`, border: `2px solid ${roleColor}66` }}
          >
            <PersonIcon sx={{ color: roleColor }} />
          </Avatar>
          <Box>
            <Typography variant='h6' fontWeight={700} sx={{ color: '#fff', lineHeight: 1.2 }}>
              {row.name || `${row.firstName} ${row.lastName}`.trim()}
            </Typography>
            <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.65)' }}>
              {row.email}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 0.75, flexWrap: 'wrap' }}>
              <Chip
                icon={<RoleIcon sx={{ fontSize: '13px !important', color: `${roleColor} !important` }} />}
                label={row.requestedRole ?? 'Unknown'}
                size='small'
                sx={{
                  bgcolor: `${roleColor}22`,
                  color: roleColor,
                  border: `1px solid ${roleColor}44`,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  textTransform: 'capitalize',
                }}
              />
              <Chip
                label={(row.status ?? '').replace('_', ' ')}
                size='small'
                sx={{
                  bgcolor: statusMeta.bg,
                  color: statusMeta.color,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  textTransform: 'capitalize',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Field label='First Name' value={row.firstName} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Last Name' value={row.lastName} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Phone' value={row.phone} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Gender' value={row.gender} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='City' value={row.city} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Date of Birth' value={row.dateOfBirth} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider><Typography variant='caption' color='text.secondary'>Access Details</Typography></Divider>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Field label='Requested Role' value={row.requestedRole} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Business Unit' value={row.businessUnit} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Employee ID' value={row.employeeId} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Application' value={row.application} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Access From' value={row.accessFromDate} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Access To' value={row.accessToDate} />
          </Grid>

          {row.reasonForAccess && (
            <>
              <Grid size={{ xs: 12 }}>
                <Divider />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field label='Reason for Access' value={row.reasonForAccess} />
              </Grid>
            </>
          )}

          {row.adminNotes && (
            <Grid size={{ xs: 12 }}>
              <Field label='Admin Notes' value={row.adminNotes} />
            </Grid>
          )}

          <Grid size={{ xs: 12 }}>
            <Divider><Typography variant='caption' color='text.secondary'>Activity</Typography></Divider>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Field label='Submitted' value={row.createdAt ? new Date(row.createdAt).toLocaleString() : null} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Reviewed At' value={row.reviewedAt ? new Date(row.reviewedAt).toLocaleString() : null} />
          </Grid>
        </Grid>
      </DialogContent>

      {isPending && (
        <DialogActions sx={{ px: 3, pb: 3, gap: 1, justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant='outlined' sx={{ borderRadius: 2, textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            variant='outlined'
            color='error'
            startIcon={<CancelOutlinedIcon />}
            disabled={isProcessing}
            onClick={() => { onClose(); onAction(row, 'reject'); }}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Reject
          </Button>
          <Button
            variant='contained'
            color='success'
            startIcon={<CheckCircleOutlineIcon />}
            disabled={isProcessing}
            onClick={() => { onClose(); onAction(row, 'approve'); }}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Approve
          </Button>
        </DialogActions>
      )}

      {!isPending && (
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} variant='outlined' sx={{ borderRadius: 2, textTransform: 'none' }}>
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default PersonDetailDialog;
