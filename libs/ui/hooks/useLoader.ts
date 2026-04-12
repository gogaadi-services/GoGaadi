import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { showLoader, hideLoader } from '../store/uiStore';

export const useLoader = () => {
  const dispatch = useAppDispatch();
  const loaderVisible = useAppSelector((state) => state.ui.loaderVisible);
  const loaderMessage = useAppSelector((state) => state.ui.loaderMessage);

  return {
    loaderVisible,
    loaderMessage,
    show: (message: string) => dispatch(showLoader(message)),
    hide: () => dispatch(hideLoader()),
  };
};
