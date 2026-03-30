import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginView from './src/views/auth/LoginView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigation from './src/navigation/AppNavigation';
import { useEffect } from 'react';
import BootSplash from "react-native-bootsplash";

const queryCliente = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    // Esta función se ejecuta cuando el componente App se monta
    const init = async () => {
      // Aquí podrías cargar datos de tu base de datos o verificar sesión
      // Por ahora, simplemente ocultamos el splash
    };

    init().finally(async () => {
      // Ocultamos el splash con un efecto de fade (desvanecido)
      await BootSplash.hide({ fade: true });
      console.log("Bootsplash listo y oculto");
    });
  }, []);
  return (

    <QueryClientProvider client={queryCliente}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppNavigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
