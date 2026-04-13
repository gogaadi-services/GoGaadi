import { Box, Loader, DataTable } from '@gogaadi/component';
import { Typography, Tabs, Divider, TextField, InputAdornment } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SearchIcon from '@mui/icons-material/Search';
import { AccessRequestRow } from './types/accessRequests.types';
import { useAdminKeyframes } from '@gogaadi/hooks';
import { useStyles } from './styles';
import { useAccessRequests } from './hooks/useAccessRequests';
import TabPanel from './components/TabPanel';
import DetailDialog from './dialogs/DetailDialog/DetailDialog';
import ActionDialog from './dialogs/ActionDialog/ActionDialog';

const AccessRequests = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();
  const {
    isLoading,
    allRows,
    tabValue,
    setTabValue,
    tableSearch,
    setTableSearch,
    tabLists,
    columns,
    tabs,
    detailUser,
    setDetailUser,
    actionTarget,
    actionNotes,
    actionInProgress,
    handleConfirmAction,
    handleOpenAction,
    handleCloseAction,
    setActionNotes,
    getFilteredData,
  } = useAccessRequests();

  if (isLoading) {
    return (
      <>
        {keyframes}
        <Box className={classes.container}>
          <Loader fullScreen />
        </Box>
      </>
    );
  }

  const adminCount = allRows.filter((r) => r.requestedRole === 'admin').length;
  const consultantCount = allRows.filter((r) => r.requestedRole === 'consultant').length;
  const pendingCount = allRows.filter((r) => r.status === 'pending_approval').length;

  const statCards = [
    {
      label: 'Total Requests',
      value: allRows.length,
      Icon: GroupIcon,
      cls: classes.statCard0,
      sub: 'All access requests',
      color: '#4f46e5',
      tabIndex: 0,
    },
    {
      label: 'Admin Requests',
      value: adminCount,
      Icon: AdminPanelSettingsIcon,
      cls: classes.statCard1,
      sub: 'Full platform access',
      color: '#f59e0b',
      tabIndex: 1,
    },
    {
      label: 'Consultant Requests',
      value: consultantCount,
      Icon: BusinessCenterIcon,
      cls: classes.statCard2,
      sub: 'Read-only access',
      color: '#10b981',
      tabIndex: 2,
    },
    {
      label: 'Pending',
      value: pendingCount,
      Icon: PendingActionsIcon,
      cls: classes.statCard3,
      sub: 'Awaiting admin approval',
      color: '#ef4444',
      tabIndex: 3,
    },
  ];

  return (
    <>
      {keyframes}
      <Box className={classes.container}>
        {/* Page header */}
        <Box className={classes.pageHeader}>
          <Box className={classes.headerOrb3} />
          <Box className={classes.pageHeaderRow}>
            <Typography variant='h5' className={classes.title}>
              People Requests
            </Typography>
          </Box>
          <Typography variant='body2' className={classes.description}>
            Manage all role access requests — approve or reject admin and consultant requests from a
            single view.
          </Typography>
        </Box>

        {/* Stat Cards */}
        <Box className={classes.statsGrid}>
          {statCards.map(({ label, value, Icon, cls, sub, color, tabIndex }) => {
            const isActive = tabValue === tabIndex;
            return (
              <Box
                key={label}
                className={`${classes.statCard} ${cls}`}
                onClick={() => {
                  setTabValue(tabIndex);
                  setTableSearch('');
                }}
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
                    <Typography className={classes.statLabel}>{label}</Typography>
                  </Box>
                  <Box
                    className={classes.statIconWrap}
                    sx={{ background: `${color}14`, border: `1.5px solid ${color}28` }}
                  >
                    <Icon className={classes.statIcon} sx={{ color }} />
                  </Box>
                </Box>
                <Divider className={classes.statDivider} />
                <Box className={classes.statSubRow}>
                  <Box
                    className={classes.statSubDot}
                    sx={{ background: color, boxShadow: `0 0 6px ${color}` }}
                  />
                  <Typography className={classes.statSub}>{sub}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Tabs + Search */}
        <Box className={classes.tabsBox}>
          <Tabs
            value={tabValue}
            onChange={(_, v) => {
              setTabValue(v);
              setTableSearch('');
            }}
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
                <GroupIcon className={classes.emptyIcon} />
                <Typography variant='h6' color='text.secondary'>
                  {tableSearch ? 'No matching requests' : 'No access requests found'}
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
                  onRowClick={(row) => setDetailUser(row as AccessRequestRow)}
                />
              </Box>
            )}
          </TabPanel>
        ))}

        <DetailDialog
          detailUser={detailUser}
          onClose={() => setDetailUser(null)}
          onOpenAction={(user, type) => handleOpenAction(user as AccessRequestRow, type)}
        />
        <ActionDialog
          actionTarget={actionTarget}
          actionNotes={actionNotes}
          actionInProgress={actionInProgress}
          onClose={handleCloseAction}
          onNotesChange={setActionNotes}
          onConfirm={handleConfirmAction}
        />
      </Box>
    </>
  );
};

export default AccessRequests;
