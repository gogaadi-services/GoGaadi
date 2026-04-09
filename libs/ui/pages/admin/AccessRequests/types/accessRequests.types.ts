import { IAuthUser } from '@gogaadi/interfaces';

export type AccessRequestRow = IAuthUser & { sno?: number };
export type ActionType = 'approve' | 'reject';
