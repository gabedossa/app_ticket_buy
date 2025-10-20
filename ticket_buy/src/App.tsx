import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './app/Screens/HomePage/HomeScreen';
import LoginScreen from './app/Screens/LoginScreen/LoginScreen';

type RootStackParamList = {
  Login: undefined;
  Home: { userId: string };
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;




// --- NAVEGADOR PRINCIPAL ---
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

