import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Typography,
  Alert,
  Snackbar,
  LinearProgress,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HailIcon from '@mui/icons-material/Hail';
import CarRentalIcon from '@mui/icons-material/CarRental';
import BuildIcon from '@mui/icons-material/Build';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TuneIcon from '@mui/icons-material/Tune';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EvStationIcon from '@mui/icons-material/EvStation';
import StoreIcon from '@mui/icons-material/Store';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SecurityIcon from '@mui/icons-material/Security';
import BusinessIcon from '@mui/icons-material/Business';
import { Box, Button } from '@gogaadi/component';
import { useAuth, useFieldError } from '@gogaadi/hooks';
import { useAuthActionMutation } from '@gogaadi/services';
import { constants } from '@gogaadi/utils';

import InlineSelect from './components/InlineSelect';
import {
  CITY_AREA_MAP,
  CITY_OPTIONS,
  MOBILITY_VEHICLES,
  LOGISTICS_VEHICLES,
  HIRE_SHIFT_OPTIONS,
  RENTAL_DURATION_OPTIONS,
  VEHICLE_CONFIG,
} from './constants/createCustomer.constants';

// ─── Type config ──────────────────────────────────────────────────────────────

type SimpleType =
  | 'user'
  | 'driver-hire'
  | 'vehicle-rental'
  | 'mechanic-hire'
  | 'petrol-bunk'
  | 'ev-charging'
  | 'showroom'
  | 'vehicle-finance'
  | 'finance-broker'
  | 'insurance-partner';

const TYPE_CONFIG: Record<
  SimpleType,
  {
    label: string;
    tagline: string;
    gradient: string;
    shadow: string;
    color: string;
    Icon: React.ElementType;
    serviceCategory: string;
    bundleTypes: string[];
  }
> = {
  user: {
    label: 'Platform User',
    tagline: 'App User Registration',
    gradient: 'linear-gradient(135deg, #9d174d 0%, #be185d 50%, #ec4899 100%)',
    shadow: '0 8px 32px rgba(190,24,93,0.35)',
    color: '#be185d',
    Icon: PersonAddIcon,
    serviceCategory: 'user',
    bundleTypes: [],
  },
  'driver-hire': {
    label: 'Driver Hire',
    tagline: 'Dedicated Driver Services',
    gradient: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #4ade80 100%)',
    shadow: '0 8px 32px rgba(22,163,74,0.35)',
    color: '#16a34a',
    Icon: HailIcon,
    serviceCategory: 'mobility',
    bundleTypes: ['driver_hire'],
  },
  'vehicle-rental': {
    label: 'Vehicle Rental',
    tagline: 'Self-Drive & Rentals',
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #a78bfa 100%)',
    shadow: '0 8px 32px rgba(124,58,237,0.35)',
    color: '#7c3aed',
    Icon: CarRentalIcon,
    serviceCategory: 'mobility',
    bundleTypes: ['rental'],
  },
  'mechanic-hire': {
    label: 'Mechanic Hire',
    tagline: 'On-Demand Roadside Repair',
    gradient: 'linear-gradient(135deg, #431407 0%, #78350f 50%, #92400e 100%)',
    shadow: '0 8px 32px rgba(120,53,15,0.35)',
    color: '#78350f',
    Icon: BuildIcon,
    serviceCategory: 'mechanic',
    bundleTypes: [],
  },
  'petrol-bunk': {
    label: 'Petrol Bunk',
    tagline: 'Fuel Station Partner',
    gradient: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ef4444 100%)',
    shadow: '0 8px 32px rgba(220,38,38,0.35)',
    color: '#dc2626',
    Icon: LocalGasStationIcon,
    serviceCategory: 'petrol-bunk',
    bundleTypes: [],
  },
  'ev-charging': {
    label: 'EV Charging Station',
    tagline: 'Electric Vehicle Charging Partner',
    gradient: 'linear-gradient(135deg, #047857 0%, #059669 50%, #34d399 100%)',
    shadow: '0 8px 32px rgba(5,150,105,0.35)',
    color: '#059669',
    Icon: EvStationIcon,
    serviceCategory: 'ev-charging',
    bundleTypes: [],
  },
  showroom: {
    label: 'Vehicle Showroom',
    tagline: 'Dealership & Sales Partner',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)',
    shadow: '0 8px 32px rgba(29,78,216,0.35)',
    color: '#1d4ed8',
    Icon: StoreIcon,
    serviceCategory: 'showroom',
    bundleTypes: [],
  },
  'vehicle-finance': {
    label: 'Vehicle Finance',
    tagline: 'Auto Loan & Finance Provider',
    gradient: 'linear-gradient(135deg, #6b21a8 0%, #9333ea 50%, #c084fc 100%)',
    shadow: '0 8px 32px rgba(147,51,234,0.35)',
    color: '#9333ea',
    Icon: AccountBalanceIcon,
    serviceCategory: 'vehicle-finance',
    bundleTypes: [],
  },
  'finance-broker': {
    label: 'Finance Broker',
    tagline: 'DSA & Loan Agent Partner',
    gradient: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)',
    shadow: '0 8px 32px rgba(15,118,110,0.35)',
    color: '#0f766e',
    Icon: HandshakeIcon,
    serviceCategory: 'finance-broker',
    bundleTypes: [],
  },
  'insurance-partner': {
    label: 'Insurance Partner',
    tagline: 'Vehicle & Driver Insurance Provider',
    gradient: 'linear-gradient(135deg, #14532d 0%, #166534 50%, #16a34a 100%)',
    shadow: '0 8px 32px rgba(22,101,52,0.35)',
    color: '#166534',
    Icon: SecurityIcon,
    serviceCategory: 'insurance-partner',
    bundleTypes: [],
  },
};

const VEHICLE_OPTIONS = MOBILITY_VEHICLES.map((v) => ({
  id: v,
  label: VEHICLE_CONFIG[v]?.label ?? v,
}));

const MECHANIC_VEHICLE_OPTIONS = [
  { id: 'bike', label: 'Bike / Scooter' },
  { id: 'auto', label: 'Auto Rickshaw' },
  { id: 'car', label: 'Car' },
  { id: 'van', label: 'Van / Mini Van' },
  { id: 'truck', label: 'Truck / Lorry' },
  { id: 'bus', label: 'Bus' },
];

const MECHANIC_ISSUE_OPTIONS = [
  { id: 'flat_tyre', label: 'Flat Tyre / Puncture' },
  { id: 'dead_battery', label: 'Dead Battery / Jump Start' },
  { id: 'engine_failure', label: 'Engine Failure' },
  { id: 'overheating', label: 'Engine Overheating' },
  { id: 'brake_issue', label: 'Brake Issue' },
  { id: 'fuel_empty', label: 'Fuel Empty / Refuel' },
  { id: 'electrical', label: 'Electrical / Wiring Issue' },
  { id: 'other', label: 'Other / General Repair' },
];

// ─── Form state ───────────────────────────────────────────────────────────────

type StringKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T];

interface SimpleForm {
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  emergencyContact: string;
  email: string;
  aadharCard: string;
  city: string;
  area: string;
  pincode: string;
  // driver-hire specific
  selectedVehicles: string[];
  vehicleBudgets: Record<string, string>;
  driverHireShift: string;
  // vehicle-rental specific
  rentalVehiclePref: string;
  rentalDuration: string;
  vehicleImage: string;
  costPerDay: string;
  // mechanic-hire specific
  mechanicVehicleType: string;
  mechanicIssueType: string;
  // partner (business) types common
  businessName: string;
  gstNumber: string;
  // petrol-bunk specific
  fuelTypesAvailable: string[];
  // ev-charging specific
  chargerTypes: string[];
  numChargers: string;
  // showroom specific
  vehicleBrands: string;
  showroomType: string;
  // vehicle-finance / finance-broker specific
  loanTypes: string[];
  minLoanAmount: string;
  maxLoanAmount: string;
  // insurance-partner specific
  insuranceCoverage: string[];
  insuranceCompany: string;
}

const GENDER_OPTIONS = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' },
  { id: 'prefer_not_to_say', label: 'Prefer not to say' },
];

const INITIAL_FORM: SimpleForm = {
  firstName: '',
  lastName: '',
  gender: '',
  phone: '',
  emergencyContact: '',
  email: '',
  aadharCard: '',
  city: '',
  area: '',
  pincode: '',
  selectedVehicles: [],
  vehicleBudgets: {},
  driverHireShift: '',
  rentalVehiclePref: '',
  rentalDuration: '',
  vehicleImage: '',
  costPerDay: '',
  mechanicVehicleType: '',
  mechanicIssueType: '',
  businessName: '',
  gstNumber: '',
  fuelTypesAvailable: [],
  chargerTypes: [],
  numChargers: '',
  vehicleBrands: '',
  showroomType: '',
  loanTypes: [],
  minLoanAmount: '',
  maxLoanAmount: '',
  insuranceCoverage: [],
  insuranceCompany: '',
};

const PARTNER_TYPES = [
  'petrol-bunk',
  'ev-charging',
  'showroom',
  'vehicle-finance',
  'finance-broker',
  'insurance-partner',
] as const;
type PartnerType = (typeof PARTNER_TYPES)[number];
const isPartnerType = (t: string): t is PartnerType =>
  PARTNER_TYPES.includes(t as PartnerType);

const FUEL_TYPE_OPTIONS = [
  { id: 'petrol', label: 'Petrol' },
  { id: 'diesel', label: 'Diesel' },
  { id: 'cng', label: 'CNG' },
  { id: 'ev', label: 'EV Charging' },
];

const CHARGER_TYPE_OPTIONS = [
  { id: 'ac_slow', label: 'AC Slow Charger (3.3–7.4 kW)' },
  { id: 'ac_fast', label: 'AC Fast Charger (11–22 kW)' },
  { id: 'dc_fast', label: 'DC Fast Charger (50 kW+)' },
  { id: 'dc_rapid', label: 'DC Rapid Charger (150 kW+)' },
];

const SHOWROOM_TYPE_OPTIONS = [
  { id: 'new', label: 'New Vehicles Only' },
  { id: 'used', label: 'Used / Pre-owned Vehicles' },
  { id: 'both', label: 'New & Used Vehicles' },
];

const LOAN_TYPE_OPTIONS = [
  { id: 'new_vehicle', label: 'New Vehicle Loan' },
  { id: 'used_vehicle', label: 'Used Vehicle Loan' },
  { id: 'top_up', label: 'Top-up / Balance Transfer' },
  { id: 'refinance', label: 'Refinancing' },
];

const INSURANCE_COVERAGE_OPTIONS = [
  { id: 'third_party', label: 'Third-Party Liability' },
  { id: 'comprehensive', label: 'Comprehensive Vehicle' },
  { id: 'commercial', label: 'Commercial Vehicle' },
  { id: 'health', label: 'Driver Health Cover' },
  { id: 'accident', label: 'Personal Accident Cover' },
  { id: 'cargo', label: 'Goods / Cargo Insurance' },
];

// ─── Section wrapper ──────────────────────────────────────────────────────────

interface SectionProps {
  icon: React.ElementType;
  label: string;
  color: string;
  children: React.ReactNode;
}

const Section = ({ icon: Icon, label, color, children }: SectionProps) => (
  <Box
    sx={{
      border: `1px solid ${color}22`,
      borderLeft: `4px solid ${color}`,
      borderRadius: '14px',
      overflow: 'hidden',
      backgroundColor: 'background.paper',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2.5,
        py: 1.5,
        background: `${color}0d`,
        borderBottom: `1px solid ${color}18`,
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: '8px',
          background: `linear-gradient(135deg, ${color}bb, ${color})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: 15, color: '#fff' }} />
      </Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: '0.82rem',
          color,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </Typography>
    </Box>
    <Box sx={{ p: 2.5 }}>{children}</Box>
  </Box>
);

// ─── Main component ───────────────────────────────────────────────────────────

const CreateSimpleForm = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { AdminPath } = constants;
  const { user } = useAuth();
  const [authAction] = useAuthActionMutation();

  const simpleType = (type as SimpleType) in TYPE_CONFIG ? (type as SimpleType) : 'user';
  const config = TYPE_CONFIG[simpleType];
  const { Icon } = config;
  const DRAFT_KEY = `simple_draft_${simpleType}`;

  const [userId] = useState<string>(() => {
    const PREFIX_MAP: Record<SimpleType, string> = {
      user: 'USER',
      'driver-hire': 'DHIRE',
      'vehicle-rental': 'VRENT',
      'mechanic-hire': 'MHIRE',
      'petrol-bunk': 'PFUEL',
      'ev-charging': 'EVCHG',
      showroom: 'SHOWRM',
      'vehicle-finance': 'VFIN',
      'finance-broker': 'FBRK',
      'insurance-partner': 'INSUR',
    };
    const prefix = PREFIX_MAP[simpleType] ?? 'CUST';
    const storageKey = `customer_uid_${simpleType}`;
    const stored = window.localStorage.getItem(storageKey);
    if (stored && stored.startsWith(prefix)) return stored;
    const id = `${prefix}${String(Math.floor(10000 + Math.random() * 90000))}`;
    window.localStorage.setItem(storageKey, id);
    return id;
  });

  const [form, setForm] = useState<SimpleForm>(() => {
    try {
      const stored = window.localStorage.getItem(DRAFT_KEY);
      if (stored) return { ...INITIAL_FORM, ...JSON.parse(stored) };
    } catch {
      /* ignore */
    }
    return INITIAL_FORM;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const areaOptions = form.city ? (CITY_AREA_MAP[form.city] ?? []) : [];

  // ── Auto-save draft to localStorage ─────────────────────────────────────────
  useEffect(() => {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {
      /* ignore */
    }
  }, [form, DRAFT_KEY]);

  // ── Completion progress ──────────────────────────────────────────────────────
  const REQUIRED_FIELDS_BASE = ['firstName', 'lastName', 'phone', 'email', 'city', 'area'];
  const REQUIRED_FIELDS_EXTRA =
    simpleType === 'driver-hire'
      ? ['driverHireShift']
      : simpleType === 'vehicle-rental'
        ? ['rentalVehiclePref', 'rentalDuration', 'costPerDay']
        : simpleType === 'mechanic-hire'
          ? ['mechanicVehicleType', 'mechanicIssueType']
          : isPartnerType(simpleType)
            ? ['businessName']
            : [];
  const REQUIRED_FIELDS = [...REQUIRED_FIELDS_BASE, ...REQUIRED_FIELDS_EXTRA];

  const vehicleSelectionFilled =
    simpleType === 'driver-hire' ? (form.selectedVehicles.length > 0 ? 1 : 0) : 0;
  const vehicleSelectionTotal = simpleType === 'driver-hire' ? 1 : 0;

  const filledCount =
    REQUIRED_FIELDS.filter((k) => !!(form as unknown as Record<string, unknown>)[k]).length +
    vehicleSelectionFilled;
  const completionPct = Math.round(
    (filledCount / (REQUIRED_FIELDS.length + vehicleSelectionTotal)) * 100,
  );

  const set = (field: StringKeys<SimpleForm>, value: string) => {
    setForm((p) => {
      let next = { ...p, [field]: value };
      if (field === 'city') next = { ...next, area: '', pincode: '' };
      if (field === 'area') {
        const entry = (CITY_AREA_MAP[p.city] ?? []).find((a) => a.area === value);
        next = { ...next, pincode: entry?.pincode ?? '' };
      }
      return next;
    });
    setErrors((p) => {
      const n = { ...p };
      delete n[field];
      return n;
    });
  };

  const toggleVehicle = (vehicleKey: string, checked: boolean) => {
    setForm((p) => {
      const newVehicles = checked
        ? [...p.selectedVehicles, vehicleKey]
        : p.selectedVehicles.filter((v) => v !== vehicleKey);
      const newBudgets = { ...p.vehicleBudgets };
      if (!checked) delete newBudgets[vehicleKey];
      return { ...p, selectedVehicles: newVehicles, vehicleBudgets: newBudgets };
    });
    setErrors((p) => {
      const n = { ...p };
      delete n['selectedVehicles'];
      return n;
    });
  };

  const setVehicleBudget = (vehicleKey: string, value: string) => {
    setForm((p) => ({
      ...p,
      vehicleBudgets: { ...p.vehicleBudgets, [vehicleKey]: value },
    }));
    setErrors((p) => {
      const n = { ...p };
      delete n[`budget_${vehicleKey}`];
      return n;
    });
  };

  const reqError = useFieldError();
  const touch = (field: string) => setTouched((p) => ({ ...p, [field]: true }));
  const fe = (field: string) => reqError(touched[field], errors[field]);

  // ── Validation ──────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (simpleType === 'user' || simpleType === 'mechanic-hire') {
      if (!form.aadharCard.trim()) errs['aadharCard'] = 'Required';
      else if (!/^\d{12}$/.test(form.aadharCard.trim()))
        errs['aadharCard'] = 'Enter valid 12-digit Aadhar number';
    }

    if (!form.firstName.trim()) errs['firstName'] = 'Required';
    if (!form.lastName.trim()) errs['lastName'] = 'Required';
    if (!form.phone.trim()) errs['phone'] = 'Required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/[\s\-+]/g, '')))
      errs['phone'] = 'Enter valid 10-digit mobile number';
    if (!form.email.trim()) errs['email'] = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs['email'] = 'Invalid email';
    if (!form.city) errs['city'] = 'Required';
    if (!form.area) errs['area'] = 'Required';
    if (!form.pincode.trim()) errs['pincode'] = 'Required';
    else if (!/^\d{6}$/.test(form.pincode.trim())) errs['pincode'] = '6-digit pincode required';

    if (simpleType === 'driver-hire') {
      if (form.selectedVehicles.length === 0)
        errs['selectedVehicles'] = 'Select at least one vehicle type';
      form.selectedVehicles.forEach((v) => {
        if (!form.vehicleBudgets[v]?.trim()) errs[`budget_${v}`] = 'Budget per day is required';
      });
      if (!form.driverHireShift) errs['driverHireShift'] = 'Required';
    }

    if (simpleType === 'vehicle-rental') {
      if (!form.rentalVehiclePref) errs['rentalVehiclePref'] = 'Select a vehicle preference';
      if (!form.rentalDuration) errs['rentalDuration'] = 'Required';
      if (!form.costPerDay.trim()) errs['costPerDay'] = 'Required';
      else if (isNaN(Number(form.costPerDay)) || Number(form.costPerDay) <= 0)
        errs['costPerDay'] = 'Enter a valid amount greater than 0';
    }

    if (simpleType === 'mechanic-hire') {
      if (!form.mechanicVehicleType) errs['mechanicVehicleType'] = 'Select a vehicle type';
      if (!form.mechanicIssueType) errs['mechanicIssueType'] = 'Select an issue type';
    }

    if (isPartnerType(simpleType)) {
      if (!form.businessName.trim()) errs['businessName'] = 'Business name is required';
      if (simpleType === 'petrol-bunk' && form.fuelTypesAvailable.length === 0)
        errs['fuelTypesAvailable'] = 'Select at least one fuel type';
      if (simpleType === 'ev-charging' && form.chargerTypes.length === 0)
        errs['chargerTypes'] = 'Select at least one charger type';
      if (simpleType === 'showroom' && !form.showroomType)
        errs['showroomType'] = 'Select showroom type';
      if (
        (simpleType === 'vehicle-finance' || simpleType === 'finance-broker') &&
        form.loanTypes.length === 0
      )
        errs['loanTypes'] = 'Select at least one loan type';
      if (simpleType === 'insurance-partner' && form.insuranceCoverage.length === 0)
        errs['insuranceCoverage'] = 'Select at least one coverage type';
    }

    setErrors(errs);
    const allFields = Object.keys(INITIAL_FORM).filter(
      (k) => k !== 'selectedVehicles' && k !== 'vehicleBudgets',
    );
    const budgetTouches = form.selectedVehicles.map((v) => [`budget_${v}`, true]);
    setTouched(
      Object.fromEntries([
        ...allFields.map((f) => [f, true]),
        ['selectedVehicles', true],
        ...budgetTouches,
      ]),
    );
    return Object.keys(errs).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!validate()) {
      setSnackbar({
        open: true,
        message: 'Please fix the highlighted errors before submitting.',
        severity: 'error',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setIsSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        customerId: userId || null,
        aadharCard:
          simpleType === 'user' || simpleType === 'mechanic-hire'
            ? form.aadharCard.trim() || null
            : undefined,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        gender: form.gender || null,
        phone: form.phone.trim(),
        emergencyContact: form.emergencyContact.trim() || null,
        email: form.email.trim(),
        city: form.city,
        area: form.area,
        pincode: form.pincode.trim(),
        serviceCategory: config.serviceCategory,
        bundleTypes: config.bundleTypes,
        createdByEmail: user?.email || undefined,
        createdByName: user
          ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.name || undefined
          : undefined,
        createdByPhone: user?.phone || undefined,
      };

      if (simpleType === 'driver-hire') {
        payload['selectedVehicles'] = form.selectedVehicles;
        payload['vehicleBudgets'] = form.vehicleBudgets;
        payload['driverHireShift'] = form.driverHireShift;
      }

      if (simpleType === 'vehicle-rental') {
        payload['rentalVehiclePref'] = form.rentalVehiclePref;
        payload['rentalDuration'] = form.rentalDuration;
        payload['vehicleImage'] = form.vehicleImage || null;
        payload['costPerDay'] = form.costPerDay ? Number(form.costPerDay) : null;
      }

      if (simpleType === 'mechanic-hire') {
        payload['mechanicVehicleType'] = form.mechanicVehicleType;
        payload['mechanicIssueType'] = form.mechanicIssueType;
      }

      if (isPartnerType(simpleType)) {
        payload['businessName'] = form.businessName.trim();
        payload['gstNumber'] = form.gstNumber.trim() || null;
        if (simpleType === 'petrol-bunk')
          payload['fuelTypesAvailable'] = form.fuelTypesAvailable;
        if (simpleType === 'ev-charging') {
          payload['chargerTypes'] = form.chargerTypes;
          payload['numChargers'] = form.numChargers ? Number(form.numChargers) : null;
        }
        if (simpleType === 'showroom') {
          payload['showroomType'] = form.showroomType;
          payload['vehicleBrands'] = form.vehicleBrands.trim() || null;
        }
        if (simpleType === 'vehicle-finance' || simpleType === 'finance-broker') {
          payload['loanTypes'] = form.loanTypes;
          payload['minLoanAmount'] = form.minLoanAmount ? Number(form.minLoanAmount) : null;
          payload['maxLoanAmount'] = form.maxLoanAmount ? Number(form.maxLoanAmount) : null;
        }
        if (simpleType === 'insurance-partner') {
          payload['insuranceCoverage'] = form.insuranceCoverage;
          payload['insuranceCompany'] = form.insuranceCompany.trim() || null;
        }
      }

      await authAction({ action: 'create-customer-onboarding', data: payload }).unwrap();

      window.localStorage.removeItem(DRAFT_KEY);
      window.localStorage.removeItem(`customer_uid_${simpleType}`);
      setSnackbar({
        open: true,
        message: `${config.label} customer created successfully!`,
        severity: 'success',
      });
      setTimeout(() => navigate(AdminPath.USER_MANAGEMENT), 1500);
    } catch {
      setSnackbar({
        open: true,
        message: 'Failed to create customer. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => navigate(AdminPath.CREATE_CUSTOMER);

  const handleClearDraft = () => {
    window.localStorage.removeItem(DRAFT_KEY);
    window.localStorage.removeItem(`customer_uid_${simpleType}`);
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {isSubmitting && (
        <LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: 3,
            '& .MuiLinearProgress-bar': { background: config.gradient },
          }}
        />
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 3,
          py: 2.5,
          background: config.gradient,
          boxShadow: config.shadow,
          borderRadius: '16px',
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon sx={{ fontSize: 28, color: '#fff' }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.01em' }}
          >
            Create {config.label} Customer
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
            {config.tagline} — fill in the details below to register
          </Typography>
        </Box>
      </Box>

      {/* ── Personal Information ─────────────────────────────────────────── */}
      <Section icon={PersonOutlineIcon} label='Personal Information' color='#1976d2'>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          {userId && (
            <TextField
              label='Customer ID'
              value={userId}
              size='small'
              fullWidth
              disabled
              InputProps={{ readOnly: true }}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#1976d2',
                  fontWeight: 700,
                },
              }}
            />
          )}
          {(simpleType === 'user' || simpleType === 'mechanic-hire') && (
            <TextField
              label='Aadhar Card Number'
              value={form.aadharCard}
              onChange={(e) => set('aadharCard', e.target.value.replace(/\D/g, ''))}
              onBlur={() => touch('aadharCard')}
              error={Boolean(touched['aadharCard'] && errors['aadharCard'])}
              helperText={fe('aadharCard')}
              required
              size='small'
              fullWidth
              inputProps={{ maxLength: 12 }}
              placeholder='12-digit Aadhar number'
            />
          )}
          <TextField
            label='First Name'
            value={form.firstName}
            onChange={(e) => set('firstName', e.target.value)}
            onBlur={() => touch('firstName')}
            error={Boolean(touched['firstName'] && errors['firstName'])}
            helperText={fe('firstName')}
            required
            size='small'
            fullWidth
          />
          <TextField
            label='Last Name'
            value={form.lastName}
            onChange={(e) => set('lastName', e.target.value)}
            onBlur={() => touch('lastName')}
            error={Boolean(touched['lastName'] && errors['lastName'])}
            helperText={fe('lastName')}
            required
            size='small'
            fullWidth
          />

          <InlineSelect
            label='Gender'
            value={form.gender}
            onChange={(v) => set('gender', v)}
            onBlur={() => touch('gender')}
            options={GENDER_OPTIONS}
          />

          <TextField
            label='Phone Number'
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            onBlur={() => touch('phone')}
            error={Boolean(touched['phone'] && errors['phone'])}
            helperText={fe('phone')}
            required
            size='small'
            fullWidth
            inputProps={{ maxLength: 10 }}
          />
          <TextField
            label='Emergency Contact (optional)'
            value={form.emergencyContact}
            onChange={(e) => set('emergencyContact', e.target.value)}
            size='small'
            fullWidth
            inputProps={{ maxLength: 10 }}
            placeholder='Alternate phone number'
          />
          <TextField
            label='Email Address'
            type='email'
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            onBlur={() => touch('email')}
            error={Boolean(touched['email'] && errors['email'])}
            helperText={fe('email')}
            required
            size='small'
            fullWidth
          />
          <InlineSelect
            label='City'
            value={form.city}
            onChange={(v) => set('city', v)}
            onBlur={() => touch('city')}
            options={CITY_OPTIONS.map((c) => ({ id: c, label: c }))}
            error={Boolean(touched['city'] && errors['city'])}
            helperText={fe('city')}
            required
          />
          <InlineSelect
            label='Area'
            value={form.area}
            onChange={(v) => set('area', v)}
            onBlur={() => touch('area')}
            options={areaOptions.map((a) => ({ id: a.area, label: a.area }))}
            error={Boolean(touched['area'] && errors['area'])}
            helperText={fe('area')}
            disabled={!form.city}
            required
          />
          <TextField
            label='Pincode'
            value={form.pincode}
            onChange={(e) => set('pincode', e.target.value)}
            onBlur={() => touch('pincode')}
            error={Boolean(touched['pincode'] && errors['pincode'])}
            helperText={fe('pincode')}
            required
            size='small'
            fullWidth
            inputProps={{ maxLength: 6 }}
          />
        </Box>
      </Section>

      {/* ── Driver Hire Details ──────────────────────────────────────────── */}
      {simpleType === 'driver-hire' && (
        <Section icon={TuneIcon} label='Driver Hire Details' color='#16a34a'>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Vehicle Type Services */}
            <Box>
              <Typography
                variant='body2'
                sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary', fontSize: '0.85rem' }}
              >
                Select Vehicle Type Services *
              </Typography>

              {/* Mobility Services */}
              <Typography
                variant='caption'
                sx={{
                  fontWeight: 700,
                  color: '#1d4ed8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  display: 'block',
                  mb: 1,
                }}
              >
                Mobility Services
              </Typography>
              <FormGroup>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  {MOBILITY_VEHICLES.map((v) => {
                    const vConf = VEHICLE_CONFIG[v];
                    const isChecked = form.selectedVehicles.includes(v);
                    return (
                      <Box
                        key={v}
                        sx={{
                          border: `1.5px solid ${isChecked ? '#16a34a' : '#e2e8f0'}`,
                          borderRadius: '12px',
                          p: 1.5,
                          transition: 'all 0.2s ease',
                          background: isChecked ? 'rgba(22,163,74,0.05)' : 'transparent',
                          boxShadow: isChecked ? '0 2px 8px rgba(22,163,74,0.12)' : 'none',
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isChecked}
                              onChange={(e) => toggleVehicle(v, e.target.checked)}
                              size='small'
                              sx={{
                                color: '#94a3b8',
                                '&.Mui-checked': { color: '#16a34a' },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant='body2'
                              sx={{
                                fontWeight: isChecked ? 700 : 500,
                                color: isChecked ? '#15803d' : 'text.primary',
                              }}
                            >
                              {vConf.label}
                            </Typography>
                          }
                          sx={{ m: 0, width: '100%' }}
                        />
                        {isChecked && (
                          <TextField
                            label={`Budget per Day for ${vConf.label} (₹)`}
                            value={form.vehicleBudgets[v] || ''}
                            onChange={(e) => setVehicleBudget(v, e.target.value)}
                            onBlur={() => touch(`budget_${v}`)}
                            size='small'
                            fullWidth
                            required
                            type='number'
                            inputProps={{ min: 0 }}
                            error={Boolean(touched[`budget_${v}`] && errors[`budget_${v}`])}
                            helperText={fe(`budget_${v}`)}
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </FormGroup>

              {/* Logistics Services */}
              <Typography
                variant='caption'
                sx={{
                  fontWeight: 700,
                  color: '#d97706',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  display: 'block',
                  mb: 1,
                }}
              >
                Logistics Services
              </Typography>
              <FormGroup>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 1.5,
                  }}
                >
                  {LOGISTICS_VEHICLES.map((v) => {
                    const vConf = VEHICLE_CONFIG[v];
                    const isChecked = form.selectedVehicles.includes(v);
                    return (
                      <Box
                        key={v}
                        sx={{
                          border: `1.5px solid ${isChecked ? '#d97706' : '#e2e8f0'}`,
                          borderRadius: '12px',
                          p: 1.5,
                          transition: 'all 0.2s ease',
                          background: isChecked ? 'rgba(217,119,6,0.05)' : 'transparent',
                          boxShadow: isChecked ? '0 2px 8px rgba(217,119,6,0.12)' : 'none',
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isChecked}
                              onChange={(e) => toggleVehicle(v, e.target.checked)}
                              size='small'
                              sx={{
                                color: '#94a3b8',
                                '&.Mui-checked': { color: '#d97706' },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant='body2'
                              sx={{
                                fontWeight: isChecked ? 700 : 500,
                                color: isChecked ? '#92400e' : 'text.primary',
                              }}
                            >
                              {vConf.label}
                            </Typography>
                          }
                          sx={{ m: 0, width: '100%' }}
                        />
                        {isChecked && (
                          <TextField
                            label={`Budget per Day for ${vConf.label} (₹)`}
                            value={form.vehicleBudgets[v] || ''}
                            onChange={(e) => setVehicleBudget(v, e.target.value)}
                            onBlur={() => touch(`budget_${v}`)}
                            size='small'
                            fullWidth
                            required
                            type='number'
                            inputProps={{ min: 0 }}
                            error={Boolean(touched[`budget_${v}`] && errors[`budget_${v}`])}
                            helperText={fe(`budget_${v}`)}
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </FormGroup>

              {touched['selectedVehicles'] && errors['selectedVehicles'] && (
                <FormHelperText error sx={{ mt: 0.5, ml: 0.5 }}>
                  {errors['selectedVehicles']}
                </FormHelperText>
              )}
            </Box>

            {/* Shift Preference */}
            <Box
              sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}
            >
              <InlineSelect
                label='Shift Preference'
                value={form.driverHireShift}
                onChange={(v) => set('driverHireShift', v)}
                onBlur={() => touch('driverHireShift')}
                options={HIRE_SHIFT_OPTIONS.map((o) => ({ id: o.id, label: o.label }))}
                error={Boolean(touched['driverHireShift'] && errors['driverHireShift'])}
                helperText={fe('driverHireShift')}
                required
              />
            </Box>
          </Box>
        </Section>
      )}

      {/* ── Vehicle Rental Details ───────────────────────────────────────── */}
      {simpleType === 'vehicle-rental' && (
        <Section icon={TuneIcon} label='Rental Preferences' color='#7c3aed'>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Vehicle image upload + preview */}
            <Box>
              <Typography
                variant='body2'
                sx={{ fontWeight: 700, mb: 1, color: 'text.primary', fontSize: '0.85rem' }}
              >
                Vehicle Photo
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
                {/* Preview box */}
                <Box
                  sx={{
                    width: 120,
                    height: 90,
                    borderRadius: '12px',
                    border: '1.5px dashed #7c3aed55',
                    background: form.vehicleImage ? 'transparent' : 'rgba(124,58,237,0.04)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {form.vehicleImage ? (
                    <img
                      src={form.vehicleImage}
                      alt='Vehicle preview'
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Typography
                      variant='caption'
                      color='text.disabled'
                      sx={{ textAlign: 'center', px: 1 }}
                    >
                      No image selected
                    </Typography>
                  )}
                </Box>

                {/* Upload button + clear */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <label htmlFor='vehicle-image-upload'>
                    <input
                      id='vehicle-image-upload'
                      type='file'
                      accept='image/*'
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const result = ev.target?.result;
                          if (typeof result === 'string') set('vehicleImage', result);
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    <Typography
                      sx={{
                        display: 'inline-block',
                        px: 2,
                        py: 1,
                        borderRadius: '8px',
                        border: '1.5px solid #7c3aed',
                        color: '#7c3aed',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': { background: 'rgba(124,58,237,0.06)' },
                      }}
                    >
                      Upload Photo
                    </Typography>
                  </label>
                  {form.vehicleImage && (
                    <Typography
                      onClick={() => set('vehicleImage', '')}
                      sx={{
                        fontSize: '0.75rem',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontWeight: 500,
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Remove photo
                    </Typography>
                  )}
                  <Typography variant='caption' color='text.disabled'>
                    JPG, PNG, WEBP — max 5 MB
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Preference, Duration, Cost per day */}
            <Box
              sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}
            >
              <InlineSelect
                label='Vehicle Preference'
                value={form.rentalVehiclePref}
                onChange={(v) => set('rentalVehiclePref', v)}
                onBlur={() => touch('rentalVehiclePref')}
                options={VEHICLE_OPTIONS}
                error={Boolean(touched['rentalVehiclePref'] && errors['rentalVehiclePref'])}
                helperText={fe('rentalVehiclePref')}
                required
              />
              <InlineSelect
                label='Rental Duration'
                value={form.rentalDuration}
                onChange={(v) => set('rentalDuration', v)}
                onBlur={() => touch('rentalDuration')}
                options={RENTAL_DURATION_OPTIONS.map((o) => ({ id: o.id, label: o.label }))}
                error={Boolean(touched['rentalDuration'] && errors['rentalDuration'])}
                helperText={fe('rentalDuration')}
                required
              />
              <TextField
                label='Cost Per Day (₹)'
                value={form.costPerDay}
                onChange={(e) => set('costPerDay', e.target.value)}
                onBlur={() => touch('costPerDay')}
                error={Boolean(touched['costPerDay'] && errors['costPerDay'])}
                helperText={fe('costPerDay')}
                required
                size='small'
                fullWidth
                type='number'
                inputProps={{ min: 0 }}
                placeholder='e.g. 1500'
              />
            </Box>
          </Box>
        </Section>
      )}

      {/* ── Mechanic Hire Details ────────────────────────────────────────── */}
      {simpleType === 'mechanic-hire' && (
        <Section icon={TuneIcon} label='Breakdown Details' color='#ea580c'>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <InlineSelect
              label='Vehicle Type'
              value={form.mechanicVehicleType}
              onChange={(v) => set('mechanicVehicleType', v)}
              onBlur={() => touch('mechanicVehicleType')}
              options={MECHANIC_VEHICLE_OPTIONS}
              error={Boolean(touched['mechanicVehicleType'] && errors['mechanicVehicleType'])}
              helperText={fe('mechanicVehicleType')}
              required
            />
            <InlineSelect
              label='Issue Type'
              value={form.mechanicIssueType}
              onChange={(v) => set('mechanicIssueType', v)}
              onBlur={() => touch('mechanicIssueType')}
              options={MECHANIC_ISSUE_OPTIONS}
              error={Boolean(touched['mechanicIssueType'] && errors['mechanicIssueType'])}
              helperText={fe('mechanicIssueType')}
              required
            />
          </Box>
        </Section>
      )}

      {/* ── Partner / Business Details ─────────────────────────────────── */}
      {isPartnerType(simpleType) && (
        <Section icon={BusinessIcon} label='Business Details' color='#0891b2'>
          <Box
            sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}
          >
            <TextField
              label='Business / Entity Name'
              value={form.businessName}
              onChange={(e) => set('businessName', e.target.value)}
              onBlur={() => touch('businessName')}
              error={Boolean(touched['businessName'] && errors['businessName'])}
              helperText={fe('businessName')}
              required
              size='small'
              fullWidth
            />
            <TextField
              label='GST Number (optional)'
              value={form.gstNumber}
              onChange={(e) => set('gstNumber', e.target.value.toUpperCase())}
              onBlur={() => touch('gstNumber')}
              size='small'
              fullWidth
              inputProps={{ maxLength: 15 }}
              placeholder='e.g. 29ABCDE1234F1Z5'
            />

            {/* Petrol Bunk – fuel types */}
            {simpleType === 'petrol-bunk' && (
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Typography
                  variant='caption'
                  sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.75, display: 'block' }}
                >
                  Fuel Types Available *
                </Typography>
                <FormGroup row>
                  {FUEL_TYPE_OPTIONS.map((opt) => (
                    <FormControlLabel
                      key={opt.id}
                      control={
                        <Checkbox
                          size='small'
                          checked={form.fuelTypesAvailable.includes(opt.id)}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              fuelTypesAvailable: e.target.checked
                                ? [...p.fuelTypesAvailable, opt.id]
                                : p.fuelTypesAvailable.filter((f) => f !== opt.id),
                            }))
                          }
                        />
                      }
                      label={opt.label}
                    />
                  ))}
                </FormGroup>
                {touched['fuelTypesAvailable'] && errors['fuelTypesAvailable'] && (
                  <FormHelperText error>{errors['fuelTypesAvailable']}</FormHelperText>
                )}
              </Box>
            )}

            {/* EV Charging – charger types & count */}
            {simpleType === 'ev-charging' && (
              <>
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <Typography
                    variant='caption'
                    sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.75, display: 'block' }}
                  >
                    Charger Types Available *
                  </Typography>
                  <FormGroup row>
                    {CHARGER_TYPE_OPTIONS.map((opt) => (
                      <FormControlLabel
                        key={opt.id}
                        control={
                          <Checkbox
                            size='small'
                            checked={form.chargerTypes.includes(opt.id)}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                chargerTypes: e.target.checked
                                  ? [...p.chargerTypes, opt.id]
                                  : p.chargerTypes.filter((c) => c !== opt.id),
                              }))
                            }
                          />
                        }
                        label={opt.label}
                      />
                    ))}
                  </FormGroup>
                  {touched['chargerTypes'] && errors['chargerTypes'] && (
                    <FormHelperText error>{errors['chargerTypes']}</FormHelperText>
                  )}
                </Box>
                <TextField
                  label='Number of Chargers'
                  type='number'
                  value={form.numChargers}
                  onChange={(e) => set('numChargers', e.target.value)}
                  size='small'
                  fullWidth
                  inputProps={{ min: 1 }}
                />
              </>
            )}

            {/* Showroom – type & brands */}
            {simpleType === 'showroom' && (
              <>
                <InlineSelect
                  label='Showroom Type *'
                  value={form.showroomType}
                  onChange={(v) => set('showroomType', v)}
                  onBlur={() => touch('showroomType')}
                  options={SHOWROOM_TYPE_OPTIONS}
                  error={Boolean(touched['showroomType'] && errors['showroomType'])}
                  helperText={fe('showroomType')}
                />
                <TextField
                  label='Vehicle Brands (comma-separated)'
                  value={form.vehicleBrands}
                  onChange={(e) => set('vehicleBrands', e.target.value)}
                  size='small'
                  fullWidth
                  placeholder='e.g. Maruti, Hyundai, Tata'
                />
              </>
            )}

            {/* Vehicle Finance / Finance Broker – loan types & amounts */}
            {(simpleType === 'vehicle-finance' || simpleType === 'finance-broker') && (
              <>
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <Typography
                    variant='caption'
                    sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.75, display: 'block' }}
                  >
                    Loan Types Offered *
                  </Typography>
                  <FormGroup row>
                    {LOAN_TYPE_OPTIONS.map((opt) => (
                      <FormControlLabel
                        key={opt.id}
                        control={
                          <Checkbox
                            size='small'
                            checked={form.loanTypes.includes(opt.id)}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                loanTypes: e.target.checked
                                  ? [...p.loanTypes, opt.id]
                                  : p.loanTypes.filter((l) => l !== opt.id),
                              }))
                            }
                          />
                        }
                        label={opt.label}
                      />
                    ))}
                  </FormGroup>
                  {touched['loanTypes'] && errors['loanTypes'] && (
                    <FormHelperText error>{errors['loanTypes']}</FormHelperText>
                  )}
                </Box>
                <TextField
                  label='Min Loan Amount (₹)'
                  type='number'
                  value={form.minLoanAmount}
                  onChange={(e) => set('minLoanAmount', e.target.value)}
                  size='small'
                  fullWidth
                  inputProps={{ min: 0 }}
                />
                <TextField
                  label='Max Loan Amount (₹)'
                  type='number'
                  value={form.maxLoanAmount}
                  onChange={(e) => set('maxLoanAmount', e.target.value)}
                  size='small'
                  fullWidth
                  inputProps={{ min: 0 }}
                />
              </>
            )}

            {/* Insurance Partner – coverage types & company */}
            {simpleType === 'insurance-partner' && (
              <>
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <Typography
                    variant='caption'
                    sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.75, display: 'block' }}
                  >
                    Coverage Types Offered *
                  </Typography>
                  <FormGroup row>
                    {INSURANCE_COVERAGE_OPTIONS.map((opt) => (
                      <FormControlLabel
                        key={opt.id}
                        control={
                          <Checkbox
                            size='small'
                            checked={form.insuranceCoverage.includes(opt.id)}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                insuranceCoverage: e.target.checked
                                  ? [...p.insuranceCoverage, opt.id]
                                  : p.insuranceCoverage.filter((c) => c !== opt.id),
                              }))
                            }
                          />
                        }
                        label={opt.label}
                      />
                    ))}
                  </FormGroup>
                  {touched['insuranceCoverage'] && errors['insuranceCoverage'] && (
                    <FormHelperText error>{errors['insuranceCoverage']}</FormHelperText>
                  )}
                </Box>
                <TextField
                  label='Insurance Company Name'
                  value={form.insuranceCompany}
                  onChange={(e) => set('insuranceCompany', e.target.value)}
                  size='small'
                  fullWidth
                  placeholder='e.g. ICICI Lombard, HDFC Ergo'
                />
              </>
            )}
          </Box>
        </Section>
      )}

      {/* ── Sticky CTA bar ───────────────────────────────────────────────── */}
      <Box
        sx={{
          position: 'sticky',
          bottom: 20,
          px: 2.5,
          py: 1.75,
          backgroundColor: 'background.paper',
          borderRadius: '14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          gap: 1,
          zIndex: 10,
        }}
      >
        {/* Progress indicator */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            minWidth: { sm: 180 },
            flex: { xs: 1, sm: 'none' },
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: '1rem', color: 'text.disabled', flexShrink: 0 }} />
          <Typography
            sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'text.secondary', flexShrink: 0 }}
          >
            Completion
          </Typography>
          <LinearProgress
            variant='determinate'
            value={completionPct}
            sx={{
              flex: 1,
              height: 6,
              borderRadius: 3,
              bgcolor: 'action.hover',
              '& .MuiLinearProgress-bar': { bgcolor: 'text.secondary', borderRadius: 3 },
            }}
          />
          <Typography
            sx={{ fontSize: '0.82rem', fontWeight: 700, color: 'text.secondary', flexShrink: 0 }}
          >
            {completionPct}%
          </Typography>
        </Box>

        {/* Action buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
            alignItems: { xs: 'stretch', sm: 'center' },
          }}
        >
          <Button
            variant='outlined'
            size='small'
            onClick={handleBack}
            disabled={isSubmitting}
            sx={{
              height: '40px',
              padding: '0 12px',
              fontSize: '0.8125rem',
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Cancel
          </Button>
          <Button
            variant='outlined'
            size='small'
            onClick={handleClearDraft}
            disabled={isSubmitting}
            sx={{
              height: '40px',
              padding: '0 12px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Draft
          </Button>
          <Button
            variant='contained'
            size='small'
            onClick={handleSubmit}
            disabled={isSubmitting}
            sx={{
              height: '40px',
              padding: '0 20px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              width: { xs: '100%', sm: 'auto' },
              minWidth: { sm: 140 },
              background: config.gradient,
              boxShadow: config.shadow,
              '&:hover': { background: config.gradient, filter: 'brightness(1.08)' },
              '&:disabled': { opacity: 0.6 },
            }}
          >
            {isSubmitting ? 'Submitting…' : `Submit`}
          </Button>
        </Box>
      </Box>

      {/* ── Snackbar ─────────────────────────────────────────────────────── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateSimpleForm;
