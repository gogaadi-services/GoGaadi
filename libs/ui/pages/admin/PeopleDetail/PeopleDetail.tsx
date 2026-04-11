import { Box, Loader } from '@gogaadi/component';
import {
  Typography,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminKeyframes } from '@gogaadi/hooks';
import { useStyles } from './styles';
import { usePeopleDetail } from './hooks/usePeopleDetail';

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: '#d97706', bg: '#fef3c7' },
  under_review: { label: 'Under Review', color: '#2563eb', bg: '#dbeafe' },
  approved: { label: 'Approved', color: '#16a34a', bg: '#dcfce7' },
  rejected: { label: 'Rejected', color: '#dc2626', bg: '#fee2e2' },
};

const fmtDate = (v: unknown) => {
  if (!v) return '—';
  try {
    return new Date(String(v)).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch {
    return String(v);
  }
};

const FieldBox = ({ label, value, classes }: { label: string; value?: string | null; classes: Record<string, string> }) => (
  <Box className={classes.fieldBox}>
    <Typography className={classes.fieldLabel}>{label}</Typography>
    <Typography className={classes.fieldValue}>{value || '—'}</Typography>
  </Box>
);

const PeopleDetail = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();
  const navigate = useNavigate();

  const {
    record,
    isLoading,
    actionTarget,
    actionNotes,
    setActionNotes,
    actionInProgress,
    handleOpenAction,
    handleCloseAction,
    handleConfirmAction,
  } = usePeopleDetail();

  if (isLoading) {
    return (
      <>
        {keyframes}
        <Box className={classes.container}>
          <Loader />
        </Box>
      </>
    );
  }

  if (!record) {
    return (
      <>
        {keyframes}
        <Box className={classes.container}>
          <Button
            startIcon={<ChevronLeftIcon />}
            onClick={() => navigate(-1)}
            className={classes.backBtn}
          >
            Back
          </Button>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <PersonIcon sx={{ fontSize: 56, color: 'rgba(0,0,0,0.18)', mb: 2 }} />
            <Typography variant='h6' color='text.secondary'>
              Record not found
            </Typography>
          </Box>
        </Box>
      </>
    );
  }

  const statusMeta = STATUS_META[record.status ?? 'pending'] ?? STATUS_META['pending'];
  const fullName = `${record.firstName} ${record.lastName}`.trim();
  const isApprove = actionTarget?.type === 'approve';
  const isReject = actionTarget?.type === 'reject';

  const canTakeAction = record.status === 'pending' || record.status === 'under_review';

  return (
    <>
      {keyframes}
      <Box className={classes.container}>
        <Button
          startIcon={<ChevronLeftIcon />}
          onClick={() => navigate(-1)}
          className={classes.backBtn}
        >
          Back
        </Button>

        <Box className={classes.card}>
          {/* Header */}
          <Box className={classes.cardHeader}>
            <Box className={classes.avatarWrap}>
              <Box className={classes.avatar}>
                <PersonIcon sx={{ fontSize: 32, color: 'rgba(255,255,255,0.85)' }} />
              </Box>
              <Box>
                <Typography className={classes.personName}>{fullName || '—'}</Typography>
                <Typography className={classes.personMeta}>
                  {record.email || record.phone || '—'}
                </Typography>
              </Box>
            </Box>
            <Box className={classes.statusChipWrap}>
              <Chip
                label={statusMeta.label}
                size='small'
                sx={{
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  bgcolor: 'rgba(255,255,255,0.18)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              />
              {record.serviceCategory && (
                <Chip
                  label={record.serviceCategory}
                  size='small'
                  sx={{
                    ml: 1,
                    fontWeight: 600,
                    fontSize: '0.74rem',
                    bgcolor: 'rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    textTransform: 'capitalize',
                  }}
                />
              )}
            </Box>
          </Box>

          {/* Body */}
          <Box className={classes.cardBody}>
            {/* Personal Info */}
            <Typography className={classes.sectionTitle}>Personal Information</Typography>
            <Box className={classes.fieldGrid}>
              <FieldBox label='First Name' value={record.firstName} classes={classes} />
              <FieldBox label='Last Name' value={record.lastName} classes={classes} />
              <FieldBox label='Email' value={record.email} classes={classes} />
              <FieldBox label='Phone' value={record.phone} classes={classes} />
              {record.gender && <FieldBox label='Gender' value={record.gender} classes={classes} />}
              {record.idProofType && (
                <FieldBox label='ID Proof' value={`${record.idProofType}: ${record.idProofNumber || '—'}`} classes={classes} />
              )}
            </Box>

            <Divider className={classes.divider} />

            {/* Location */}
            <Typography className={classes.sectionTitle}>Location</Typography>
            <Box className={classes.fieldGrid}>
              <FieldBox label='City' value={record.city} classes={classes} />
              {record.area && <FieldBox label='Area' value={record.area} classes={classes} />}
              {record.pincode && <FieldBox label='Pincode' value={record.pincode} classes={classes} />}
            </Box>

            {/* Vehicle Info (if applicable) */}
            {(record.vehicleType || record.vehicleNumber) && (
              <>
                <Divider className={classes.divider} />
                <Typography className={classes.sectionTitle}>Vehicle Information</Typography>
                <Box className={classes.fieldGrid}>
                  {record.vehicleType && <FieldBox label='Vehicle Type' value={record.vehicleType} classes={classes} />}
                  {record.vehicleNumber && <FieldBox label='Vehicle Number' value={record.vehicleNumber} classes={classes} />}
                  {record.fuelType && <FieldBox label='Fuel Type' value={record.fuelType} classes={classes} />}
                  {record.rcNumber && <FieldBox label='RC Number' value={record.rcNumber} classes={classes} />}
                  {record.rcExpiry && <FieldBox label='RC Expiry' value={fmtDate(record.rcExpiry)} classes={classes} />}
                  {record.dlNumber && <FieldBox label='DL Number' value={record.dlNumber} classes={classes} />}
                  {record.dlExpiry && <FieldBox label='DL Expiry' value={fmtDate(record.dlExpiry)} classes={classes} />}
                  {record.insuranceNumber && <FieldBox label='Insurance Number' value={record.insuranceNumber} classes={classes} />}
                  {record.insuranceExpiry && <FieldBox label='Insurance Expiry' value={fmtDate(record.insuranceExpiry)} classes={classes} />}
                </Box>
              </>
            )}

            <Divider className={classes.divider} />

            {/* Timeline */}
            <Typography className={classes.sectionTitle}>Timeline</Typography>
            <Box className={classes.fieldGrid}>
              <Box className={classes.fieldBox} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon sx={{ fontSize: '0.9rem', color: '#94a3b8' }} />
                <Box>
                  <Typography className={classes.fieldLabel}>Submitted</Typography>
                  <Typography className={classes.fieldValue}>
                    {fmtDate(record.submittedAt || record.createdAt)}
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.fieldBox} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon sx={{ fontSize: '0.9rem', color: '#94a3b8' }} />
                <Box>
                  <Typography className={classes.fieldLabel}>Last Updated</Typography>
                  <Typography className={classes.fieldValue}>{fmtDate(record.updatedAt)}</Typography>
                </Box>
              </Box>
              {record.createdByName && (
                <FieldBox
                  label='Created By'
                  value={record.isSelfRegistered ? 'Self-registered' : record.createdByName}
                  classes={classes}
                />
              )}
            </Box>

            {/* Admin Notes */}
            {record.adminNotes && (
              <>
                <Divider className={classes.divider} />
                <Typography className={classes.sectionTitle}>Admin Notes</Typography>
                <Box className={classes.notesBox}>
                  <Typography sx={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                    {record.adminNotes}
                  </Typography>
                </Box>
              </>
            )}
          </Box>

          {/* Action Bar */}
          {canTakeAction && (
            <Box className={classes.actionBar}>
              <Button
                variant='contained'
                color='success'
                startIcon={<CheckCircleOutlineIcon />}
                onClick={() => handleOpenAction('approve')}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
              >
                Approve
              </Button>
              <Button
                variant='outlined'
                color='error'
                startIcon={<CancelOutlinedIcon />}
                onClick={() => handleOpenAction('reject')}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
              >
                Reject
              </Button>
              <Button
                variant='outlined'
                color='primary'
                startIcon={<RateReviewOutlinedIcon />}
                onClick={() => handleOpenAction('review')}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
              >
                Mark Under Review
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Action Dialog */}
      <Dialog
        open={!!actionTarget}
        onClose={handleCloseAction}
        maxWidth='xs'
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3, overflow: 'hidden' } } }}
      >
        {actionTarget && (
          <>
            <Box
              sx={{
                background: isApprove
                  ? 'linear-gradient(135deg, #15803d, #16a34a)'
                  : isReject
                    ? 'linear-gradient(135deg, #b91c1c, #dc2626)'
                    : 'linear-gradient(135deg, #1e40af, #2563eb)',
                px: 3,
                py: 2.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                {isApprove ? (
                  <CheckCircleOutlineIcon sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }} />
                ) : isReject ? (
                  <CancelOutlinedIcon sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }} />
                ) : (
                  <RateReviewOutlinedIcon sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }} />
                )}
                <Typography
                  variant='caption'
                  fontWeight={700}
                  sx={{ color: 'rgba(255,255,255,0.9)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' }}
                >
                  {isApprove ? 'Approve Request' : isReject ? 'Reject Request' : 'Mark Under Review'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant='subtitle1' fontWeight={700} sx={{ color: '#fff', lineHeight: 1.25 }}>
                    {fullName}
                  </Typography>
                  <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {record.email || record.phone || '—'}
                  </Typography>
                </Box>
                <IconButton
                  onClick={handleCloseAction}
                  size='small'
                  sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.12)' } }}
                >
                  <CloseIcon fontSize='small' />
                </IconButton>
              </Box>
            </Box>
            <DialogContent sx={{ p: 3 }}>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                {isApprove
                  ? `Approve the request for ${record.firstName}?`
                  : isReject
                    ? `Reject the request from ${record.firstName}?`
                    : `Mark ${record.firstName}'s request as under review?`}
              </Typography>
              <TextField
                label='Notes (optional)'
                multiline
                rows={3}
                fullWidth
                placeholder={
                  isApprove ? 'Add approval notes...' : isReject ? 'Reason for rejection...' : 'Add review notes...'
                }
                value={actionNotes}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActionNotes(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '0.88rem' } }}
              />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
              <Button
                onClick={handleCloseAction}
                variant='outlined'
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                color={isApprove ? 'success' : isReject ? 'error' : 'primary'}
                startIcon={
                  isApprove ? <CheckCircleOutlineIcon /> : isReject ? <CancelOutlinedIcon /> : <RateReviewOutlinedIcon />
                }
                disabled={actionInProgress}
                onClick={handleConfirmAction}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                {actionInProgress ? 'Saving...' : isApprove ? 'Confirm Approve' : isReject ? 'Confirm Reject' : 'Mark Under Review'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default PeopleDetail;
