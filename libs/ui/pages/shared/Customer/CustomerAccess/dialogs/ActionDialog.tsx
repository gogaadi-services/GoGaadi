import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { CustomerApprovalRow } from '../../types';
import React from 'react';

interface ActionDialogProps {
  actionTarget: { row: CustomerApprovalRow; type: 'approve' | 'reject' | 'review' | 'under_review' } | null;
  actionNotes: string;
  actionInProgress: string | number | null;
  onClose: () => void;
  onNotesChange: (v: string) => void;
  onConfirm: () => void;
}

const ActionDialog = ({
  actionTarget,
  actionNotes,
  actionInProgress,
  onClose,
  onNotesChange,
  onConfirm,
}: ActionDialogProps) => {
  if (!actionTarget) return null;

  const isApprove = actionTarget.type === 'approve';
  const isReject = actionTarget.type === 'reject';
  const label = isApprove ? 'Approve' : isReject ? 'Reject' : 'Mark Under Review';
  const headerBg = isApprove
    ? 'linear-gradient(135deg, #15803d, #16a34a)'
    : isReject
      ? 'linear-gradient(135deg, #b91c1c, #dc2626)'
      : 'linear-gradient(135deg, #1e40af, #2563eb)';

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth='xs'
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 3, overflow: 'hidden' } } }}
    >
      <Box sx={{ background: headerBg, px: 3, py: 2.5 }}>
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
            {label}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant='subtitle1' fontWeight={700} sx={{ color: '#fff', lineHeight: 1.25 }}>
              {`${actionTarget.row.firstName} ${actionTarget.row.lastName}`.trim()}
            </Typography>
            <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {actionTarget.row.email || actionTarget.row.phone || '—'}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
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
            ? `You are about to approve the request for ${actionTarget.row.firstName}.`
            : isReject
              ? `You are about to reject the request from ${actionTarget.row.firstName}.`
              : `You are about to mark ${actionTarget.row.firstName}'s request as under review.`}
        </Typography>
        <TextField
          label='Notes (optional)'
          multiline
          rows={3}
          fullWidth
          placeholder={
            isApprove ? 'Add any approval notes...' : isReject ? 'Provide a reason for rejection...' : 'Add review notes...'
          }
          value={actionNotes}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onNotesChange(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '0.88rem' } }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} variant='outlined' sx={{ borderRadius: 2, textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant='contained'
          color={isApprove ? 'success' : isReject ? 'error' : 'primary'}
          startIcon={isApprove ? <CheckCircleOutlineIcon /> : isReject ? <CancelOutlinedIcon /> : <RateReviewOutlinedIcon />}
          disabled={!!actionInProgress}
          onClick={onConfirm}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          {actionInProgress
            ? isApprove ? 'Approving...' : isReject ? 'Rejecting...' : 'Saving...'
            : isApprove ? 'Confirm Approve' : isReject ? 'Confirm Reject' : 'Mark Under Review'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog;
