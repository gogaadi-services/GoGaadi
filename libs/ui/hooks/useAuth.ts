import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { setCredentials, logout as logoutAction, enterConsultantMode as enterConsultantModeAction, exitConsultantMode as exitConsultantModeAction } from '../store/authStore';
import { useAuthActionMutation } from '@gogaadi/services';
import { UserRole, ISignInResponse } from '@gogaadi/interfaces';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, isConsultantMode } = useAppSelector((state) => state.auth);
  const [authAction, { isLoading, error }] = useAuthActionMutation();

  const login = async (email: string, password: string) => {
    const result = (await authAction({
      action: 'signin',
      email,
      password,
    }).unwrap()) as ISignInResponse;
    dispatch(setCredentials({ user: result.data.user, token: result.data.token }));
    return result;
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const enterConsultantMode = () => {
    dispatch(enterConsultantModeAction());
  };

  const exitConsultantMode = () => {
    dispatch(exitConsultantModeAction());
  };

  const isAdmin = user?.role === UserRole.ADMIN;
  const isCaptain = user?.role === UserRole.CAPTAIN;
  const isConsultant = user?.role === UserRole.CONSULTANT;

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isCaptain,
    isConsultant,
    isConsultantMode,
    enterConsultantMode,
    exitConsultantMode,
    login,
    logout,
    isLoading,
    error,
  };
};
