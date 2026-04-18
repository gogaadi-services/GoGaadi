import { Box, Loader, DataTable } from '@gogaadi/component';
import { Typography, Grid, Tabs, Tab, Divider, TextField, InputAdornment } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SearchIcon from '@mui/icons-material/Search';
import EditNoteIcon from '@mui/icons-material/EditNote';
import TabPanel from './components/TabPanel';
import { useStyles } from './styles';
import { useAdminKeyframes } from '@gogaadi/hooks';
import usePeopleManagement from './hooks/useAccessManagement';

const PeopleManagement = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();

  const {
    allUsers,
    admins,
    consultants,
    dbDraftUsers,
    isLoading,
    isMobile,
    tabValue,
    setTabValue,
    tableSearch,
    setTableSearch,
    selectedRow,
    handleRowSelect,
    columns,
    getTableData,
    draftRow,
  } = usePeopleManagement();

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

  const draftCount = dbDraftUsers.length + (draftRow ? 1 : 0);

  const statCards = [
    {
      label: 'Total Users',
      value: allUsers.length,
      Icon: GroupIcon,
      cls: classes.statCard0,
      sub: 'Platform Registrations',
      color: '#4f46e5',
      tabIndex: 0,
    },
    {
      label: 'Admins',
      value: admins.length,
      Icon: AdminPanelSettingsIcon,
      cls: classes.statCard1,
      sub: 'Platform Administrators',
      color: '#f59e0b',
      tabIndex: 1,
    },
    {
      label: 'Consultants',
      value: consultants.length,
      Icon: BusinessCenterIcon,
      cls: classes.statCard2,
      sub: 'Platform Consultants',
      color: '#10b981',
      tabIndex: 2,
    },
    {
      label: 'Drafts',
      value: draftCount,
      Icon: EditNoteIcon,
      cls: classes.statCard3,
      sub: 'Saved / In-Progress',
      color: '#64748b',
      tabIndex: 3,
    },
  ];

  return (
    <>
      {keyframes}
      <Grid className={classes.container}>
        {/* ── Page header ── */}
        <Box className={classes.pageHeader}>
          <Box className={classes.headerOrb3} />
          <Box className={classes.pageHeaderRow}>
            <Typography variant='h5' className={classes.title}>
              People Management
            </Typography>
          </Box>
          <Typography variant='body2' className={classes.description}>
            View and manage all users and their access across different roles in the system.
          </Typography>
        </Box>

        {/* ── Stat Cards ── */}
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

        {/* ── Tabs + Search ── */}
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
            <Tab
              icon={<GroupIcon />}
              iconPosition='start'
              label={isMobile ? undefined : 'All Users'}
            />
            <Tab
              icon={<AdminPanelSettingsIcon />}
              iconPosition='start'
              label={isMobile ? undefined : 'Admins'}
            />
            <Tab
              icon={<BusinessCenterIcon />}
              iconPosition='start'
              label={isMobile ? undefined : 'Consultants'}
            />
            <Tab
              icon={<EditNoteIcon />}
              iconPosition='start'
              label={isMobile ? undefined : `Drafts${draftCount > 0 ? ` (${draftCount})` : ''}`}
            />
          </Tabs>
          <TextField
            placeholder='Search...'
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            className={classes.tabsSearchField}
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

        {/* ── Tab panels with DataTable ── */}
        {[allUsers, admins, consultants, dbDraftUsers].map((list, idx) => {
          const showLocalDraft = (idx === 0 || idx === 3) && draftRow;
          const tableData = getTableData(list, showLocalDraft ? 2 : 1);
          const filteredData = tableSearch
            ? tableData.filter((row) =>
              Object.values(row).some(
                (val) =>
                  val !== null &&
                  val !== undefined &&
                  String(val).toLowerCase().includes(tableSearch.toLowerCase()),
              ),
            )
            : tableData;
          const pinnedData = showLocalDraft
            ? tableSearch
              ? Object.values(draftRow).some(
                (val) =>
                  val !== null &&
                  val !== undefined &&
                  String(val).toLowerCase().includes(tableSearch.toLowerCase()),
              )
                ? [{ ...draftRow, sno: 1 }]
                : []
              : [{ ...draftRow, sno: 1 }]
            : [];
          return (
            <TabPanel key={idx} value={tabValue} index={idx}>
              <Box className={classes.tableContainer}>
                <DataTable
                  columns={columns}
                  data={filteredData}
                  rowKey='id'
                  searchable={false}
                  initialRowsPerPage={10}
                  onRowClick={handleRowSelect}
                  activeRowKey={selectedRow?.id as number}
                  pinnedRows={pinnedData}
                />
              </Box>
            </TabPanel>
          );
        })}
      </Grid>
    </>
  );
};

export default PeopleManagement;
