import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginWrapper } from '@navigations/wrappers/LoginWrapper';
import { SignupWrapper } from '@navigations/wrappers/SignupWrapper';
import { IntroductionWrapper } from '@navigations/wrappers/IntroductionWrapper';

export type IntroductionParamList = {
  introduction: undefined;
  'home-screen': undefined;
  login: undefined;
  signup: undefined;
};

const IntroductionStack = createNativeStackNavigator<IntroductionParamList>();

export const IntroductionStackNavigator = () => {
  return (
    <IntroductionStack.Navigator screenOptions={{ headerShown: false }}>
      <IntroductionStack.Screen name="introduction" component={IntroductionWrapper} />
      <IntroductionStack.Screen name="login" component={LoginWrapper} />
      <IntroductionStack.Screen name="signup" component={SignupWrapper} />
    </IntroductionStack.Navigator>
  );
};
