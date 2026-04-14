const ADMIN_BASE = '/app/admin';
const CONSULTANT_BASE = '/app/consultant';
const USER_BASE = '/app/user';

const AdminPath = {
  // Governance
  DASHBOARD: `${ADMIN_BASE}/dashboard`,
  CONSULTANT: `${ADMIN_BASE}/consultant`,
  APIS: `${ADMIN_BASE}/apis`,
  ACCESS_MANAGEMENT: `${ADMIN_BASE}/people-management`,
  AUDIT_TRAILS: `${ADMIN_BASE}/audit-trails`,
  EVENTS: `${ADMIN_BASE}/events`,

  // Administration
  USERS: `${ADMIN_BASE}/users`,
  ORGANIZATIONS: `${ADMIN_BASE}/organizations`,
  SUBSCRIPTIONS: `${ADMIN_BASE}/subscriptions`,
  COLLECTIONS: `${ADMIN_BASE}/collections`,
  CATEGORIES: `${ADMIN_BASE}/categories`,
  TAGS: `${ADMIN_BASE}/tags`,
  THEMING_LANGUAGE: `${ADMIN_BASE}/theming-language`,
  API_GATEWAYS: `${ADMIN_BASE}/api-gateways`,
  SEO: `${ADMIN_BASE}/seo`,
  USER_MANAGEMENT: `${ADMIN_BASE}/user-management`,
  SETTINGS: `${ADMIN_BASE}/settings`,

  // Mobility Services
  DRIVER_HIRE: `${ADMIN_BASE}/driver-hire`,
  VEHICLE_RENTAL: `${ADMIN_BASE}/vehicle-rental`,
  MECHANIC_HIRE: `${ADMIN_BASE}/mechanic-hire`,
  PARCEL: `${ADMIN_BASE}/parcel`,

  // Operations
  RIDES: `${ADMIN_BASE}/rides`,

  // Finance
  TRANSACTIONS: `${ADMIN_BASE}/transactions`,
  DRIVER_EARNINGS: `${ADMIN_BASE}/driver-earnings`,
  COMMISSIONS: `${ADMIN_BASE}/commissions`,

  // Requests
  KYC: `${ADMIN_BASE}/kyc`,

  // Reports
  ANALYTICS: `${ADMIN_BASE}/analytics`,

  // Configuration
  PRICING: `${ADMIN_BASE}/pricing`,
  SERVICES: `${ADMIN_BASE}/service-types`,
  RULES: `${ADMIN_BASE}/business-rules`,
  FEATURE_FLAGS: `${ADMIN_BASE}/feature-flags`,
  ZONES: `${ADMIN_BASE}/zones`,
  INTEGRATIONS: `${ADMIN_BASE}/integrations`,

  // Fleet — split by category

  // People Access — Consultant Onboarding
  MOBILITY_ACCESS: `${ADMIN_BASE}/mobility-access`,
  LOGISTICS_ACCESS: `${ADMIN_BASE}/logistics-access`,
  PARCEL_ACCESS: `${ADMIN_BASE}/parcel-access`,

  // Mobility Access — sub-categories
  MOBILITY_BIKE_SCOOTER_ACCESS: `${ADMIN_BASE}/mobility-access/bike-scooter`,
  MOBILITY_AUTO_ACCESS: `${ADMIN_BASE}/mobility-access/auto`,
  MOBILITY_CAB_ACCESS: `${ADMIN_BASE}/mobility-access/cab`,
  MOBILITY_SHUTTLE_ACCESS: `${ADMIN_BASE}/mobility-access/shuttle`,

  // Logistics Access — sub-categories
  LOGISTICS_MINI_CARGO_ACCESS: `${ADMIN_BASE}/logistics-access/mini-cargo`,
  LOGISTICS_MEDIUM_GOODS_ACCESS: `${ADMIN_BASE}/logistics-access/medium-goods`,
  LOGISTICS_HEAVY_TRUCK_ACCESS: `${ADMIN_BASE}/logistics-access/heavy-truck`,

  // People Access — On-Demand Services
  DRIVER_HIRE_ACCESS: `${ADMIN_BASE}/driver-hire-access`,
  VEHICLE_RENTAL_ACCESS: `${ADMIN_BASE}/vehicle-rental-access`,
  MECHANIC_ACCESS: `${ADMIN_BASE}/mechanic-access`,

  // People Access — Automotive Partners
  PETROL_BUNK_ACCESS: `${ADMIN_BASE}/petrol-bunk-access`,
  EV_CHARGING_ACCESS: `${ADMIN_BASE}/ev-charging-access`,
  SHOWROOM_ACCESS: `${ADMIN_BASE}/showroom-access`,

  // People Access — Finance Partners
  VEHICLE_FINANCE_ACCESS: `${ADMIN_BASE}/vehicle-finance-access`,
  FINANCE_BROKER_ACCESS: `${ADMIN_BASE}/finance-broker-access`,
  INSURANCE_ACCESS: `${ADMIN_BASE}/insurance-access`,

  // People Access — Platform User
  USER_ACCESS: `${ADMIN_BASE}/user-access`,

  // People Management — Consultant Onboarding
  MOBILITY_MANAGEMENT: `${ADMIN_BASE}/mobility-management`,
  LOGISTICS_MANAGEMENT: `${ADMIN_BASE}/logistics-management`,
  PARCEL_MANAGEMENT: `${ADMIN_BASE}/parcel-management`,

  // Mobility Management — sub-categories
  MOBILITY_BIKE_SCOOTER_MANAGEMENT: `${ADMIN_BASE}/mobility-management/bike-scooter`,
  MOBILITY_AUTO_MANAGEMENT: `${ADMIN_BASE}/mobility-management/auto`,
  MOBILITY_CAB_MANAGEMENT: `${ADMIN_BASE}/mobility-management/cab`,
  MOBILITY_SHUTTLE_MANAGEMENT: `${ADMIN_BASE}/mobility-management/shuttle`,

  // Logistics Management — sub-categories
  LOGISTICS_MINI_CARGO_MANAGEMENT: `${ADMIN_BASE}/logistics-management/mini-cargo`,
  LOGISTICS_MEDIUM_GOODS_MANAGEMENT: `${ADMIN_BASE}/logistics-management/medium-goods`,
  LOGISTICS_HEAVY_TRUCK_MANAGEMENT: `${ADMIN_BASE}/logistics-management/heavy-truck`,

  // People Management — On-Demand Services
  DRIVER_HIRE_MANAGEMENT: `${ADMIN_BASE}/driver-hire-management`,
  VEHICLE_RENTAL_MANAGEMENT: `${ADMIN_BASE}/vehicle-rental-management`,
  MECHANIC_MANAGEMENT: `${ADMIN_BASE}/mechanic-management`,

  // People Management — Automotive Partners
  PETROL_BUNK_MANAGEMENT: `${ADMIN_BASE}/petrol-bunk-management`,
  EV_CHARGING_MANAGEMENT: `${ADMIN_BASE}/ev-charging-management`,
  SHOWROOM_MANAGEMENT: `${ADMIN_BASE}/showroom-management`,

  // People Management — Finance Partners
  VEHICLE_FINANCE_MANAGEMENT: `${ADMIN_BASE}/vehicle-finance-management`,
  FINANCE_BROKER_MANAGEMENT: `${ADMIN_BASE}/finance-broker-management`,
  INSURANCE_MANAGEMENT: `${ADMIN_BASE}/insurance-management`,

  // People Management — Platform User
  USER_MGMT: `${ADMIN_BASE}/user-mgmt`,

  // Team
  ADMINS: `${ADMIN_BASE}/admins`,

  // Customer landing pages
  PEOPLE_ACCESS: `${ADMIN_BASE}/customer-access`,
  PEOPLE_MANAGEMENT: `${ADMIN_BASE}/customer-management`,

  // Supporting
  PROFILE: `${ADMIN_BASE}/profile`,
  CREATE_NEW: `${ADMIN_BASE}/create-new-user`,
  CREATE_CUSTOMER: `${ADMIN_BASE}/create-customer`,
  CREATE_CUSTOMER_TYPE: `${ADMIN_BASE}/create-customer/:type`,
  CUSTOMER_APPROVALS: `${ADMIN_BASE}/customer-approvals`,

  // User Detail
  USER_DETAIL: `${ADMIN_BASE}/user/:id`,
  CUSTOMER_DETAIL: `${ADMIN_BASE}/customer/:id`,

  // Ticket / Incident Management
  INCIDENT_DETAIL: `${ADMIN_BASE}/incident/:number`,
  TICKET_DETAIL: `${ADMIN_BASE}/ticket/:number`,
  INCIDENT_MANAGEMENT: `${ADMIN_BASE}/incident-management`,
  CREATE_MANAGEMENT: `${ADMIN_BASE}/create-management`,
  CREATE_MANAGEMENT_TYPE: `${ADMIN_BASE}/create-management/:type`,
  CREATE_TICKET_TYPE: `${ADMIN_BASE}/:type`,
  SUGGESTED_SOLUTION: `${ADMIN_BASE}/suggested-solution`,
  CONFIGURATION: `${ADMIN_BASE}/configuration`,
  ROLE_REQUESTS: `${ADMIN_BASE}/people-requests`,
};

const ConsultantPath = {
  PEOPLE_ACCESS: `${CONSULTANT_BASE}/customer-access`,
  PEOPLE_MANAGEMENT: `${CONSULTANT_BASE}/customer-management`,

  MOBILITY_ACCESS: `${CONSULTANT_BASE}/mobility-access`,
  LOGISTICS_ACCESS: `${CONSULTANT_BASE}/logistics-access`,
  PARCEL_ACCESS: `${CONSULTANT_BASE}/parcel-access`,

  MOBILITY_BIKE_SCOOTER_ACCESS: `${CONSULTANT_BASE}/mobility-access/bike-scooter`,
  MOBILITY_AUTO_ACCESS: `${CONSULTANT_BASE}/mobility-access/auto`,
  MOBILITY_CAB_ACCESS: `${CONSULTANT_BASE}/mobility-access/cab`,
  MOBILITY_SHUTTLE_ACCESS: `${CONSULTANT_BASE}/mobility-access/shuttle`,

  LOGISTICS_MINI_CARGO_ACCESS: `${CONSULTANT_BASE}/logistics-access/mini-cargo`,
  LOGISTICS_MEDIUM_GOODS_ACCESS: `${CONSULTANT_BASE}/logistics-access/medium-goods`,
  LOGISTICS_HEAVY_TRUCK_ACCESS: `${CONSULTANT_BASE}/logistics-access/heavy-truck`,

  DRIVER_HIRE_ACCESS: `${CONSULTANT_BASE}/driver-hire-access`,
  VEHICLE_RENTAL_ACCESS: `${CONSULTANT_BASE}/vehicle-rental-access`,
  MECHANIC_ACCESS: `${CONSULTANT_BASE}/mechanic-access`,
  PETROL_BUNK_ACCESS: `${CONSULTANT_BASE}/petrol-bunk-access`,
  EV_CHARGING_ACCESS: `${CONSULTANT_BASE}/ev-charging-access`,
  SHOWROOM_ACCESS: `${CONSULTANT_BASE}/showroom-access`,
  VEHICLE_FINANCE_ACCESS: `${CONSULTANT_BASE}/vehicle-finance-access`,
  FINANCE_BROKER_ACCESS: `${CONSULTANT_BASE}/finance-broker-access`,
  INSURANCE_ACCESS: `${CONSULTANT_BASE}/insurance-access`,
  USER_ACCESS: `${CONSULTANT_BASE}/user-access`,
  CUSTOMER_APPROVALS: `${CONSULTANT_BASE}/customer-approvals`,

  MOBILITY_MANAGEMENT: `${CONSULTANT_BASE}/mobility-management`,
  LOGISTICS_MANAGEMENT: `${CONSULTANT_BASE}/logistics-management`,
  PARCEL_MANAGEMENT: `${CONSULTANT_BASE}/parcel-management`,

  MOBILITY_BIKE_SCOOTER_MANAGEMENT: `${CONSULTANT_BASE}/mobility-management/bike-scooter`,
  MOBILITY_AUTO_MANAGEMENT: `${CONSULTANT_BASE}/mobility-management/auto`,
  MOBILITY_CAB_MANAGEMENT: `${CONSULTANT_BASE}/mobility-management/cab`,
  MOBILITY_SHUTTLE_MANAGEMENT: `${CONSULTANT_BASE}/mobility-management/shuttle`,

  LOGISTICS_MINI_CARGO_MANAGEMENT: `${CONSULTANT_BASE}/logistics-management/mini-cargo`,
  LOGISTICS_MEDIUM_GOODS_MANAGEMENT: `${CONSULTANT_BASE}/logistics-management/medium-goods`,
  LOGISTICS_HEAVY_TRUCK_MANAGEMENT: `${CONSULTANT_BASE}/logistics-management/heavy-truck`,

  DRIVER_HIRE_MANAGEMENT: `${CONSULTANT_BASE}/driver-hire-management`,
  VEHICLE_RENTAL_MANAGEMENT: `${CONSULTANT_BASE}/vehicle-rental-management`,
  MECHANIC_MANAGEMENT: `${CONSULTANT_BASE}/mechanic-management`,
  PETROL_BUNK_MANAGEMENT: `${CONSULTANT_BASE}/petrol-bunk-management`,
  EV_CHARGING_MANAGEMENT: `${CONSULTANT_BASE}/ev-charging-management`,
  SHOWROOM_MANAGEMENT: `${CONSULTANT_BASE}/showroom-management`,
  VEHICLE_FINANCE_MANAGEMENT: `${CONSULTANT_BASE}/vehicle-finance-management`,
  FINANCE_BROKER_MANAGEMENT: `${CONSULTANT_BASE}/finance-broker-management`,
  INSURANCE_MANAGEMENT: `${CONSULTANT_BASE}/insurance-management`,
  USER_MGMT: `${CONSULTANT_BASE}/user-mgmt`,
  USER_MANAGEMENT: `${CONSULTANT_BASE}/user-management`,

  CUSTOMER_DETAIL: `${CONSULTANT_BASE}/customer/:id`,
  CREATE_NEW: `${CONSULTANT_BASE}/create-new-user`,
  PROFILE: `${CONSULTANT_BASE}/profile`,
};

const AuthPath = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
};

/**
 * Combined Path object for auth/shared components.
 * Admin components should use constants.AdminPath.
 * User components should use constants.UserPath.
 */
const Path = {
  DEFAULT_PAGE: '/',
  NOT_FOUND: '*',
  ...AuthPath,
  ...AdminPath,
};

const UserPath = {
  DASHBOARD: `${USER_BASE}/dashboard`,
  FAVOURITES: `${USER_BASE}/favourites`,
  RECENT_ITEMS: `${USER_BASE}/recent-items`,
  INCIDENT_MANAGEMENT: `${USER_BASE}/incident-management`,
  CHANGE_MANAGEMENT: `${USER_BASE}/change-management`,
  PROBLEM_MANAGEMENT: `${USER_BASE}/problem-management`,
};

export const constants = {
  Path,
  AdminPath,
  ConsultantPath,
  AuthPath,
  UserPath,
};
