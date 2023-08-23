import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { AuthContextProvider } from '@contexts/AuthContext';
import { Routes } from './src/routes';

LogBox.ignoreAllLogs(true)
export default function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <StatusBar style='light' backgroundColor='#000' />

      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
