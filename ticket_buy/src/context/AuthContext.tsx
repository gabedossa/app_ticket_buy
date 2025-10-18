// src/context/AuthContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import api, { authService } from '../service/api';
import { LoginRequest } from '../types';

const ACCESS_TOKEN_KEY = 'user_access_token';
const REFRESH_TOKEN_KEY = 'user_refresh_token';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextData {
  signIn(credentials: LoginRequest): Promise<void>;
  signOut(): void;
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
        const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

        if (accessToken && refreshToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          setAuthState({
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (e) {
        setAuthState({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
        });
      }
    };

    bootstrapAsync();
  }, []);

  const signIn = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials) as any; // Recebe como 'any' para inspecionar
    
    // Validação robusta da resposta do servidor
    if (!response) {
      throw new Error("O servidor não retornou uma resposta.");
    }
    
    const { accessToken, refreshToken, token } = response;

    // A lógica de refresh token requer accessToken e refreshToken.
    if (accessToken && refreshToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      setAuthState({
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } 
    // Fallback para a resposta antiga (apenas token), mas avisa sobre a limitação.
    else if (token && typeof token === 'string') {
        throw new Error("O servidor retornou um formato de token antigo. A funcionalidade de renovação de token (refresh token) não irá funcionar. Por favor, atualize o backend para retornar 'accessToken' e 'refreshToken'.");
    }
    // Se nenhum dos formatos esperados for encontrado
    else {
      console.error('Resposta de login recebida:', response);
      throw new Error("A resposta do servidor não contém os tokens esperados ('accessToken' e 'refreshToken').");
    }
  };

  const signOut = async () => {
    delete api.defaults.headers.common['Authorization'];
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    setAuthState({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}