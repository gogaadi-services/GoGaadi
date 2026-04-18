import { IAuthUser } from '@gogaadi/interfaces';

export type CollectionsRow = IAuthUser & { sno: number };
export type ActionType = 'approve' | 'reject';
