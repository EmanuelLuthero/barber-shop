import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeWrapper } from '@navigations/wrappers/HomeWrapper';
import { SchedulesWrapper } from '@navigations/wrappers/SchedulesWrapper';
import { BarberSelectorWrapper } from '@navigations/wrappers/BarberSelectorWrapper';

export type HomeParamList = {
  'introduction-screen': undefined;
  home: undefined;
  'barber-selector': undefined;
  schedules: undefined;
};

const HomeStack = createNativeStackNavigator<HomeParamList>();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="home" component={HomeWrapper} />
      <HomeStack.Screen name="barber-selector" component={BarberSelectorWrapper} />
      <HomeStack.Screen name="schedules" component={SchedulesWrapper} />
    </HomeStack.Navigator>
  );
};
