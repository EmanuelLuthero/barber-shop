import { AvatarIcon } from '@components/icons/AvatarIcon';
import { ExitIcon } from '@components/icons/ExitIcon';
import { UserResponse } from '@lib/schemas/outputs/UserResponse';
import { HomeParamList } from '@navigations/stacks/HomeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  user?: UserResponse;
  logout: () => void;
};

type NavigationProps = NativeStackNavigationProp<HomeParamList>;

export const UserSummary: React.FC<Props> = ({ user, logout }) => {
  const navigation = useNavigation<NavigationProps>();

  const onExit = () => {
    logout();

    navigation.navigate('introduction-screen');
  };

  return (
    <View className="gap-12">
      <View className="flex-row items-center gap-4">
        <View className="rounded-full bg-neutral-base p-2">
          <AvatarIcon className="h-12 w-12" />
        </View>

        <View className="flex-row items-center gap-12">
          <View className="gap-2">
            <Text className="text-2xl font-extrabold text-white">
              Olá, {user?.name.split(' ')[0] || 'Usuário'} 👋🏻
            </Text>
            <Text className="capitalize text-white">
              {new Intl.DateTimeFormat('pt-BR', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              }).format(new Date())}
            </Text>
          </View>

          <View className="items-center gap-1 self-center">
            <TouchableOpacity
              className="items-center rounded-full bg-neutral-base p-2"
              onPress={onExit}>
              <ExitIcon className="h-6 w-6" />
            </TouchableOpacity>

            <Text className="text-sm font-bold text-white">Sair</Text>
          </View>
        </View>
      </View>

      <View className="h-40 justify-between rounded-xl border border-neutral-soft bg-neutral-dark p-6">
        <Text className="text-xl font-bold text-white">Horários</Text>

        <View className="items-start gap-1">
          <Text className="text-base font-bold text-white">Segunda a sexta</Text>
          <Text className="text-base  text-white">9h às 19h</Text>
        </View>
      </View>
    </View>
  );
};
