import {
  createContext,
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer,
} from "react";
import Cookies from "js-cookie";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

interface AuthProviderProps extends PropsWithChildren {
  initialUser?: User;
}

interface User {
  userId?: number;
  username?: string;
}

interface AuthProviderState {
  user?: User;
  loading?: boolean;
}

enum ActionType {
  LOGIN = "login",
  LOGOUT = "logout",
}

interface AuthProviderAction {
  type: ActionType;
  payload: Partial<AuthProviderState>;
}

interface ContextState extends AuthProviderState {
  login: (username: string, password: string) => void;
  logout: () => void;
  reloadUser: () => void;
}

const AuthContext = createContext<ContextState | undefined>(undefined);

const authStateReducer: Reducer<AuthProviderState, AuthProviderAction> = (
  state: AuthProviderState,
  action: AuthProviderAction
) => {
  switch (action.type) {
    case ActionType.LOGIN:
      if (!action.payload.user) {
        throw new Error("User must be defined");
      }

      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    case ActionType.LOGOUT:
      Cookies.remove("user_token");

      return {
        ...state,
        token: undefined,
        user: undefined,
        loading: false,
      };
  }
};

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
  const [{ user, loading }, dispatch] = useReducer(authStateReducer, {
    user: initialUser,
    loading: true,
  });

  const navigation = useNavigate();

  const login = async (username: string, password: string) => {
    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return notification.error({
        message: "Error",
        description: "Usuario incorrecto o contraseña incorrecta",
      });
    }

    const data = await response.json();

    dispatch({
      type: ActionType.LOGIN,
      payload: {
        user: {
          userId: data.userId,
          username: data.username,
        },
      },
    });

    navigation("/");
  };

  const logout = () => {
    dispatch({
      type: ActionType.LOGOUT,
      payload: {
        user: {
          userId: undefined,
          username: undefined,
        },
      },
    });
  };

  const reloadUser = async () => {
    try {
      const response = await api.fetchApi<User>({
        url: "/api/auth/me",
        method: "GET",
      });

      dispatch({
        type: ActionType.LOGIN,
        payload: {
          user: {
            userId: response.userId,
            username: response.username,
          },
        },
      });
    } catch (error) {
      dispatch({
        type: ActionType.LOGOUT,
        payload: {
          user: {
            userId: undefined,
            username: undefined,
          },
        },
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, reloadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextdata = useContext(AuthContext);

  if (!authContextdata) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return authContextdata;
};
