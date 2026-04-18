import { IAuthUser } from '@gogaadi/interfaces';

export type SubscriptionsRow = IAuthUser & { sno: number };
export type ActionType = 'approve' | 'reject';
