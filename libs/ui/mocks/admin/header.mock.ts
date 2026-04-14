import { IHeader } from '@gogaadi/interfaces';

/**
 * Mock data for Header component
 * Used in Storybook to test different UI variations
 */

// ============================================
// Loading/Error States
// ============================================

export const mockHeadersLoading = {
  isLoading: true,
  data: null,
  error: null,
};

export const mockHeadersError = {
  isLoading: false,
  data: null,
  error: 'Failed to fetch headers',
};
