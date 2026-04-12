import HowToRegIcon from '@mui/icons-material/HowToReg';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HailIcon from '@mui/icons-material/Hail';
import CarRentalIcon from '@mui/icons-material/CarRental';
import BuildIcon from '@mui/icons-material/Build';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AdminPageShell } from '../shared';
import { useCustomerApprovals } from './hooks/useCustomerApprovals';
import ActionDialog from './dialogs/ActionDialog/ActionDialog';
import DetailDialog from './dialogs/DetailDialog/DetailDialog';

const CustomerApprovals = () => {
  const {
    isLoading,
    activeRows,
    pendingRows,
    needsActionCount,
    driverHireRows,
    vehicleRentalRows,
    mechanicHireRows,
    userRows,
    pendingDriverHireRows,
    pendingVehicleRentalRows,
    pendingMechanicHireRows,
    pendingUserRows,
    tabValue,
    setTabValue,
    tableSearch,
    setTableSearch,
    tabLists,
    tabs,
    columns,
    driverHireColumns,
    vehicleRentalColumns,
    mechanicHireColumns,
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
  } = useCustomerApprovals();

  const underReviewCount = activeRows.length - needsActionCount;

  return (
    <AdminPageShell
      mode='table'
      isLoading={isLoading}
      title='Customer Requests'
      description='Review onboarding requests and manage approved mobility & logistics customers from a single view.'
      headerGradient='linear-gradient(135deg, #0f172a 0%, #1e3a8a 30%, #1d4ed8 65%, #0ea5e9 100%)'
      headerBoxShadow='0 24px 64px rgba(29,78,216,0.28), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)'
      accentColor='#1d4ed8'
      statCards={[
        {
          label: 'All Requests',
          value: activeRows.length,
          Icon: HowToRegIcon,
          cls: 'statCard0',
          color: '#4f46e5',
          tabIndex: 0,
          sub1: needsActionCount,
          sub1Label: 'pending',
          sub1Color: '#d97706',
          sub2: underReviewCount,
          sub2Label: 'in review',
          sub2Color: '#2563eb',
        },
        {
          label: 'Driver Hire',
          value: pendingDriverHireRows.length,
          Icon: HailIcon,
          cls: 'statCard2',
          color: '#16a34a',
          tabIndex: 2,
          sub1: pendingDriverHireRows.length,
          sub1Label: 'pending',
          sub1Color: '#d97706',
          sub2: driverHireRows.length - pendingDriverHireRows.length,
          sub2Label: 'processed',
          sub2Color: '#16a34a',
        },
        {
          label: 'Vehicle Rental',
          value: pendingVehicleRentalRows.length,
          Icon: CarRentalIcon,
          cls: 'statCard4',
          color: '#7c3aed',
          tabIndex: 3,
          sub1: pendingVehicleRentalRows.length,
          sub1Label: 'pending',
          sub1Color: '#d97706',
          sub2: vehicleRentalRows.length - pendingVehicleRentalRows.length,
          sub2Label: 'processed',
          sub2Color: '#16a34a',
        },
        {
          label: 'Mechanic Hire',
          value: pendingMechanicHireRows.length,
          Icon: BuildIcon,
          cls: 'statCard7',
          color: '#ea580c',
          tabIndex: 4,
          sub1: pendingMechanicHireRows.length,
          sub1Label: 'pending',
          sub1Color: '#d97706',
          sub2: mechanicHireRows.length - pendingMechanicHireRows.length,
          sub2Label: 'processed',
          sub2Color: '#16a34a',
        },
        {
          label: 'Users',
          value: pendingUserRows.length,
          Icon: PersonAddIcon,
          cls: 'statCard5',
          color: '#0891b2',
          tabIndex: 1,
          sub1: pendingUserRows.length,
          sub1Label: 'pending',
          sub1Color: '#d97706',
          sub2: userRows.length - pendingUserRows.length,
          sub2Label: 'processed',
          sub2Color: '#16a34a',
        },
        {
          label: 'Pending',
          value: needsActionCount,
          Icon: PendingActionsIcon,
          cls: 'statCard3',
          color: '#dc2626',
          tabIndex: 5,
          sub1: needsActionCount,
          sub1Label: 'pending',
          sub1Color: '#dc2626',
          sub2: underReviewCount,
          sub2Label: 'in review',
          sub2Color: '#2563eb',
        },
      ]}
      statGridCols={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' }}
      tabs={tabs}
      tabValue={tabValue}
      onTabChange={setTabValue}
      search={tableSearch}
      onSearchChange={setTableSearch}
      tabPanels={[
        // Tab 0: All (from hook tabLists[0])
        ...tabLists.map((list, idx) => ({
          index: idx,
          columns,
          data: list,
          applyFilter: true,
          emptyIcon: PendingActionsIcon,
          emptyText: tableSearch ? 'No matching requests' : 'No customer requests found',
        })),
        // Tab 1: Users
        {
          index: 1,
          columns,
          data: userRows,
          applyFilter: true,
          emptyIcon: PersonAddIcon,
          emptyText: tableSearch ? 'No matching users' : 'No user registrations found',
        },
        // Tab 2: Driver Hire (no filter — show all)
        {
          index: 2,
          columns: driverHireColumns,
          data: driverHireRows,
          applyFilter: false,
        },
        // Tab 3: Vehicle Rental
        {
          index: 3,
          columns: vehicleRentalColumns,
          data: vehicleRentalRows,
          applyFilter: false,
        },
        // Tab 4: Mechanic Hire
        {
          index: 4,
          columns: mechanicHireColumns,
          data: mechanicHireRows,
          applyFilter: false,
        },
        // Tab 5: Pending
        {
          index: 5,
          columns,
          data: pendingRows,
          applyFilter: true,
          emptyIcon: PendingActionsIcon,
          emptyText: tableSearch ? 'No matching requests' : 'No pending requests',
        },
      ]}
      getFilteredData={getFilteredData}
      extras={
        <>
          <DetailDialog
            row={detailRow}
            onClose={() => setDetailRow(null)}
            onOpenAction={handleOpenAction}
          />
          <ActionDialog
            actionTarget={actionTarget}
            actionNotes={actionNotes}
            actionInProgress={actionInProgress}
            onClose={handleCloseAction}
            onNotesChange={setActionNotes}
            onConfirm={handleConfirmAction}
          />
        </>
      }
    />
  );
};

export default CustomerApprovals;
