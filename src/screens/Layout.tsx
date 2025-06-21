import '../lib/styles/global.css';

import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AreaView } from '@components/AreaView';
import { HomeStackNavigator } from '@navigations/stacks/HomeStack';
import { IntroductionStackNavigator } from '@navigations/stacks/IntroductionStack';
import { BottomTab } from '@components/BottomTab';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <AreaView className="flex-1 bg-neutral-ultra-dark">
      <View className="flex-1 justify-between ">
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <BottomTab {...props} />}>
          <Tab.Screen name="introduction-screen" component={IntroductionStackNavigator} />
          <Tab.Screen name="home-screen" component={HomeStackNavigator} />
        </Tab.Navigator>
      </View>
    </AreaView>
  );
}
