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
import { CustomerApprovalRow, ApprovalAction, ApprovalStatus } from '../../types';

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
  pending: { color: '#d97706', bg: '#fef3c7' },
  under_review: { color: '#2563eb', bg: '#dbeafe' },
  approved: { color: '#16a34a', bg: '#dcfce7' },
  rejected: { color: '#dc2626', bg: '#fee2e2' },
};

interface CustomerPersonDetailDialogProps {
  open: boolean;
  row: CustomerApprovalRow | null;
  actionInProgress: number | string | null;
  onClose: () => void;
  onAction: (row: CustomerApprovalRow, type: ApprovalAction) => void;
}

const CustomerPersonDetailDialog = ({
  open,
  row,
  actionInProgress,
  onClose,
  onAction,
}: CustomerPersonDetailDialogProps) => {
  if (!row) return null;

  const statusMeta = STATUS_COLORS[row.status ?? ''] ?? { color: '#6b7280', bg: '#f3f4f6' };
  const isActionable = row.status === 'pending' || row.status === 'under_review';
  const isProcessing = actionInProgress === row.id;
  const fullName = `${row.firstName} ${row.lastName}`.trim();

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
          <Avatar sx={{ width: 52, height: 52, bgcolor: '#10b98133', border: '2px solid #10b98166' }}>
            <PersonIcon sx={{ color: '#10b981' }} />
          </Avatar>
          <Box>
            <Typography variant='h6' fontWeight={700} sx={{ color: '#fff', lineHeight: 1.2 }}>
              {fullName || '—'}
            </Typography>
            <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.65)' }}>
              {row.email}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 0.75, flexWrap: 'wrap' }}>
              {row.serviceCategory && (
                <Chip
                  label={row.serviceCategory}
                  size='small'
                  sx={{
                    bgcolor: '#10b98122',
                    color: '#10b981',
                    border: '1px solid #10b98144',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    textTransform: 'capitalize',
                  }}
                />
              )}
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
            <Field label='Area' value={row.area} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Pincode' value={row.pincode} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Emergency Contact' value={row.emergencyContact} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider><Typography variant='caption' color='text.secondary'>Service Details</Typography></Divider>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Field label='Service Category' value={row.serviceCategory} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Vehicle Type' value={row.vehicleType} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Vehicle Number' value={row.vehicleNumber} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Fuel Type' value={row.fuelType} />
          </Grid>

          {(row.dlNumber || row.idProofType) && (
            <>
              <Grid size={{ xs: 12 }}>
                <Divider><Typography variant='caption' color='text.secondary'>Documents</Typography></Divider>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Field label='DL Number' value={row.dlNumber} />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Field label='DL Expiry' value={row.dlExpiry} />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Field label='ID Proof Type' value={row.idProofType} />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Field label='ID Proof Number' value={row.idProofNumber} />
              </Grid>
            </>
          )}

          {row.adminNotes && (
            <>
              <Grid size={{ xs: 12 }}>
                <Divider />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field label='Admin Notes' value={row.adminNotes} />
              </Grid>
            </>
          )}

          <Grid size={{ xs: 12 }}>
            <Divider><Typography variant='caption' color='text.secondary'>Activity</Typography></Divider>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Field
              label='Submitted'
              value={
                row.submittedAt || row.createdAt
                  ? new Date(String(row.submittedAt || row.createdAt)).toLocaleString()
                  : null
              }
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field
              label='Submitted By'
              value={row.isSelfRegistered ? 'Self-registered' : row.createdByName}
            />
          </Grid>
        </Grid>
      </DialogContent>

      {isActionable && (
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

      {!isActionable && (
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} variant='outlined' sx={{ borderRadius: 2, textTransform: 'none' }}>
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomerPersonDetailDialog;
