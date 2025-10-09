import { Stack } from 'expo-router';
import { CartProvider } from './src/context/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="modalProduct" 
          options={{ presentation: 'modal', title: 'Detalhes do Produto' }} 
        />
        
        <Stack.Screen 
          name="modalCheckout" 
          options={{ presentation: 'modal', title: 'Pedido Enviado!' }} 
        />
      </Stack>
    </CartProvider>
  );
}