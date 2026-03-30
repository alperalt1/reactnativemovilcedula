import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuthStore } from '../store/auth/useAuthStore';
import LoginView from '../views/auth/LoginView';
import RegistrarseView from '../views/auth/RegistrarseView';
import HomeView from '../views/home/HomeView';
import { TabNavigation } from './TabNavigation';
import CedulaView from '../views/history/CedulaView';
import TerminosCondicionesView from '../views/profile/TerminosCondicionesView';
import CentroAyudaView from '../views/profile/CentroAyudaView';
import PoliticasPrivacidadView from '../views/profile/PoliticasPrivacidadView';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  console.log("HIDRATACIÓN STATUS:", {
    user: user?.name || 'Vaciío',
    token: token ? 'OK' : 'Vaciío'
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
      >
        {
          user && token ? (
            <Stack.Group>
              <Stack.Screen name='MainTabs' component={TabNavigation} options={{ headerShown: false }} />
              <Stack.Screen name='CedulaView' component={CedulaView} options={{ headerShown: false }} />
              <Stack.Screen name='TerminosCondicionesView' component={TerminosCondicionesView} options={{ headerShown: false }} />
              <Stack.Screen name='CentroAyudaView' component={CentroAyudaView} options={{ headerShown: false }} />
              <Stack.Screen name='PoliticasPrivacidadView' component={PoliticasPrivacidadView} options={{ headerShown: false }} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name='LoginView' component={LoginView} options={{ headerShown: false }} />
              <Stack.Screen name='RegistrarseView' component={RegistrarseView} options={{ headerShown: false }} />
            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation