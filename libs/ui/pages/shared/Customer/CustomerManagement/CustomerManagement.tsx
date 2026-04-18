import GroupIcon from '@mui/icons-material/Group';
import { useLocation } from 'react-router-dom';
import { AdminPageShell, ShellStatCard } from '@gogaadi/pages/shared/PageShell';
import { useCustomerManagement, getManagementCategoryFromPath } from './hooks/useCustomerManagement';
import { constants } from '@gogaadi/utils';

const CustomerManagement = () => {
  const { pathname } = useLocation();
  const category = getManagementCategoryFromPath(pathname);
  const isConsultantPath = pathname.startsWith('/app/consultant');
  const customerDetailPath = isConsultantPath
    ? constants.ConsultantPath.CUSTOMER_DETAIL
    : constants.AdminPath.CUSTOMER_DETAIL;

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
    selectedRow,
    setSelectedRow,
    getFilteredData,
    isMultiType,
    vehicleSubTypes,
    subTypeOffset,
  } = useCustomerManagement(category);

  // ── Stat cards: multi-type (mobility/logistics) ──────────────────────────────
  const multiTypeStatCards: ShellStatCard[] | null =
    isMultiType && vehicleSubTypes
      ? [
          {
            label: 'All',
            value: categoryRows.length,
            Icon: cfg.Icon,
            color: cfg.color,
            tabIndex: 0,
            sub1: approvedRows.length,
            sub1Label: 'approved',
            sub1Color: '#10b981',
            sub2: pendingRows.length,
            sub2Label: 'pending',
            sub2Color: '#d97706',
          },
          ...vehicleSubTypes.map((st, idx) => {
            const rows = tabLists[idx + 1];
            const approved = rows.filter((r) => r.status === 'approved').length;
            const pending = rows.filter((r) => r.status === 'pending' || r.status === 'under_review').length;
            return {
              label: st.label,
              value: rows.length,
              Icon: st.Icon,
              color: st.color,
              tabIndex: idx + 1,
              sub1: approved,
              sub1Label: 'approved',
              sub1Color: '#10b981',
              sub2: pending,
              sub2Label: 'pending',
              sub2Color: '#d97706',
            };
          }),
          {
            label: 'Rejected',
            value: rejectedRows.length,
            Icon: GroupIcon,
            color: '#dc2626',
            tabIndex: subTypeOffset + 1,
            sub1: rejectedRows.length,
            sub1Label: 'rejected',
            sub1Color: '#dc2626',
            sub2: 0,
            sub2Label: 'appealed',
            sub2Color: '#f97316',
          },
          {
            label: 'Draft',
            value: pendingRows.length,
            Icon: cfg.Icon,
            color: '#94a3b8',
            tabIndex: subTypeOffset + 2,
            isDraft: true,
            sub1: pendingRows.filter((r) => r.status === 'pending').length,
            sub1Label: 'pending',
            sub1Color: '#d97706',
            sub2: pendingRows.filter((r) => r.status === 'under_review').length,
            sub2Label: 'in review',
            sub2Color: '#2563eb',
          },
        ]
      : null;

  // ── Stat cards: single-category ──────────────────────────────────────────────
  const singleStatCards: ShellStatCard[] = [
    {
      label: 'All',
      value: categoryRows.length,
      Icon: cfg.Icon,
      color: cfg.color,
      tabIndex: 0,
      sub1: approvedRows.length,
      sub1Label: 'approved',
      sub1Color: '#10b981',
      sub2: rejectedRows.length,
      sub2Label: 'rejected',
      sub2Color: '#dc2626',
    },
    {
      label: 'Rejected',
      value: rejectedRows.length,
      Icon: GroupIcon,
      color: '#dc2626',
      tabIndex: 1,
      sub1: rejectedRows.length,
      sub1Label: 'rejected',
      sub1Color: '#dc2626',
      sub2: 0,
      sub2Label: 'appealed',
      sub2Color: '#f97316',
    },
    {
      label: 'Draft',
      value: pendingRows.length,
      Icon: cfg.Icon,
      color: '#94a3b8',
      tabIndex: 2,
      isDraft: true,
      sub1: pendingRows.filter((r) => r.status === 'pending').length,
      sub1Label: 'pending',
      sub1Color: '#d97706',
      sub2: pendingRows.filter((r) => r.status === 'under_review').length,
      sub2Label: 'in review',
      sub2Color: '#2563eb',
    },
  ];

  const activeStatCards = multiTypeStatCards ?? singleStatCards;

  return (
    <AdminPageShell
      mode='table'
      isLoading={isLoading}
      title={cfg.title}
      description={cfg.description}
      headerGradient='linear-gradient(135deg, #0f172a 0%, #134e4a 30%, #0f766e 65%, #14b8a6 100%)'
      headerBoxShadow='0 24px 64px rgba(15,118,110,0.28), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)'
      statCards={activeStatCards}
      statGridCols={
        multiTypeStatCards
          ? { xs: 'repeat(2, 1fr)', sm: `repeat(${multiTypeStatCards.length}, 1fr)` }
          : { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }
      }
      tabs={tabs}
      tabValue={tabValue}
      onTabChange={setTabValue}
      search={tableSearch}
      onSearchChange={setTableSearch}
      tabPanels={tabLists.map((list, idx) => ({
        index: idx,
        columns,
        data: list,
        onRowClick: (row) => {
          setSelectedRow(row);
          const uid = (row as any).customerId ?? String(row.id);
          window.open(customerDetailPath.replace(':id', uid), '_blank');
        },
        activeRowKey: selectedRow?.id,
        emptyText: tableSearch ? 'No matching records' : `No ${cfg.title.toLowerCase()} records found`,
      }))}
      getFilteredData={getFilteredData}
      emptyIcon={GroupIcon}
    />
  );
};

export default CustomerManagement;
