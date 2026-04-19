import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../services/state';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
