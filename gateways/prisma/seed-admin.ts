import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function upsertAdmin() {
  console.log('Upserting admin user...');
  console.log('Database URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));

  const adminPassword = await bcrypt.hash('admin123', 10);

  await pool.query(`
    INSERT INTO "User" (
      "firstName", "lastName", "email", "password", "phone",
      "businessUnit", "employeeId", "name", "role", "status",
      "source", "isActive", "mustResetPassword", "failedLoginAttempts",
      "firstActivationDate", "createdAt", "updatedAt"
    ) VALUES (
      'Admin', 'User', 'admin@gogaadi.in', $1, '+1-555-0001',
      'Technology', 'EMP001', 'Admin User', 'admin', 'active',
      'admin', true, false, 0,
      CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )
    ON CONFLICT ("email") DO UPDATE SET
      "isActive"          = true,
      "status"            = 'active',
      "password"          = $1,
      "role"              = 'admin',
      "failedLoginAttempts" = 0,
      "lockedUntil"       = NULL,
      "mustResetPassword" = false,
      "updatedAt"         = CURRENT_TIMESTAMP;
  `, [adminPassword]);

  console.log('Admin user upserted: admin@gogaadi.in / admin123');
}

upsertAdmin()
  .catch((e) => {
    console.error('Failed:', e);
    process.exit(1);
  })
  .finally(() => pool.end());
