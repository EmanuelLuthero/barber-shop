import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { registerRootComponent } from 'expo';
import { AuthProvider } from '@lib/contexts/AuthContext';
import { navigationRef } from '@navigations/NavigationRoot';
import { MigratorExecutor } from '@infra/database/executor';
import { NavigationContainer } from '@react-navigation/native';

import Layout from './screens/Layout';
import Toast from 'react-native-toast-message';

const App: React.FC = () => {
  const { success, error } = MigratorExecutor.run();

  if (error) {
    console.error('Migration error:', error);
  } else if (success) {
    console.log('Migrations completed successfully');
  }

  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <Layout />
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
};
export default registerRootComponent(App);
