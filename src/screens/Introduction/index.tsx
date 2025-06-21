import Logo from '@assets/images/logo.png';

import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IntroductionParamList } from '@navigations/stacks/IntroductionStack';
import { useSession } from '@lib/hooks/session';
import { useEffect } from 'react';

type NavigationProps = NativeStackNavigationProp<IntroductionParamList>;

export default function IntrodutionScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { token, loading } = useSession();

  useEffect(() => {
    if (token) {
      navigation.navigate('home-screen');
    }
  }, [token, navigation]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#fff" className="flex-1 items-center justify-center" />
    );
  }

  return (
    <View className="gap-12">
      <View className="gap-12">
        <Image source={Logo} width={0} height={0} className="h-40 w-40 self-center rounded-full" />

        <View className="gap-2">
          <Text className="text-center text-2xl font-extrabold text-white">
            Bem-vindo (a) à barbearia West Coast
          </Text>

          <Text className="text-wrap text-center text-base font-light text-white">
            Entre na sua conta ou cadastre-se para garantir aquele corte de respeito!
          </Text>
        </View>
      </View>

      <View className="gap-6">
        <Button label="Já tenho uma conta" onPress={() => navigation.navigate('login')} />
        <Button
          label="Ainda não tenho conta"
          onPress={() => navigation.navigate('signup')}
          variant="transparent"
          hasBorder
        />
      </View>
    </View>
  );
}
