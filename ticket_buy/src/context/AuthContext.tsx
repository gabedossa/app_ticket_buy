import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../service/api'; // <<< MUDANÇA IMPORTANTE AQUI
import { AuthContextType, AuthState, LoginRequest, ProviderProps, RegisterRequest } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'my-jwt';

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null;
      try {
        userToken = await SecureStore.getItemAsync(TOKEN_KEY);
      } catch (e) {
        console.error('Falha ao carregar o token', e);
      }

      if (userToken) {
        setAuthState({
          token: userToken,
          isAuthenticated: true,
          isLoading: false,
          user: null,
        });
      } else {
        setAuthState({
          token: null,
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
      }
    };

    bootstrapAsync();
  }, []);

  const signIn = async (data: LoginRequest) => {
    // Usando o serviço importado do lugar correto
    const response = await authService.login(data);
    const { token } = response;

    await SecureStore.setItemAsync(TOKEN_KEY, token);

    setAuthState({
      token: token,
      isAuthenticated: true,
      isLoading: false,
      user: null,
    });
  };

  const signUp = async (data: RegisterRequest) => {
    // Usando o serviço importado do lugar correto
    await authService.register(data);

  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setAuthState({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      user: null,
    });
  };

  const value = {
    authState,
    signIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};