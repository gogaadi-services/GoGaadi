import { IAuthUser } from '@gogaadi/interfaces';

export type FastTagRow = IAuthUser & { sno: number };
export type ActionType = 'approve' | 'reject';
