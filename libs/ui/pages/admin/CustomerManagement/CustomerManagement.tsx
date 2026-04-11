import { Box, Loader, DataTable } from '@gogaadi/component';
import {
  Typography,
  Tabs,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import { useAdminKeyframes } from '@gogaadi/hooks';
import { useStyles } from './styles';
import { useCustomerManagement, getManagementCategoryFromPath } from './hooks/useCustomerManagement';
import TabPanel from './components/TabPanel';

const CustomerManagement = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();
  const { pathname } = useLocation();

  const category = getManagementCategoryFromPath(pathname);

  const {
    cfg,
    isLoading,
    categoryRows,
    approvedRows,
    pendingRows,
    rejectedRows,
    tabLists,
    tabValue,
    setTabValue,
    tableSearch,
    setTableSearch,
    tabs,
    columns,
    getFilteredData,
  } = useCustomerManagement(category);

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

  const statCards = [
    {
      label: 'All',
      value: categoryRows.length,
      Icon: cfg.Icon,
      cls: classes.statCard0,
      color: cfg.color,
      tabIndex: 0,
      sub1: approvedRows.length,
      sub1Label: 'approved',
      sub1Color: '#10b981',
      sub2: pendingRows.length,
      sub2Label: 'pending',
      sub2Color: '#d97706',
    },
    {
      label: 'Approved',
      value: approvedRows.length,
      Icon: GroupIcon,
      cls: classes.statCard1,
      color: '#10b981',
      tabIndex: 1,
      sub1: approvedRows.length,
      sub1Label: 'active',
      sub1Color: '#10b981',
      sub2: 0,
      sub2Label: 'inactive',
      sub2Color: '#94a3b8',
    },
    {
      label: 'Pending',
      value: pendingRows.length,
      Icon: cfg.Icon,
      cls: classes.statCard3,
      color: '#d97706',
      tabIndex: 2,
      sub1: pendingRows.length,
      sub1Label: 'awaiting',
      sub1Color: '#d97706',
      sub2: 0,
      sub2Label: 'escalated',
      sub2Color: '#ef4444',
    },
    {
      label: 'Rejected',
      value: rejectedRows.length,
      Icon: GroupIcon,
      cls: classes.statCard2,
      color: '#dc2626',
      tabIndex: 3,
      sub1: rejectedRows.length,
      sub1Label: 'rejected',
      sub1Color: '#dc2626',
      sub2: 0,
      sub2Label: 'appealed',
      sub2Color: '#f97316',
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
              {cfg.title}
            </Typography>
          </Box>
          <Typography variant='body2' className={classes.description}>
            {cfg.description}
          </Typography>
        </Box>

        {/* Stat Cards */}
        <Box
          className={classes.statsGrid}
          sx={{ gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' } }}
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
                    <Box
                      className={classes.statIconWrap}
                      sx={{ background: `${color}14`, border: `1.5px solid ${color}28` }}
                    >
                      <Icon className={classes.statIcon} sx={{ color }} />
                    </Box>
                  </Box>
                  <Divider className={classes.statDivider} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', flex: '1 1 0', minWidth: 0 }}>
                      <Box
                        className={classes.statSubDot}
                        sx={{ background: sub1Color, boxShadow: `0 0 6px ${sub1Color}`, flexShrink: 0 }}
                      />
                      <Typography className={classes.statSub} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span style={{ color: sub1Color, fontWeight: 700 }}>{sub1}</span>
                        {` ${sub1Label}`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', flex: '1 1 0', minWidth: 0, justifyContent: 'flex-end' }}>
                      <Box
                        className={classes.statSubDot}
                        sx={{ background: sub2Color, boxShadow: `0 0 6px ${sub2Color}`, flexShrink: 0 }}
                      />
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
                <GroupIcon className={classes.emptyIcon} />
                <Typography variant='h6' color='text.secondary'>
                  {tableSearch ? 'No matching records' : `No ${cfg.title.toLowerCase()} records found`}
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
                />
              </Box>
            )}
          </TabPanel>
        ))}
      </Box>
    </>
  );
};

export default CustomerManagement;
