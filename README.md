# Go Gaadi — Gaadi Platform

A full-stack ride-hailing and mobility platform similar to **Uber, Rapido, and Ola** — built as a monorepo with React (Admin Web), Express backend, shared TypeScript interfaces, and multi-role support.

[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-green.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.4-purple.svg)](https://www.prisma.io/)
[![NX](https://img.shields.io/badge/NX-22.4-143055.svg)](https://nx.dev/)

---

## What is Go Gaadi?

Go Gaadi is a mobility-as-a-service platform where:

- **Users** request rides, hire drivers, or rent vehicles
- **Consultants** are verified drivers who fulfill ride and service requests
- **Admins** manage the entire platform — users, captains, bookings, and content

Think of it as the backend operations layer for a company like Rapido or Ola — where admins control who can drive, approve requests, manage fleets, and monitor platform activity.

---

## Table of Contents

- [Roles & Access](#roles--access)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Admin Panel Routes](#admin-panel-routes)
- [API Endpoints](#api-endpoints)
- [Technology Stack](#technology-stack)
- [Development Commands](#development-commands)
- [Troubleshooting](#troubleshooting)

---

## Roles & Access

| Role | Who They Are | What They Can Do |
|------|-------------|-----------------|
| **Admin** | Platform operator | Full control — manage users, captains, bookings, content, approvals |
| **Consultant** | Driver / service provider | Accept trips, manage their profile and availability |
| **User** | Passenger / customer | Request rides, hire drivers, rent vehicles |

### How roles work

1. A new person signs up — they start as a **User** by default
2. If they want to be a **Consultant**, they submit a role request
3. An **Admin** reviews and approves or rejects the request
4. Once approved as Consultant, they can accept bookings

---

## Key Features

### For Users
- Request a ride or trip
- Hire a driver (for personal/business use)
- Rent a vehicle
- View booking history
- Manage their profile

### For Consultants
- Receive and accept ride/hire requests
- View their assigned trips
- Manage availability
- Build their consultant profile (vehicle, role, SLA calendar)

### For Admins

**Governance**
- Dashboard with live platform statistics
- Audit trails — full history of every action taken
- Events monitoring
- Access request approvals (role change requests)

**People & Organizations**
- Customer Management — create, edit, activate/deactivate users
- Consultant Management — approve captains, view consultant profiles
- Driver Hire requests — match users with available drivers
- Vehicle Rental requests — assign vehicles to rental requests
- Organizations — manage partner or corporate accounts

**Platform Content**
- Fast Tag Requests — manage toll/fast tag applications
- Subscriptions — manage platform subscription plans
- Collections — curated groups of services or routes
- Categories — organize service types

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+ (or use Docker)
- Redis 7+ (or use Docker)
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd gogaadi

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database with test data
npm run prisma:seed
```

### Default Test Accounts (after seeding)

```
admin@gogaadi.in    / admin123     → Admin role
consultant@gogaadi.in  / consultant123   → Consultant role
user@gogaadi.in     / user123      → User role
```

---

## Project Structure

```
gogaadi/
├── gateways/                     # Backend (Express API)
│   ├── api/
│   │   ├── admin/                # Admin API routes
│   │   ├── auth/                 # Auth routes (signin, signup, OTP)
│   │   ├── user/                 # User API routes
│   │   └── consultant/              # Consultant API routes
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   ├── seed.ts               # Seed data
│   │   └── migrations/
│   └── src/
│       ├── app.ts                # Express app
│       └── server.ts             # Server entry
│
├── libs/                         # Shared libraries
│   ├── entities/                 # TypeScript interfaces (shared FE + BE)
│   │   ├── interfaces/
│   │   └── validations/          # Yup schemas
│   ├── core/                     # Backend-only logic
│   │   ├── use-cases/            # Business logic (one class per operation)
│   │   └── infrastructure/       # Prisma & InMemory gateway implementations
│   ├── ui/                       # Frontend-only code
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/
│   │   │   ├── admin/            # Admin panel pages
│   │   │   ├── user/             # User-facing pages
│   │   │   └── shared/           # Auth pages (signin, signup)
│   │   ├── hooks/
│   │   └── store/                # Redux store + slices
│   ├── services/                 # RTK Query API services
│   ├── theme/                    # MUI theme system
│   └── shared/constants/         # Route paths and app constants
│
├── web/                          # Frontend application entry
│   └── src/
│       ├── app.tsx               # Root with routing
│       └── app/routes.ts         # Lazy-loaded route definitions
│
├── env/src/                      # Environment configs
├── docker-compose.yml            # PostgreSQL + Redis
└── tsconfig.base.json
```

---

## Running the App

```bash
# Start backend API — http://localhost:3001
npm run dev:backend

# Start admin web app — http://localhost:1600
npm run serve:administration

# Start Storybook (component library preview)
npm run storybook               # http://localhost:6006
```

| App | URL |
|-----|-----|
| Admin Web | http://localhost:1600 |
| Backend API | http://localhost:3001 |
| Storybook | http://localhost:6006 |

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Server
NODE_ENV=development
PORT=3001
HOST=localhost

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/gogaadi_db?schema=public

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# CORS
CORS_ORIGIN=http://localhost:1600

# Email (for OTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=gogaadi <noreply@gogaadi.in>
```

> **Dev tip:** In `NODE_ENV=development`, OTPs are printed to the console — you don't need real SMTP to test sign-up or password reset.

### Gmail App Password (for SMTP)
1. Enable 2FA on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Generate a password for "Mail" and paste it as `SMTP_PASS`

---

## Docker Setup

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

| Service | Port |
|---------|------|
| PostgreSQL (`gogaadi_db`) | 5432 |
| Redis | 6379 |

---

## Admin Panel Routes

| Route | Page |
|-------|------|
| `/admin/dashboard` | Overview with live stats |
| `/admin/audit-trails` | Full action history log |
| `/admin/events` | Platform events |
| `/admin/access-request` | Role change approvals |
| `/admin/users` | All registered users |
| `/admin/captains` | Consultant profiles |
| `/admin/driver-hire` | Driver hire requests |
| `/admin/vehicle-rental` | Vehicle rental requests |
| `/admin/user-management` | Create/edit/deactivate users |
| `/admin/organizations` | Corporate accounts |
| `/admin/tags` | Fast tag requests |
| `/admin/subscriptions` | Subscription plans |
| `/admin/collections` | Service collections |
| `/admin/categories` | Service categories |
| `/admin/profile` | Admin profile |
| `/admin/settings` | System settings |

---

## API Endpoints

### Auth (`/api/auth/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register new user |
| POST | `/signin` | Sign in |
| POST | `/forgot-password` | Request OTP for password reset |
| POST | `/verify-otp` | Verify OTP |
| POST | `/reset-password` | Set new password |

### Admin Auth Actions (`/api/auth/action`)

All admin user/consultant management flows go through a single action endpoint:

| Action | Description |
|--------|-------------|
| `get-all-users` | List all users |
| `create-user` | Create a new user |
| `update-user` | Edit user details |
| `activate-user` / `deactivate-user` | Toggle user access |
| `get-pending-role-requests` | Get pending consultant/admin requests |
| `approve-role-request` / `reject-role-request` | Handle role requests |
| `get-consultant-profiles` | List consultant profiles |
| `get-driver-hire-requests` | List driver hire requests |
| `match-driver-hire` / `reject-driver-hire` | Process driver hire |
| `get-vehicle-rental-requests` | List vehicle rental requests |
| `assign-vehicle-rental` / `reject-vehicle-rental` | Process vehicle rental |
| `get-login-logs` | View login activity |
| `reset-user-password` | Force reset a user's password |
| `generate-temp-password` | Send temporary password via email |

---

## Technology Stack

### Backend

| | Technology | Purpose |
|--|------------|---------|
| Server | Express.js 4.18 | REST API |
| Database | PostgreSQL 15 | Data storage |
| ORM | Prisma 7.4 | DB access |
| Cache | Redis 7 | Sessions & performance |
| Auth | JWT | Stateless authentication |
| Realtime | Socket.IO 4.8 | Live updates |
| Payments | Razorpay | In-app transactions |
| Push | Firebase Admin | Notifications |
| Email | Nodemailer | OTPs & transactional mail |
| Language | TypeScript 5.9 | Type safety |

### Frontend

| | Technology | Purpose |
|--|------------|---------|
| Framework | React 19 | Admin UI |
| UI | MUI v7 | Component library |
| State | Redux Toolkit | Global state |
| Forms | Formik + Yup | Form handling |
| Styling | Emotion + tss-react | CSS-in-JS |
| Charts | ApexCharts | Dashboard analytics |
| Maps | Google Maps | Route & tracking |
| Routing | React Router 6 | Page navigation |

### Tooling

| | Technology |
|--|------------|
| Monorepo | NX 22.4 |
| Build | Webpack 5 |
| Testing | Jest 30 |
| Components | Storybook 10 |
| Linting | ESLint 9 |
| Formatting | Prettier 3 |
| Git Hooks | Husky 9 |

---

## Development Commands

```bash
# Backend
npm run dev:backend              # Start with hot reload
npm run build:backend            # Build

# Frontend
npm run serve:administration     # Dev server (port 1600)
npm run build:administration     # Production build

# Database
npm run prisma:generate          # Generate Prisma client
npm run prisma:migrate           # Push schema to DB (dev)
npm run prisma:seed              # Seed test data
npm run prisma:studio            # Open Prisma Studio GUI
npm run prisma:reset             # Wipe and recreate DB
npm run prisma:deploy            # Apply migrations (production)

# Quality
npm run lint                     # Lint
npm run lint:fix                 # Auto-fix lint
npm run format                   # Format with Prettier
npm run type-check               # TypeScript check
npm run validate                 # Format + Lint + Type check
npm test                         # Run all tests
```

---

## Troubleshooting

**OTP not received**
- In dev mode, OTP prints to the terminal — no email needed
- For real emails, check `SMTP_*` values in `.env`

**Database won't connect**
```bash
docker-compose up -d             # Make sure containers are running
npm run prisma:migrate           # Re-run migrations
```

**Build errors after pulling changes**
```bash
rm -rf node_modules .nx dist
npm install
npm run prisma:generate
```

**Port already in use**
```bash
# Windows
netstat -ano | findstr :1600
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:1600 | xargs kill -9
```

**NX cache issues**
```bash
npx nx reset
```

---

## License

MIT

---

**Last Updated:** March 2026


# gogaadi Platform - Postman API Testing Guide

## Base URL

```
http://localhost:3001
```

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

### How to Get a Token

**POST** `/api/auth`

```json
{
  "action": "signin",
  "email": "admin@gogaadi.in",
  "password": "admin123"
}
```

**Response (201):**

```json
{
  "message": "Sign in successful",
  "data": {
    "user": {
      "userId": 1,
      "userName": "Admin User",
      "userEmail": "admin@gogaadi.in",
      "role": "admin",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Seeded Test Users

| Email | Password | Role |
|-------|----------|------|
| `admin@gogaadi.in` | `admin123` | admin |
| `user@gogaadi.in` | `user123` | user |
| `consultant@gogaadi.in` | `consultant123` | consultant |

---

## Health Check

**GET** `/health`

No auth required.

**Response (200):**

```json
{
  "status": "OK",
  "timestamp": "2025-02-12T10:00:00.000Z"
}
```

---

## Auth Endpoints

All auth endpoints use a single **POST** `/api/auth` with an `action` field.

### Sign Up

```json
{
  "action": "signup",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "phone": "+1-555-0000",
  "workLocation": "NYC",
  "department": "IT",
  "reasonForAccess": "Support ticket handling",
  "employeeId": "EMP123",
  "businessUnit": "Operations",
  "managerName": "Jane Smith",
  "role": "user"
}
```

**Response (201):**

```json
{
  "message": "Account created successfully. Your account is pending admin approval.",
  "data": {
    "user": { "...sanitized user object..." },
    "roleRequestPending": true
  }
}
```

### Forgot Password

```json
{
  "action": "forgot-password",
  "email": "user@example.com"
}
```

**Response (200):**

```json
{
  "message": "If the email exists, an OTP has been sent."
}
```

### Verify OTP

```json
{
  "action": "verify-otp",
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response (200):**

```json
{
  "message": "OTP verified successfully",
  "data": {
    "verified": true,
    "resetToken": "jwt-reset-token"
  }
}
```

### Reset Password

```json
{
  "action": "reset-password",
  "email": "user@example.com",
  "resetToken": "jwt-reset-token",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response (200):**

```json
{
  "message": "Password reset successfully. You can now sign in with your new password."
}
```

### Change Password (Requires Auth)

```json
{
  "action": "change-password",
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

### Get All Users (Admin Only)

```json
{
  "action": "get-all-users"
}
```

**Response (200):**

```json
{
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "firstName": "Admin",
      "lastName": "User",
      "name": "Admin User",
      "email": "admin@gogaadi.in",
      "role": "admin",
      "isActive": true,
      "status": "approved",
      "department": "IT",
      "workLocation": "HQ",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single User (Admin Only)

```json
{
  "action": "get-user",
  "userId": 1
}
```

### Update User (Admin Only)

```json
{
  "action": "update-user",
  "userId": 1,
  "data": {
    "firstName": "Updated",
    "lastName": "Name",
    "name": "Updated Name",
    "email": "updated@example.com",
    "phone": "+1-555-9999",
    "role": "admin",
    "isActive": true,
    "workLocation": "Remote",
    "department": "Engineering",
    "employeeId": "EMP456",
    "businessUnit": "Tech",
    "managerName": "Boss Name",
    "dateOfBirth": "1990-01-15",
    "profilePicture": "https://example.com/photo.jpg",
    "adminNotes": "Approved for elevated access"
  }
}
```

### Delete User (Admin Only)

```json
{
  "action": "delete-user",
  "userId": 2
}
```

### Unlock User (Admin Only)

```json
{
  "action": "unlock-user",
  "userId": 2
}
```

### Get Role Requests (Admin Only)

```json
{
  "action": "get-role-requests"
}
```

### Get Pending Role Requests (Admin Only)

```json
{
  "action": "get-pending-role-requests"
}
```

### Approve Role Request (Admin Only)

```json
{
  "action": "approve-role-request",
  "userId": 2,
  "adminNotes": "Approved - meets requirements"
}
```

### Reject Role Request (Admin Only)

```json
{
  "action": "reject-role-request",
  "userId": 2,
  "adminNotes": "Insufficient justification"
}
```

---

## Incident Endpoints

All incident endpoints require auth. Base path: `/api/admin/incidents`

### Get All Incidents

**GET** `/api/admin/incidents`

**Response (200):**

```json
{
  "message": "Incidents retrieved successfully",
  "data": [
    {
      "id": 1,
      "number": "INC0000001",
      "caller": "John Doe",
      "shortDescription": "Printer not working",
      "status": "new",
      "priority": "3-Medium",
      "impact": "medium",
      "urgency": "medium",
      "createdAt": "2025-02-12T10:00:00Z"
    }
  ]
}
```

### Get Draft Incidents

**GET** `/api/admin/incidents/drafts`

### Get Incident by ID

**GET** `/api/admin/incidents/:id`

### Get Incident by Number

**GET** `/api/admin/incidents/number/:number`

Example: `GET /api/admin/incidents/number/INC0000001`

### Create Incident

**POST** `/api/admin/incidents`

```json
{
  "number": "INC0000001",
  "caller": "John Doe",
  "businessCategory": "IT Support",
  "serviceLine": "Hardware",
  "application": "Windows",
  "shortDescription": "Printer not working",
  "description": "Network printer on floor 3 is not responding",
  "impact": "medium",
  "urgency": "medium",
  "channel": "portal",
  "assignmentGroup": "IT Support Team",
  "createdBy": "admin@gogaadi.in",
  "status": "new",
  "client": "Acme Corp",
  "callerPhone": "+1-555-0000",
  "callerEmail": "john@acme.com",
  "callerLocation": "Floor 3",
  "callerDepartment": "Finance",
  "primaryResource": "Mike Johnson",
  "isRecurring": false,
  "isMajor": false
}
```

**Required fields:** `caller`, `businessCategory`, `serviceLine`, `application`, `shortDescription`, `description`, `impact`, `urgency`, `channel`, `assignmentGroup`, `createdBy`

**For drafts**, only `caller` and `createdBy` are required. Set `status` to `"draft"` and optionally include `draftExpiresAt`.

### Update Incident

**PUT** `/api/admin/incidents/:id`

All fields are optional:

```json
{
  "status": "in_progress",
  "priority": "2-High",
  "assignmentGroup": "Escalation Team",
  "primaryResource": "Senior Engineer"
}
```

### Delete Incident

**DELETE** `/api/admin/incidents/:id`

---

## Comment Endpoints

Base path: `/api/admin/incidents/:id/comments`

### Get Comments

**GET** `/api/admin/incidents/:id/comments`

### Create Comment

**POST** `/api/admin/incidents/:id/comments`

```json
{
  "subject": "Follow-up needed",
  "message": "User confirmed the issue persists after initial fix attempt",
  "isInternal": false,
  "isSelfNote": false,
  "notifyAssigneesOnly": false,
  "status": "in_progress",
  "createdBy": "admin@gogaadi.in"
}
```

**Required fields:** `subject`, `message`

---

## Time Entry Endpoints

Base path: `/api/admin/incidents/:id/time-entries`

### Get Time Entries

**GET** `/api/admin/incidents/:id/time-entries`

### Create Time Entry

**POST** `/api/admin/incidents/:id/time-entries`

```json
{
  "date": "2025-02-12",
  "hours": 2,
  "minutes": 30,
  "billingCode": "PROJECT-001",
  "activityTask": "Troubleshooting printer drivers",
  "externalComment": "Investigated driver compatibility",
  "internalComment": "Need to escalate to vendor",
  "isNonBillable": false,
  "createdBy": "admin@gogaadi.in"
}
```

**Required fields:** `date`, `hours`, `minutes`

---

## Resolution Endpoints

Base path: `/api/admin/incidents/:id/resolutions`

### Get Resolutions

**GET** `/api/admin/incidents/:id/resolutions`

### Create Resolution

**POST** `/api/admin/incidents/:id/resolutions`

```json
{
  "resolutionCode": "permanent_fix",
  "resolution": "Updated printer drivers to latest version, tested successfully",
  "application": "Windows",
  "category": "Hardware Issue",
  "subCategory": "Printer",
  "customerConfirmation": true,
  "isRecurring": false,
  "rootCauseIdentified": true,
  "rootCause": "Outdated printer drivers caused compatibility issue",
  "internalNote": "Recommend updating all printers on floor 3",
  "createdBy": "admin@gogaadi.in"
}
```

**Required fields:** `resolutionCode`, `resolution`

**Resolution Code values:** `permanent_fix`, `workaround`, `known_error`, `duplicate`, `not_reproducible`, `user_error`, `configuration_change`, `software_update`, `hardware_replacement`, `third_party_fix`, `other`

---

## Activity Endpoints

### Get Activities

**GET** `/api/admin/incidents/:id/activities`

Returns the audit log for an incident (read-only).

**Response (200):**

```json
{
  "message": "Activities retrieved successfully",
  "data": [
    {
      "id": 1,
      "incidentId": 1,
      "activityType": "status_change",
      "description": "Status changed from new to in_progress",
      "previousValue": "new",
      "newValue": "in_progress",
      "performedBy": "admin@gogaadi.in",
      "createdAt": "2025-02-12T10:00:00Z"
    }
  ]
}
```

---

## Ticket Type Endpoints

Base path: `/api/admin/ticket-type`

### Get All Ticket Types

**GET** `/api/admin/ticket-type`

### Get Ticket Type by ID

**GET** `/api/admin/ticket-type/:id`

### Create Ticket Type

**POST** `/api/admin/ticket-type`

```json
{
  "type": "incident",
  "name": "Incident"
}
```

### Update Ticket Type

**PUT** `/api/admin/ticket-type/:id`

```json
{
  "name": "Updated Name"
}
```

### Delete Ticket Type

**DELETE** `/api/admin/ticket-type/:id`

---

## Enum Reference

### Impact
`high`, `medium`, `low`

### Urgency
`high`, `medium`, `low`

### Priority (auto-calculated from Impact x Urgency)
`1-Critical`, `2-High`, `3-Medium`, `4-Low`, `5-Planning`

### Channel
`email`, `phone`, `portal`, `chat`, `walk_in`

### Status
`draft`, `new`, `in_progress`, `on_hold`, `assigned`, `resolved`, `closed`, `cancelled`

### Activity Types
`status_change`, `priority_change`, `assignment_change`, `comment_added`, `time_entry_added`, `resolution_added`, `attachment_added`, `field_update`, `follow_added`, `escalation`

---

## Error Responses

| Status | Description | Example |
|--------|-------------|---------|
| 400 | Validation error | `{ "message": "Validation failed", "errors": [...] }` |
| 401 | Unauthorized | `{ "message": "Access token is required" }` |
| 403 | Forbidden | `{ "message": "Admin access required" }` |
| 404 | Not found | `{ "message": "Incident not found" }` |
| 409 | Conflict | `{ "message": "Email already registered" }` |
| 423 | Locked | `{ "message": "Account is locked. Try again after X minutes." }` |
| 429 | Rate limited | `{ "message": "OTP already sent. Wait X minutes." }` |

---

## Postman Setup Tips

1. **Create an environment** with variable `baseUrl` = `http://localhost:3001`
2. **Add a pre-request script** to the Sign In request to auto-save the token:
   ```javascript
   if (pm.response.code === 201) {
     const data = pm.response.json();
     pm.environment.set("token", data.data.token);
   }
   ```
3. **Set the Authorization header** on your collection to `Bearer {{token}}`
4. Use `{{baseUrl}}` in all request URLs
