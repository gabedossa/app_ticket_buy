import { AuthResponse, LoginRequest, RegisterRequest } from '../types/Tipos';
import { fetchAPI } from './api';

export const AuthService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('🔄 Tentando login para:', credentials.email);
      const response = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      console.log('✅ Login bem-sucedido!');
      return response;
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw new Error('Email ou senha inválidos.');
    }
  },
  async register(userData: RegisterRequest): Promise<{ message: string }> {
    try {
      console.log('🔄 Tentando registrar usuário:', userData.email);
      const response = await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      console.log('✅ Registro bem-sucedido!');
      return response;
    } catch (error) {
      console.error('❌ Erro no registro:', error);
      throw new Error('Não foi possível realizar o cadastro. O email já pode estar em uso.');
    }
  },
};