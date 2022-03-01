import {
  getMarketId,
  onEditProfile,
  onLogIn,
  onLogOut,
  onRegister,
} from '@axios/user';
import {
  HEADERTOKEN,
  LOADING,
  LOGIN,
  LOGOUT,
  MODIFYNICKNAME,
  REGISTER,
  TOKEN,
  USERCHECK,
} from '@utils/constantUser';
import { removeStorage, setStorage } from '@utils/storage';
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import { reducer } from './reducer';
import {
  BaseAuthInfo,
  RegisterUserInfo,
  UserContextType,
  UserInfo,
} from './types';

const initialState: UserInfo = {
  isLoading: false,
  user: {
    email: '',
    nickname: '',
    userId: '',
    marketId: '',
  },
};

interface Props {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>(initialState);

export const UserProvider = ({ children }: Props) => {
  const [{ isLoading, user }, dispatch] = useReducer(reducer, initialState);

  const handleLogIn = useCallback(async (loginUserInfo: BaseAuthInfo) => {
    dispatch({ type: LOADING });
    const { error, headers, data: baseData } = await onLogIn(loginUserInfo);

    if (error.code) {
      dispatch({ type: LOADING });
      return error;
    }

    setStorage(TOKEN, headers[HEADERTOKEN]);

    const { error: marketError, data } = await getMarketId();

    if (marketError.code) {
      dispatch({ type: LOGIN, payload: { ...baseData, marketId: '' } });
    } else {
      dispatch({
        type: LOGIN,
        payload: { ...baseData, marketId: data.marketId },
      });
    }

    dispatch({ type: LOADING });
    return error;
  }, []);

  const handleRegister = useCallback(
    async (registerUserInfo: Omit<RegisterUserInfo, 'passwordCheck'>) => {
      dispatch({ type: LOADING });
      const { error } = await onRegister(registerUserInfo);

      if (error.code) {
        dispatch({ type: LOADING });
        return error;
      }

      dispatch({ type: REGISTER });
      dispatch({ type: LOADING });

      return error;
    },
    []
  );

  const handleModifyInfo = useCallback(
    async (editInfo: Partial<RegisterUserInfo>) => {
      dispatch({ type: LOADING });
      const { error } = await onEditProfile(editInfo);

      if (error.code) {
        dispatch({ type: LOADING });
        return error;
      }

      dispatch({ type: MODIFYNICKNAME, payload: editInfo.nickname });
      dispatch({ type: LOADING });
      return error;
    },
    []
  );

  const handleUserCheck = useCallback(async (userInfo) => {
    const currentUser = { ...userInfo, marketId: '' };
    const { error, data } = await getMarketId();

    if (!error.code) {
      currentUser.marketId = data.marketId;
    }

    dispatch({ type: USERCHECK, payload: currentUser });
  }, []);

  const handleLogOut = useCallback(async () => {
    dispatch({ type: LOADING });
    await onLogOut();
    removeStorage(TOKEN);
    dispatch({ type: LOGOUT, payload: initialState.user });
    dispatch({ type: LOADING });
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      user,
      handleLogIn,
      handleRegister,
      handleModifyInfo,
      handleUserCheck,
      handleLogOut,
    }),
    [
      isLoading,
      user,
      handleLogIn,
      handleRegister,
      handleModifyInfo,
      handleUserCheck,
      handleLogOut,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
