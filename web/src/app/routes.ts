import { lazy } from 'react';

// Lazy-loaded pages
export const LazyMenuItems = {
  // Admin layout
  AdminHeaderPage: lazy(() => import('@gogaadi/pages/admin/Header')),
  AdminSideNavPage: lazy(() => import('@gogaadi/pages/admin/SideNav')),

  // Consultant layout
  ConsultantHeaderPage: lazy(() => import('@gogaadi/pages/consultant/Header')),
  ConsultantSideNavPage: lazy(() => import('@gogaadi/pages/consultant/SideNav')),

  // Team pages
  AdminCustomerDetailPage: lazy(() => import('@gogaadi/pages/admin/CustomerDetail')),
  AdminAccessRequestsPage: lazy(() => import('@gogaadi/pages/admin/AccessRequests')),

  // Governance pages
  AdminDashboardPage: lazy(() => import('@gogaadi/pages/admin/Dashboard')),
  AdminAccessManagementPage: lazy(() => import('@gogaadi/pages/admin/AccessManagement')),
  AdminAuditTrailsPage: lazy(() => import('@gogaadi/pages/admin/AuditTrails')),
  AdminEventsPage: lazy(() => import('@gogaadi/pages/admin/Events')),

  // Administration pages
  AdminSubscriptionsPage: lazy(() => import('@gogaadi/pages/admin/Subscriptions')),
  AdminCollectionsPage: lazy(() => import('@gogaadi/pages/admin/Collections')),
  AdminCategoriesPage: lazy(() => import('@gogaadi/pages/admin/Categories')),
  AdminTagsPage: lazy(() => import('@gogaadi/pages/admin/FastTag')),
  AdminSettingsPage: lazy(() => import('@gogaadi/pages/admin/Settings')),

  // Finance pages
  AdminTransactionsPage: lazy(() => import('@gogaadi/pages/admin/Transactions')),
  AdminDriverEarningsPage: lazy(() => import('@gogaadi/pages/admin/DriverEarnings')),
  AdminCommissionsPage: lazy(() => import('@gogaadi/pages/admin/Commissions')),

  // Requests pages
  AdminCreateNewPage: lazy(() => import('@gogaadi/pages/admin/CreateNew')),
  AdminKycPage: lazy(() => import('@gogaadi/pages/admin/Kyc')),
  AdminCreateManagementFormPage: lazy(() =>
    import('@gogaadi/pages/admin/CreateTicket').then((m) => ({ default: m.CreateManagementForm })),
  ),
  AdminCreateCustomerFormPage: lazy(() =>
    import('@gogaadi/pages/admin/CreateCustomer').then((m) => ({ default: m.CreateCustomerForm })),
  ),
  AdminCreateCustomerSimpleFormPage: lazy(() =>
    import('@gogaadi/pages/admin/CreateCustomer').then((m) => ({ default: m.CreateSimpleForm })),
  ),

  // Reports pages
  AdminAnalyticsPage: lazy(() => import('@gogaadi/pages/admin/Analytics')),

  // Configuration pages
  AdminPricingPage: lazy(() => import('@gogaadi/pages/admin/Pricing')),
  AdminServiceTypesPage: lazy(() => import('@gogaadi/pages/admin/ServiceTypes')),
  AdminBusinessRulesPage: lazy(() => import('@gogaadi/pages/admin/BusinessRules')),
  AdminFeatureFlagsPage: lazy(() => import('@gogaadi/pages/admin/FeatureFlags')),
  AdminZonesPage: lazy(() => import('@gogaadi/pages/admin/Zones')),
  AdminIntegrationsPage: lazy(() => import('@gogaadi/pages/admin/Integrations')),

  // Customer landing pages (sidebar entry points)
  AdminCustomerAccessLandingPage: lazy(() => import('@gogaadi/pages/admin/CustomerAccessLanding')),
  AdminCustomerManagementLandingPage: lazy(
    () => import('@gogaadi/pages/admin/CustomerManagementLanding'),
  ),

  // Customer unified pages (individual service type views)
  AdminCustomerAccessPage: lazy(() => import('@gogaadi/pages/admin/CustomerAccess')),
  AdminCustomerManagementPage: lazy(() => import('@gogaadi/pages/admin/CustomerManagement')),

  // Supporting pages
  AdminProfilePage: lazy(() => import('@gogaadi/pages/admin/Profile')),

  // Auth pages (shared/public)
  SignInPage: lazy(() => import('@gogaadi/pages/shared/SignIn')),
  SignUpPage: lazy(() => import('@gogaadi/pages/shared/SignUp')),
  ForgotPasswordPage: lazy(() => import('@gogaadi/pages/shared/ForgotPassword')),

  // NotFound page
  NotFoundPage: lazy(() => import('@gogaadi/component/NotFound')),
};
