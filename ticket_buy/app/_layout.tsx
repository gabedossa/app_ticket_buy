import { Stack } from 'expo-router';
import { CartProvider } from './context/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        {/* Esta linha diz ao app para usar o layout de abas para as telas principais */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* --- LINHA MAIS IMPORTANTE PARA O SEU PROBLEMA --- */}
        {/* Esta linha registra a tela 'modalProduct' e a define como um modal. */}
        {/* Sem ela, a navegação para '/modalProduct' falhará. */}
        <Stack.Screen 
          name="modalProduct" 
          options={{ presentation: 'modal', title: 'Detalhes do Produto' }} 
        />
        {/* -------------------------------------------------- */}
        
        <Stack.Screen 
          name="modalCheckout" 
          options={{ presentation: 'modal', title: 'Pedido Enviado!' }} 
        />
      </Stack>
    </CartProvider>
  );
}