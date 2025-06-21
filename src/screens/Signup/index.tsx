import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '@components/BackButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IntroductionParamList } from '@navigations/stacks/IntroductionStack';
import {SignupForm} from './_components/SignupForm';

type NavigationProps = NativeStackNavigationProp<IntroductionParamList>;

export default function SignupScreen() {
  const navigation = useNavigation<NavigationProps>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View className="gap-8">
      <View className="gap-6 p-4">
        <BackButton onPress={handleBackPress} className="self-start" />

        <View className="gap-2">
          <Text className="text-2xl font-extrabold text-white">Crie uma conta</Text>
          <Text className="text-lg text-white">
            Informe seus dados e comece a agendar seus serviços com facilidade!
          </Text>
        </View>
      </View>

      <View className="h-full rounded-t-xl border-t border-neutral-base bg-neutral-dark p-6 pt-12">
        <SignupForm />
      </View>
    </View>
  );
}
