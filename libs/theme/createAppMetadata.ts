import { useAppRole } from './AppRoleContext';

/**
 * App-specific metadata configuration type
 */
export interface AppMetadataConfig<T = Record<string, unknown>> {
  admin?: T;
  consultant?: T;
  user?: T;
}

/**
 * Creates metadata that works across all apps with app-specific overrides.
 * Reads the current role ('admin' | 'consultant' | 'user') from AppRoleContext to pick
 * the correct override key.
 *
 * @param baseMetadata - Base metadata object
 * @param appConfig - App-specific metadata overrides
 *
 * @example
 * export const metadata = useAppMetadata(
 *   {
 *     title: 'Welcome to Dashboard',
 *     description: 'Default dashboard description',
 *   },
 *   {
 *     admin: {
 *       title: 'Welcome to Admin Dashboard',
 *     },
 *     consultant: {
 *       title: 'Welcome to Consultant Dashboard',
 *     },
 *     user: {
 *       title: 'Welcome to User Dashboard',
 *     },
 *   }
 * );
 */
export const createAppMetadata = <T extends Record<string, unknown>>(
  baseMetadata: T,
  appConfig?: AppMetadataConfig<Partial<T>>,
): T => {

  const appRole = useAppRole();

  // Get overrides for the current role ('admin', 'consultant', or 'user')
  const appOverrides = appConfig?.[appRole] ?? {};

  return {
    ...baseMetadata,
    ...appOverrides,
  } as T;
};
