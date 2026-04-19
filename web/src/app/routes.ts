import { lazy } from 'react';

// Lazy-loaded pages
export const LazyMenuItems = {
  // Admin layout (shared components, role-aware)
  AdminHeaderPage: lazy(() => import('@gogaadi/pages/shared/Header')),
  AdminSideNavPage: lazy(() => import('@gogaadi/pages/shared/SideNav')),

  // Consultant layout (same shared components, role-aware)
  ConsultantHeaderPage: lazy(() => import('@gogaadi/pages/shared/Header')),
  ConsultantSideNavPage: lazy(() => import('@gogaadi/pages/shared/SideNav')),

  // Customer & User Detail (shared component)
  AdminCustomerDetailPage: lazy(() => import('@gogaadi/pages/shared/Customer/CustomerDetail')),

  // People pages (new structure)
  AdminAccessRequestsPage: lazy(() => import('@gogaadi/pages/admin/People/PeopleRequests')),
  AdminAccessManagementPage: lazy(() => import('@gogaadi/pages/admin/People/PeopleManagement')),

  // Governance pages
  AdminDashboardPage: lazy(() => import('@gogaadi/pages/admin/Dashboard')),
  AdminAuditTrailsPage: lazy(() => import('@gogaadi/pages/admin/Configuration/Reports/AuditTrails')),
  AdminEventsPage: lazy(() => import('@gogaadi/pages/admin/Configuration/Events')),

  // Finance pages
  AdminSubscriptionsPage: lazy(() => import('@gogaadi/pages/admin/Finance/Subscriptions')),
  AdminCollectionsPage: lazy(() => import('@gogaadi/pages/admin/Finance/Collections')),
  AdminTagsPage: lazy(() => import('@gogaadi/pages/admin/Finance/FastTag')),
  AdminTransactionsPage: lazy(() => import('@gogaadi/pages/admin/Finance/Transactions')),
  AdminDriverEarningsPage: lazy(() => import('@gogaadi/pages/admin/Configuration/DriverEarnings')),
  AdminCommissionsPage: lazy(() => import('@gogaadi/pages/admin/Finance/Commissions')),

  // Configuration pages
  AdminCategoriesPage: lazy(() => import('@gogaadi/pages/admin/Configuration/Categories')),
  AdminSettingsPage: lazy(() => import('@gogaadi/pages/shared/Settings')),
  AdminPricingPage: lazy(() => import('@gogaadi/pages/admin/Configuration/Pricing')),
  AdminServiceTypesPage: lazy(() => import('@gogaadi/pages/admin/Configuration/ServiceTypes')),
  AdminBusinessRulesPage: lazy(() => import('@gogaadi/pages/admin/Configuration/BusinessRules')),
  AdminFeatureFlagsPage: lazy(() => import('@gogaadi/pages/admin/Configuration/FeatureFlags')),
  AdminZonesPage: lazy(() => import('@gogaadi/pages/admin/Configuration/Zones')),
  AdminIntegrationsPage: lazy(() => import('@gogaadi/pages/admin/Configuration/Integrations')),
  AdminKycPage: lazy(() => import('@gogaadi/pages/admin/Configuration/Kyc')),

  // Reports pages
  AdminAnalyticsPage: lazy(() => import('@gogaadi/pages/admin/Configuration/Reports/Analytics')),

  // Requests pages (all from shared/Service)
  AdminCreateNewPage: lazy(() => import('@gogaadi/pages/shared/Service')),
  AdminCreateManagementFormPage: lazy(() =>
    import('@gogaadi/pages/shared/Service').then((m) => ({ default: m.CreateManagementForm })),
  ),
  AdminCreateCustomerFormPage: lazy(() =>
    import('@gogaadi/pages/shared/Service').then((m) => ({ default: m.CreateCustomerForm })),
  ),
  AdminCreateCustomerSimpleFormPage: lazy(() =>
    import('@gogaadi/pages/shared/Service').then((m) => ({ default: m.CreateSimpleForm })),
  ),

  // Customer landing pages (sidebar entry points)
  AdminCustomerAccessLandingPage: lazy(() =>
    import('@gogaadi/pages/shared/Customer/LandingPage/AccessLanding'),
  ),
  AdminCustomerManagementLandingPage: lazy(() =>
    import('@gogaadi/pages/shared/Customer/LandingPage/ManagementLanding'),
  ),

  // Customer unified pages (individual service type views)
  AdminCustomerAccessPage: lazy(() => import('@gogaadi/pages/shared/Customer/CustomerAccess')),
  AdminCustomerManagementPage: lazy(() => import('@gogaadi/pages/shared/Customer/CustomerManagement')),

  // Supporting pages
  AdminProfilePage: lazy(() => import('@gogaadi/pages/shared/Profile')),

  // Auth pages (shared/public)
  SignInPage: lazy(() => import('@gogaadi/pages/shared/SignIn')),
  SignUpPage: lazy(() => import('@gogaadi/pages/shared/SignUp')),
  ForgotPasswordPage: lazy(() => import('@gogaadi/pages/shared/ForgotPassword')),

  // NotFound page
  NotFoundPage: lazy(() => import('@gogaadi/component/NotFound')),
};
