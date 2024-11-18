import {
  createContext,
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer,
} from "react";
import Cookies from "js-cookie";
import { notification } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

interface AuthProviderProps extends PropsWithChildren {
  initialUser?: User;
}

interface User {
  userId?: string;
  username?: string;
}

interface AuthProviderState {
  token?: string;
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
}

const AuthContext = createContext<ContextState | undefined>(undefined);

const authStateReducer: Reducer<AuthProviderState, AuthProviderAction> = (
  state: AuthProviderState,
  action: AuthProviderAction
) => {
  switch (action.type) {
    case ActionType.LOGIN:
      if (!action.payload.token) {
        throw new Error("Token must be defined");
      }

      if (!action.payload.user) {
        throw new Error("User must be defined");
      }

      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      };
    case ActionType.LOGOUT:
      Cookies.remove("user_token");

      return {
        ...state,
        token: undefined,
        user: undefined,
      };
  }
};

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
  const [{ token, user, loading }, dispatch] = useReducer(authStateReducer, {
    token: "",
    user: undefined,
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
        token: data.accessToken,
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
        token: undefined,
        user: {
          userId: undefined,
          username: undefined,
        },
      },
    });
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
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
