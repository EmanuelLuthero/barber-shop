import { View, Text } from 'react-native';
import { LoginForm } from './_components/LoginForm';
import { BackButton } from '@components/BackButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IntroductionParamList } from '@navigations/stacks/IntroductionStack';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<IntroductionParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View className="px-4 pt-4">
        <BackButton onPress={handleBackPress} className="self-start" />
      </View>

      <View className="gap-6">
        <View className="gap-8 self-center p-4">
          <View className="gap-2 p-2">
            <Text className="text-2xl font-extrabold text-white">Entre com seus dados</Text>
            <Text className="text-wrap text-lg text-white">
              Entre com seus dados e bora garantir seu horário!
            </Text>
          </View>
        </View>

        <View className="h-full rounded-t-xl border-t border-neutral-base bg-neutral-dark p-6 pt-12">
          <LoginForm />
        </View>
      </View>
    </View>
  );
}
