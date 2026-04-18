import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LazyMenuItems } from './routes';
import { constants } from '@gogaadi/utils';
import { ErrorBoundary, MainContent, Loader } from '@gogaadi/component';
import { useAuth, useLoader } from '@gogaadi/hooks';
import { AppRoleContext } from '@gogaadi/theme';

const {
  // Admin layout
  AdminHeaderPage,
  AdminSideNavPage,

  // Consultant layout
  ConsultantHeaderPage,
  ConsultantSideNavPage,

  // Customer & User Detail (shared component)
  AdminCustomerDetailPage,

  // Team
  AdminAccessRequestsPage,

  // Governance
  AdminDashboardPage,
  AdminAccessManagementPage,
  AdminAuditTrailsPage,
  AdminEventsPage,

  // Administration
  AdminSubscriptionsPage,
  AdminCollectionsPage,
  AdminCategoriesPage,
  AdminTagsPage,
  AdminSettingsPage,

  // Finance
  AdminTransactionsPage,
  AdminDriverEarningsPage,
  AdminCommissionsPage,

  // Requests
  AdminCreateNewPage,
  AdminKycPage,
  AdminCreateManagementFormPage,
  AdminCreateCustomerFormPage,
  AdminCreateCustomerSimpleFormPage,

  // Reports
  AdminAnalyticsPage,

  // Configuration
  AdminPricingPage,
  AdminServiceTypesPage,
  AdminBusinessRulesPage,
  AdminFeatureFlagsPage,
  AdminZonesPage,
  AdminIntegrationsPage,

  // Customer landing pages
  AdminCustomerAccessLandingPage,
  AdminCustomerManagementLandingPage,

  // Customer unified pages
  AdminCustomerAccessPage,
  AdminCustomerManagementPage,

  // Supporting
  AdminProfilePage,

  // Auth
  SignInPage,
  SignUpPage,
  ForgotPasswordPage,
  NotFoundPage,
} = LazyMenuItems;

// Forces CreateManagementForm to remount when :type changes (admin ↔ consultant)
const KeyedManagementForm = () => {
  const { type } = useParams<{ type: string }>();
  return <AdminCreateManagementFormPage key={type} />;
};

const SIMPLE_CUSTOMER_TYPES = [
  'user',
  'driver-hire',
  'vehicle-rental',
  'mechanic-hire',
  'petrol-bunk',
  'ev-charging',
  'showroom',
  'vehicle-finance',
  'finance-broker',
  'insurance-partner',
];

// Routes to the correct form based on :type param
const KeyedCustomerForm = () => {
  const { type } = useParams<{ type: string }>();
  if (type && SIMPLE_CUSTOMER_TYPES.includes(type)) {
    return <AdminCreateCustomerSimpleFormPage key={type} />;
  }
  return <AdminCreateCustomerFormPage key={type} />;
};

// Shared consultant routes (used for both isConsultantMode admin and isConsultant role)
const ConsultantRoutes = () => {
  const { ConsultantPath, Path } = constants;
  return (
    <Routes>
      <Route
        path={Path.DEFAULT_PAGE}
        element={<Navigate to={ConsultantPath.PEOPLE_ACCESS} replace />}
      />

      {/* Customer landing pages */}
      <Route path={ConsultantPath.PEOPLE_ACCESS} element={<AdminCustomerAccessLandingPage />} />
      <Route
        path={ConsultantPath.PEOPLE_MANAGEMENT}
        element={<AdminCustomerManagementLandingPage />}
      />

      {/* Customer Access — all service types */}
      <Route path={ConsultantPath.MOBILITY_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.LOGISTICS_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.MOBILITY_AUTO_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.MOBILITY_CAB_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.MOBILITY_SHUTTLE_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.USER_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.CUSTOMER_APPROVALS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.PARCEL_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.DRIVER_HIRE_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.VEHICLE_RENTAL_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.MECHANIC_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.PETROL_BUNK_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.EV_CHARGING_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.SHOWROOM_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.VEHICLE_FINANCE_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.FINANCE_BROKER_ACCESS} element={<AdminCustomerAccessPage />} />
      <Route path={ConsultantPath.INSURANCE_ACCESS} element={<AdminCustomerAccessPage />} />

      {/* Customer Management — all service types */}
      <Route path={ConsultantPath.MOBILITY_MANAGEMENT} element={<AdminCustomerManagementPage />} />
      <Route path={ConsultantPath.LOGISTICS_MANAGEMENT} element={<AdminCustomerManagementPage />} />
      <Route path={ConsultantPath.USER_MGMT} element={<AdminCustomerManagementPage />} />
      <Route path={ConsultantPath.USER_MANAGEMENT} element={<AdminCustomerManagementPage />} />
      <Route path={ConsultantPath.PARCEL_MANAGEMENT} element={<AdminCustomerManagementPage />} />
      <Route path={ConsultantPath.MECHANIC_MANAGEMENT} element={<AdminCustomerManagementPage />} />
      <Route path={ConsultantPath.SHOWROOM_MANAGEMENT} element={<AdminCustomerManagementPage />} />
      <Route path={ConsultantPath.INSURANCE_MANAGEMENT} element={<AdminCustomerManagementPage />} />

      {/* Customer detail */}
      <Route path={ConsultantPath.CUSTOMER_DETAIL} element={<AdminCustomerDetailPage />} />

      {/* Profile */}
      <Route path={ConsultantPath.PROFILE} element={<AdminProfilePage />} />

      {/* Create new */}
      <Route path={ConsultantPath.CREATE_NEW} element={<AdminCreateNewPage />} />

      {/* Catch-all: block access to any admin URL — redirect to consultant home */}
      <Route path={Path.NOT_FOUND} element={<Navigate to={ConsultantPath.PEOPLE_ACCESS} replace />} />
    </Routes>
  );
};

// Guard: blocks consultant role from accessing admin URLs
const ConsultantRoleGuard = ({ children }: { children: React.ReactNode }) => {
  const { ConsultantPath } = constants;
  const { isConsultant } = useAuth();
  const { pathname } = useLocation();
  if (isConsultant && pathname.startsWith('/app/admin')) {
    return <Navigate to={ConsultantPath.PEOPLE_ACCESS} replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  const { AdminPath, ConsultantPath, AuthPath, Path } = constants;
  const { isAuthenticated, isAdmin, isConsultant, isConsultantMode } = useAuth();
  const { pathname } = useLocation();
  const { hide } = useLoader();

  // Hide the global overlay loader whenever the route changes — prevents stuck loaders
  useEffect(() => {
    hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Not authenticated — show auth pages
  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <Routes>
          <Route path={AuthPath.SIGNIN} element={<SignInPage />} />
          <Route path={AuthPath.SIGNUP} element={<SignUpPage />} />
          <Route path={AuthPath.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={Path.NOT_FOUND} element={<Navigate to={AuthPath.SIGNIN} replace />} />
        </Routes>
      </ErrorBoundary>
    );
  }

  // Admin in consultant mode — green consultant layout at /app/consultant/*
  if (isAdmin && isConsultantMode) {
    return (
      <AppRoleContext.Provider value='admin'>
        <ErrorBoundary>
          <ConsultantHeaderPage />
          <ConsultantSideNavPage />
          <MainContent>
            <ConsultantRoutes />
          </MainContent>
        </ErrorBoundary>
      </AppRoleContext.Provider>
    );
  }

  // Authenticated as Admin
  if (isAdmin) {
    return (
      <AppRoleContext.Provider value='admin'>
        <ErrorBoundary>
          <AdminHeaderPage />
          <AdminSideNavPage />
          <MainContent>
            <Routes>
              <Route
                path={Path.DEFAULT_PAGE}
                element={<Navigate to={AdminPath.DASHBOARD} replace />}
              />

              {/* Team */}
              <Route path={AdminPath.USER_DETAIL} element={<AdminCustomerDetailPage />} />
              <Route path={AdminPath.CUSTOMER_DETAIL} element={<AdminCustomerDetailPage />} />
              <Route path={AdminPath.ROLE_REQUESTS} element={<AdminAccessRequestsPage />} />

              {/* Governance */}
              <Route path={AdminPath.DASHBOARD} element={<AdminDashboardPage />} />
              <Route path={AdminPath.ACCESS_MANAGEMENT} element={<AdminAccessManagementPage />} />
              <Route path={AdminPath.AUDIT_TRAILS} element={<AdminAuditTrailsPage />} />
              <Route path={AdminPath.EVENTS} element={<AdminEventsPage />} />

              {/* Administration */}
              <Route path={AdminPath.SUBSCRIPTIONS} element={<AdminSubscriptionsPage />} />
              <Route path={AdminPath.COLLECTIONS} element={<AdminCollectionsPage />} />
              <Route path={AdminPath.CATEGORIES} element={<AdminCategoriesPage />} />
              <Route path={AdminPath.TAGS} element={<AdminTagsPage />} />
              <Route path={AdminPath.SETTINGS} element={<AdminSettingsPage />} />

              {/* Customer landing pages */}
              <Route path={AdminPath.PEOPLE_ACCESS} element={<AdminCustomerAccessLandingPage />} />
              <Route
                path={AdminPath.PEOPLE_MANAGEMENT}
                element={<AdminCustomerManagementLandingPage />}
              />

              {/* Mobility & Logistics */}
              <Route path={AdminPath.MOBILITY_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route path={AdminPath.LOGISTICS_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route
                path={AdminPath.MOBILITY_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.LOGISTICS_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />

              {/* Mobility Access — sub-categories */}
              <Route
                path={AdminPath.MOBILITY_BIKE_SCOOTER_ACCESS}
                element={<AdminCustomerAccessPage />}
              />
              <Route path={AdminPath.MOBILITY_AUTO_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route path={AdminPath.MOBILITY_CAB_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route
                path={AdminPath.MOBILITY_SHUTTLE_ACCESS}
                element={<AdminCustomerAccessPage />}
              />

              {/* Logistics Access — sub-categories */}
              <Route
                path={AdminPath.LOGISTICS_MINI_CARGO_ACCESS}
                element={<AdminCustomerAccessPage />}
              />
              <Route
                path={AdminPath.LOGISTICS_MEDIUM_GOODS_ACCESS}
                element={<AdminCustomerAccessPage />}
              />
              <Route
                path={AdminPath.LOGISTICS_HEAVY_TRUCK_ACCESS}
                element={<AdminCustomerAccessPage />}
              />

              {/* Mobility Management — sub-categories */}
              <Route
                path={AdminPath.MOBILITY_BIKE_SCOOTER_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.MOBILITY_AUTO_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.MOBILITY_CAB_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.MOBILITY_SHUTTLE_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />

              {/* Logistics Management — sub-categories */}
              <Route
                path={AdminPath.LOGISTICS_MINI_CARGO_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.LOGISTICS_MEDIUM_GOODS_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.LOGISTICS_HEAVY_TRUCK_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route path={AdminPath.USER_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route path={AdminPath.USER_MGMT} element={<AdminCustomerManagementPage />} />

              {/* People Access — all service types */}
              <Route path={AdminPath.CUSTOMER_APPROVALS} element={<AdminCustomerAccessPage />} />
              <Route path={AdminPath.PARCEL_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route path={AdminPath.DRIVER_HIRE_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route path={AdminPath.VEHICLE_RENTAL_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route path={AdminPath.MECHANIC_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route path={AdminPath.PETROL_BUNK_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route path={AdminPath.EV_CHARGING_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route path={AdminPath.SHOWROOM_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route
                path={AdminPath.VEHICLE_FINANCE_ACCESS}
                element={<AdminCustomerAccessPage />}
              />
              <Route path={AdminPath.FINANCE_BROKER_ACCESS} element={<AdminCustomerAccessPage />} />
              <Route path={AdminPath.INSURANCE_ACCESS} element={<AdminCustomerAccessPage />} />

              {/* People Management — all service types */}
              <Route path={AdminPath.USER_MANAGEMENT} element={<AdminCustomerManagementPage />} />
              <Route path={AdminPath.PARCEL_MANAGEMENT} element={<AdminCustomerManagementPage />} />
              <Route
                path={AdminPath.DRIVER_HIRE_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.VEHICLE_RENTAL_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.MECHANIC_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.PETROL_BUNK_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.EV_CHARGING_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.SHOWROOM_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.VEHICLE_FINANCE_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.FINANCE_BROKER_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />
              <Route
                path={AdminPath.INSURANCE_MANAGEMENT}
                element={<AdminCustomerManagementPage />}
              />

              {/* Finance */}
              <Route path={AdminPath.TRANSACTIONS} element={<AdminTransactionsPage />} />
              <Route path={AdminPath.DRIVER_EARNINGS} element={<AdminDriverEarningsPage />} />
              <Route path={AdminPath.COMMISSIONS} element={<AdminCommissionsPage />} />

              {/* Requests */}
              <Route path={AdminPath.CREATE_NEW} element={<AdminCreateNewPage />} />
              <Route path={AdminPath.KYC} element={<AdminKycPage />} />
              <Route path={AdminPath.CREATE_MANAGEMENT_TYPE} element={<KeyedManagementForm />} />
              <Route path={AdminPath.CREATE_CUSTOMER_TYPE} element={<KeyedCustomerForm />} />

              {/* Reports */}
              <Route path={AdminPath.ANALYTICS} element={<AdminAnalyticsPage />} />

              {/* Configuration */}
              <Route path={AdminPath.PRICING} element={<AdminPricingPage />} />
              <Route path={AdminPath.SERVICES} element={<AdminServiceTypesPage />} />
              <Route path={AdminPath.RULES} element={<AdminBusinessRulesPage />} />
              <Route path={AdminPath.FEATURE_FLAGS} element={<AdminFeatureFlagsPage />} />
              <Route path={AdminPath.ZONES} element={<AdminZonesPage />} />
              <Route path={AdminPath.INTEGRATIONS} element={<AdminIntegrationsPage />} />

              {/* Supporting */}
              <Route path={AdminPath.PROFILE} element={<AdminProfilePage />} />

              {/* Admin navigating to consultant URLs → redirect to dashboard */}
              <Route
                path='/app/consultant/*'
                element={<Navigate to={AdminPath.DASHBOARD} replace />}
              />

              <Route path={Path.NOT_FOUND} element={<NotFoundPage />} />
            </Routes>
          </MainContent>
        </ErrorBoundary>
      </AppRoleContext.Provider>
    );
  }

  // Consultant role — Customer Access & Management only
  if (isConsultant) {
    return (
      <AppRoleContext.Provider value='admin'>
        <ErrorBoundary>
          <ConsultantHeaderPage />
          <ConsultantSideNavPage />
          <MainContent>
            <ConsultantRoutes />
          </MainContent>
        </ErrorBoundary>
      </AppRoleContext.Provider>
    );
  }

  // Non-admin/non-consultant — redirect to sign in
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={Path.NOT_FOUND} element={<Navigate to={AuthPath.SIGNIN} replace />} />
      </Routes>
    </ErrorBoundary>
  );
};

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AppRoutes />
    <Loader globalOverlay />
  </LocalizationProvider>
);

export default App;
