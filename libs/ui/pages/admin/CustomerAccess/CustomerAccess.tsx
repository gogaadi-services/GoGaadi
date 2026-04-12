import { Box, Loader, DataTable } from '@gogaadi/component';
import {
  Typography,
  Tabs,
  Divider,
  TextField,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';
import { useAdminKeyframes } from '@gogaadi/hooks';
import { useStyles } from './styles';
import { useCustomerAccess, getCategoryFromPath } from './hooks/useCustomerAccess';
import TabPanel from './components/TabPanel';
import DetailDialog from '../CustomerApprovals/dialogs/DetailDialog/DetailDialog';
import React from 'react';

const CustomerAccess = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();
  const { pathname } = useLocation();

  const category = getCategoryFromPath(pathname);

  const {
    cfg,
    isLoading,
    categoryRows,
    pendingRows,
    reviewRows,
    tabLists,
    tabValue,
    setTabValue,
    tableSearch,
    setTableSearch,
    tabs,
    columns,
    detailRow,
    setDetailRow,
    actionTarget,
    actionNotes,
    setActionNotes,
    actionInProgress,
    handleOpenAction,
    handleCloseAction,
    handleConfirmAction,
    getFilteredData,
    isMultiType,
    vehicleSubTypes,
  } = useCustomerAccess(category);

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

  // Multi-type (mobility / logistics): one card per vehicle sub-type + All + Pending
  const multiTypeStatCards = isMultiType && vehicleSubTypes
    ? [
        {
          label: 'All',
          value: categoryRows.length,
          Icon: cfg.Icon,
          color: cfg.color,
          tabIndex: 0,
          sub1: pendingRows.length,
          sub1Label: 'pending',
          sub1Color: '#d97706',
          sub2: reviewRows.length,
          sub2Label: 'in review',
          sub2Color: '#2563eb',
        },
        ...vehicleSubTypes.map((st, idx) => {
          const rows = tabLists[idx + 1];
          const p = rows.filter((r) => r.status === 'pending').length;
          const rv = rows.filter((r) => r.status === 'under_review').length;
          return {
            label: st.label,
            value: rows.length,
            Icon: st.Icon,
            color: st.color,
            tabIndex: idx + 1,
            sub1: p,
            sub1Label: 'pending',
            sub1Color: '#d97706',
            sub2: rv,
            sub2Label: 'in review',
            sub2Color: '#2563eb',
          };
        }),
        {
          label: 'Pending',
          value: pendingRows.length,
          Icon: PendingActionsIcon,
          color: '#dc2626',
          tabIndex: vehicleSubTypes.length + 1,
          sub1: pendingRows.length,
          sub1Label: 'pending',
          sub1Color: '#dc2626',
          sub2: 0,
          sub2Label: 'processed',
          sub2Color: '#10b981',
        },
      ]
    : null;

  // Single-category status cards
  const statCards = [
    {
      label: 'All',
      value: categoryRows.length,
      Icon: cfg.Icon,
      cls: classes.statCard0,
      color: cfg.color,
      tabIndex: 0,
      sub1: pendingRows.length,
      sub1Label: 'pending',
      sub1Color: '#d97706',
      sub2: reviewRows.length,
      sub2Label: 'in review',
      sub2Color: '#2563eb',
    },
    {
      label: 'Pending',
      value: pendingRows.length,
      Icon: PendingActionsIcon,
      cls: classes.statCard1,
      color: '#d97706',
      tabIndex: 1,
      sub1: pendingRows.length,
      sub1Label: 'awaiting',
      sub1Color: '#d97706',
      sub2: 0,
      sub2Label: 'processed',
      sub2Color: '#10b981',
    },
    {
      label: 'Under Review',
      value: reviewRows.length,
      Icon: RateReviewOutlinedIcon,
      cls: classes.statCard2,
      color: '#2563eb',
      tabIndex: 2,
      sub1: reviewRows.length,
      sub1Label: 'in review',
      sub1Color: '#2563eb',
      sub2: 0,
      sub2Label: 'resolved',
      sub2Color: '#10b981',
    },
  ];

  const isApprove = actionTarget?.type === 'approve';
  const isReject = actionTarget?.type === 'reject';

  return (
    <>
      {keyframes}
      <Box className={classes.container}>
        {/* Page header */}
        <Box className={classes.pageHeader}>
          <Box className={classes.headerOrb3} />
          <Box className={classes.pageHeaderRow}>
            <Typography variant='h5' className={classes.title}>
              {cfg.title}
            </Typography>
          </Box>
          <Typography variant='body2' className={classes.description}>
            {cfg.description}
          </Typography>
        </Box>

        {/* Stat Cards — multi-type (mobility/logistics) or single-category */}
        {multiTypeStatCards ? (
          <Box
            className={classes.statsGrid}
            sx={{ gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: `repeat(${multiTypeStatCards.length}, 1fr)` } }}
          >
            {multiTypeStatCards.map(({ label, value, Icon, color, tabIndex, sub1, sub1Label, sub1Color, sub2, sub2Label, sub2Color }) => {
              const isActive = tabValue === tabIndex;
              return (
                <Box
                  key={label}
                  className={classes.statCard}
                  onClick={() => { setTabValue(tabIndex); setTableSearch(''); }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    outline: isActive ? `2px solid ${color}` : 'none',
                    outlineOffset: 2,
                    transform: isActive ? 'translateY(-6px)' : undefined,
                    boxShadow: isActive ? `0 16px 40px ${color}30, 0 4px 16px ${color}18` : undefined,
                    '&::before': { background: `linear-gradient(90deg, ${color}cc, ${color})` },
                  }}
                >
                  <Box className={classes.statCardTop} sx={{ flex: 1, alignItems: 'flex-start' }}>
                    <Box>
                      <Typography className={classes.statValue} sx={{ color }}>
                        {value}
                      </Typography>
                      <Typography className={classes.statLabel} sx={{ minHeight: '2.2em', display: 'block' }}>
                        {label}
                      </Typography>
                    </Box>
                    <Box className={classes.statIconWrap} sx={{ background: `${color}14`, border: `1.5px solid ${color}28` }}>
                      <Icon className={classes.statIcon} sx={{ color }} />
                    </Box>
                  </Box>
                  <Divider className={classes.statDivider} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', flex: '1 1 0', minWidth: 0 }}>
                      <Box className={classes.statSubDot} sx={{ background: sub1Color, boxShadow: `0 0 6px ${sub1Color}`, flexShrink: 0 }} />
                      <Typography className={classes.statSub} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span style={{ color: sub1Color, fontWeight: 700 }}>{sub1}</span>
                        {` ${sub1Label}`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', flex: '1 1 0', minWidth: 0, justifyContent: 'flex-end' }}>
                      <Box className={classes.statSubDot} sx={{ background: sub2Color, boxShadow: `0 0 6px ${sub2Color}`, flexShrink: 0 }} />
                      <Typography className={classes.statSub} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span style={{ color: sub2Color, fontWeight: 700 }}>{sub2}</span>
                        {` ${sub2Label}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box
            className={classes.statsGrid}
            sx={{ gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' } }}
          >
            {statCards.map(
              ({ label, value, Icon, cls, color, tabIndex, sub1, sub1Label, sub1Color, sub2, sub2Label, sub2Color }) => {
                const isActive = tabValue === tabIndex;
                return (
                  <Box
                    key={label}
                    className={`${classes.statCard} ${cls}`}
                    onClick={() => { setTabValue(tabIndex); setTableSearch(''); }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      outline: isActive ? `2px solid ${color}` : 'none',
                      outlineOffset: 2,
                      transform: isActive ? 'translateY(-6px)' : undefined,
                      boxShadow: isActive ? `0 16px 40px ${color}30, 0 4px 16px ${color}18` : undefined,
                    }}
                  >
                    <Box className={classes.statCardTop} sx={{ flex: 1, alignItems: 'flex-start' }}>
                      <Box>
                        <Typography className={classes.statValue} sx={{ color }}>
                          {value}
                        </Typography>
                        <Typography className={classes.statLabel} sx={{ minHeight: '2.2em', display: 'block' }}>
                          {label}
                        </Typography>
                      </Box>
                      <Box className={classes.statIconWrap} sx={{ background: `${color}14`, border: `1.5px solid ${color}28` }}>
                        <Icon className={classes.statIcon} sx={{ color }} />
                      </Box>
                    </Box>
                    <Divider className={classes.statDivider} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', flex: '1 1 0', minWidth: 0 }}>
                        <Box className={classes.statSubDot} sx={{ background: sub1Color, boxShadow: `0 0 6px ${sub1Color}`, flexShrink: 0 }} />
                        <Typography className={classes.statSub} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <span style={{ color: sub1Color, fontWeight: 700 }}>{sub1}</span>
                          {` ${sub1Label}`}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', flex: '1 1 0', minWidth: 0, justifyContent: 'flex-end' }}>
                        <Box className={classes.statSubDot} sx={{ background: sub2Color, boxShadow: `0 0 6px ${sub2Color}`, flexShrink: 0 }} />
                        <Typography className={classes.statSub} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <span style={{ color: sub2Color, fontWeight: 700 }}>{sub2}</span>
                          {` ${sub2Label}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              },
            )}
          </Box>
        )}

        {/* Tabs + Search */}
        <Box className={classes.tabsBox}>
          <Tabs
            value={tabValue}
            onChange={(_, v) => { setTabValue(v); setTableSearch(''); }}
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            sx={{ flex: 1 }}
          >
            {tabs}
          </Tabs>
          <TextField
            placeholder='Search...'
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            className={classes.searchField}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Tab panels */}
        {tabLists.map((list, idx) => (
          <TabPanel key={idx} value={tabValue} index={idx}>
            {getFilteredData(list).length === 0 ? (
              <Box className={classes.emptyState}>
                <PendingActionsIcon className={classes.emptyIcon} />
                <Typography variant='h6' color='text.secondary'>
                  {tableSearch ? 'No matching records' : `No ${cfg.title.toLowerCase()} requests found`}
                </Typography>
              </Box>
            ) : (
              <Box className={classes.tableContainer}>
                <DataTable
                  columns={columns}
                  data={getFilteredData(list)}
                  rowKey='id'
                  searchable={false}
                  initialRowsPerPage={10}
                  onRowClick={(row) => setDetailRow(row)}
                />
              </Box>
            )}
          </TabPanel>
        ))}
      </Box>

      {/* Detail Dialog */}
      <DetailDialog
        row={detailRow}
        onClose={() => setDetailRow(null)}
        onOpenAction={handleOpenAction}
      />

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
                  {isApprove ? `Approve — ${cfg.title}` : isReject ? `Reject — ${cfg.title}` : 'Mark Under Review'}
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
                  ? `You are about to approve the ${cfg.title.toLowerCase()} request for ${actionTarget.row.firstName}.`
                  : isReject
                    ? `You are about to reject the ${cfg.title.toLowerCase()} request from ${actionTarget.row.firstName}.`
                    : `You are about to mark ${actionTarget.row.firstName}'s request as under review.`}
              </Typography>
              <TextField
                label='Notes (optional)'
                multiline
                rows={3}
                fullWidth
                placeholder={
                  isApprove
                    ? 'Add any approval notes...'
                    : isReject
                      ? 'Provide a reason for rejection...'
                      : 'Add review notes or next steps...'
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
                disabled={!!actionInProgress}
                onClick={handleConfirmAction}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                {actionInProgress
                  ? isApprove ? 'Approving...' : isReject ? 'Rejecting...' : 'Saving...'
                  : isApprove ? 'Confirm Approve' : isReject ? 'Confirm Reject' : 'Mark Under Review'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default CustomerAccess;
