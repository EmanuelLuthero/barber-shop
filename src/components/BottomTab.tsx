import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { HomeIcon } from './icons/HomeIcon';
import { ScheduleIcon } from './icons/ScheduleIcon';
import { PlusIcon } from './icons/PlusIcon';

enum NestedRouteNames {
  HOME = 'home',
  BARBER_SELECTOR = 'barber-selector',
  SCHEDULE = 'schedules',
}
export const BottomTab: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const isIntroductionScreen = state.index === 0;
  const focusedRoute = state.routes[state.index];
  const nestedRoute = focusedRoute.state;
  const focusedNestedRoute =
    nestedRoute && nestedRoute.index ? nestedRoute.routes[nestedRoute.index] : null;

  const route = focusedNestedRoute?.name || NestedRouteNames.HOME;

  const handlePress = (nested: string) => {
    navigation.navigate('home-screen', {
      screen: nested,
    });
  };

  return isIntroductionScreen ? null : (
    <View className="flex-row items-center justify-between rounded-t-3xl bg-neutral-dark p-8">
      <TouchableOpacity
        className="flex items-center"
        onPress={() => handlePress(NestedRouteNames.HOME)}>
        <HomeIcon className="h-6 w-6" filled={route === NestedRouteNames.HOME} />
      </TouchableOpacity>

      <TouchableOpacity
        className="flex items-center"
        onPress={() => handlePress(NestedRouteNames.BARBER_SELECTOR)}>
        <View className="items-center rounded-full bg-primary-soft p-2">
          <PlusIcon className="h-6 w-6" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex items-center"
        onPress={() => handlePress(NestedRouteNames.SCHEDULE)}>
        <ScheduleIcon
          className="h-6 w-6"
          filled={route === NestedRouteNames.SCHEDULE}
        />
      </TouchableOpacity>
    </View>
  );
};
