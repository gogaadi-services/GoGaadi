import React from 'react';
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
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Field = ({ label, value }: { label: string; value?: string | null }) => (
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
      {value && value.trim() !== '' ? value : '—'}
    </Typography>
  </Box>
);

interface ManagementReviewDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  managementType: 'admin' | 'consultant';
  form: Record<string, string>;
  userId: string;
  referredBy: { name: string; email: string } | null;
  reportingManager: { name: string; email: string } | null;
  attachmentCount: number;
}

const ManagementReviewDialog: React.FC<ManagementReviewDialogProps> = ({
  open,
  onClose,
  onConfirm,
  isSubmitting,
  managementType,
  form,
  userId,
  referredBy,
  reportingManager,
  attachmentCount,
}) => {
  const isAdmin = managementType === 'admin';
  const RoleIcon = isAdmin ? ManageAccountsIcon : BusinessCenterIcon;
  const roleColor = isAdmin ? '#6366f1' : '#0ea5e9';
  const roleLabel = isAdmin ? 'Admin' : 'Consultant';
  const fullName = `${form.firstName ?? ''} ${form.lastName ?? ''}`.trim();

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
          disabled={isSubmitting}
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
          <Avatar sx={{ width: 52, height: 52, bgcolor: `${roleColor}33`, border: `2px solid ${roleColor}66` }}>
            <PersonIcon sx={{ color: roleColor }} />
          </Avatar>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <AutoAwesomeIcon sx={{ fontSize: 14, color: '#fbbf24' }} />
              <Typography variant='caption' sx={{ color: '#fbbf24', fontWeight: 700, letterSpacing: '0.05em', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                Review Before Submitting
              </Typography>
            </Box>
            <Typography variant='h6' fontWeight={700} sx={{ color: '#fff', lineHeight: 1.2 }}>
              {fullName || 'New User'}
            </Typography>
            <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.65)' }}>
              {form.email || '—'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 0.75 }}>
              <Chip
                icon={<RoleIcon sx={{ fontSize: '13px !important', color: `${roleColor} !important` }} />}
                label={roleLabel}
                size='small'
                sx={{
                  bgcolor: `${roleColor}22`,
                  color: roleColor,
                  border: `1px solid ${roleColor}44`,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                }}
              />
              <Chip
                label={userId}
                size='small'
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  fontFamily: 'monospace',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {/* Personal Info */}
          <Grid size={{ xs: 6 }}>
            <Field label='First Name' value={form.firstName} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Last Name' value={form.lastName} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Phone' value={form.phone} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Gender' value={form.gender} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Date of Birth' value={form.dateOfBirth} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='City' value={form.city} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider>
              <Typography variant='caption' color='text.secondary'>Role & Access</Typography>
            </Divider>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Field label='Role' value={roleLabel} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Department' value={form.department} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field label='Employee ID' value={form.employeeId} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Field
              label='Attachments'
              value={attachmentCount > 0 ? `${attachmentCount} file(s)` : null}
            />
          </Grid>
          {form.accessFromDate && (
            <Grid size={{ xs: 6 }}>
              <Field label='Access From' value={form.accessFromDate} />
            </Grid>
          )}
          {form.accessToDate && (
            <Grid size={{ xs: 6 }}>
              <Field label='Access To' value={form.accessToDate} />
            </Grid>
          )}

          {(referredBy || reportingManager) && (
            <>
              <Grid size={{ xs: 12 }}>
                <Divider>
                  <Typography variant='caption' color='text.secondary'>References</Typography>
                </Divider>
              </Grid>
              {referredBy && (
                <Grid size={{ xs: 6 }}>
                  <Field label='Referred By' value={`${referredBy.name} (${referredBy.email})`} />
                </Grid>
              )}
              {reportingManager && (
                <Grid size={{ xs: 6 }}>
                  <Field label='Reporting Manager' value={`${reportingManager.name} (${reportingManager.email})`} />
                </Grid>
              )}
            </>
          )}

          {form.reasonForAccess && (
            <>
              <Grid size={{ xs: 12 }}>
                <Divider />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field label='Reason for Access' value={form.reasonForAccess} />
              </Grid>
            </>
          )}

          {form.adminNotes && (
            <Grid size={{ xs: 12 }}>
              <Field label='Admin Notes' value={form.adminNotes} />
            </Grid>
          )}
        </Grid>

        {/* Password note */}
        <Box
          sx={{
            mt: 2.5,
            p: 1.5,
            bgcolor: 'success.50',
            border: '1px solid',
            borderColor: 'success.200',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 16, color: 'success.main', flexShrink: 0 }} />
          <Typography variant='caption' sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
            A temporary password has been set. The user will be prompted to reset it on first login.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1, justifyContent: 'flex-end' }}>
        <Button
          onClick={onClose}
          variant='outlined'
          disabled={isSubmitting}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Go Back & Edit
        </Button>
        <Button
          variant='contained'
          disabled={isSubmitting}
          onClick={onConfirm}
          startIcon={isSubmitting ? <CircularProgress size={14} color='inherit' /> : <CheckCircleOutlineIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${roleColor} 0%, ${roleColor}cc 100%)`,
            boxShadow: `0 4px 14px ${roleColor}44`,
            '&:hover': { filter: 'brightness(1.08)', background: `linear-gradient(135deg, ${roleColor} 0%, ${roleColor}cc 100%)` },
          }}
        >
          {isSubmitting ? 'Submitting…' : `Confirm & Create ${roleLabel}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManagementReviewDialog;
