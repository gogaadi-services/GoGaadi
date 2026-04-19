import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();
