import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  console.log('Running schema migration (safe — no data loss)...');
  console.log('Database URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));

  // ── User table: add missing columns ─────────────────────────────────────────
  await pool.query(`
    ALTER TABLE "User"
      ADD COLUMN IF NOT EXISTS "customUserId"  TEXT UNIQUE,
      ADD COLUMN IF NOT EXISTS "gender"        TEXT,
      ADD COLUMN IF NOT EXISTS "city"          TEXT,
      ADD COLUMN IF NOT EXISTS "attachments"   TEXT;
  `);
  console.log('✓ User columns added');

  // ── ManagementDraft table (new) ──────────────────────────────────────────────
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "ManagementDraft" (
      "id"        SERIAL PRIMARY KEY,
      "createdBy" INTEGER NOT NULL,
      "type"      TEXT NOT NULL,
      "formData"  TEXT NOT NULL,
      "expiresAt" TIMESTAMP(3) NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE ("createdBy", "type")
    );
  `);
  console.log('✓ ManagementDraft table created');

  // ── CustomerOnboarding: add missing columns ──────────────────────────────────
  await pool.query(`
    ALTER TABLE "CustomerOnboarding"
      ADD COLUMN IF NOT EXISTS "customerId"        TEXT UNIQUE,
      ADD COLUMN IF NOT EXISTS "gender"            TEXT,
      ADD COLUMN IF NOT EXISTS "emergencyContact"  TEXT,
      ADD COLUMN IF NOT EXISTS "idProofExpiry"     TEXT,
      ADD COLUMN IF NOT EXISTS "createdByName"     TEXT,
      ADD COLUMN IF NOT EXISTS "createdByEmail"    TEXT,
      ADD COLUMN IF NOT EXISTS "createdByPhone"    TEXT,
      ADD COLUMN IF NOT EXISTS "isSelfRegistered"  BOOLEAN NOT NULL DEFAULT false,
      ADD COLUMN IF NOT EXISTS "uploadedFiles"     TEXT,
      ADD COLUMN IF NOT EXISTS "accessFromDate"    TIMESTAMP(3),
      ADD COLUMN IF NOT EXISTS "accessToDate"      TIMESTAMP(3),
      ADD COLUMN IF NOT EXISTS "reviewedAt"        TIMESTAMP(3);
  `);
  console.log('✓ CustomerOnboarding columns added');

  // ── CustomerOnboarding: fix NOT NULL → nullable for optional fields ──────────
  await pool.query(`
    ALTER TABLE "CustomerOnboarding"
      ALTER COLUMN "vehicleType"    DROP NOT NULL,
      ALTER COLUMN "vehicleSubType" DROP NOT NULL,
      ALTER COLUMN "fuelType"       DROP NOT NULL,
      ALTER COLUMN "tripPreference" DROP NOT NULL,
      ALTER COLUMN "vehicleNumber"  DROP NOT NULL,
      ALTER COLUMN "rcNumber"       DROP NOT NULL,
      ALTER COLUMN "dlNumber"       DROP NOT NULL,
      ALTER COLUMN "idProofType"    DROP NOT NULL;
  `);
  console.log('✓ CustomerOnboarding nullable constraints fixed');

  // ── CustomerOnboarding: fix INTEGER → TEXT for driverHireCount, cargoCoRideMax
  await pool.query(`
    ALTER TABLE "CustomerOnboarding"
      ALTER COLUMN "driverHireCount"  TYPE TEXT USING "driverHireCount"::TEXT,
      ALTER COLUMN "cargoCoRideMax"   TYPE TEXT USING "cargoCoRideMax"::TEXT;
  `);
  console.log('✓ CustomerOnboarding column types fixed');

  console.log('\nMigration complete — no data was deleted.');
}

migrate()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(() => pool.end());
