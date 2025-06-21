import { BackButton } from '@components/BackButton';
import { HomeParamList } from '@navigations/stacks/HomeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarbersResponse } from '@lib/schemas/outputs/BarberResponse';
import { useEffect, useState } from 'react';
import { listBarbers } from '@services/barbers/list';
import { BarberCard } from '@components/BarberCard';
import { getUserByToken } from '@services/users/get-by-token';
import { useSession } from '@lib/hooks/session';
import { UserResponse } from '@lib/schemas/outputs/UserResponse';

type NavigationProps = NativeStackNavigationProp<HomeParamList>;

export default function BarberSelectorScreen() {
  const { token, loading } = useSession();
  const navigation = useNavigation<NavigationProps>();
  const [barbers, setBarbers] = useState<BarbersResponse>([]);
  const [user, setUser] = useState<UserResponse>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByToken(token!);
      setUser(user.data);
    };

    const fetchBarbers = async () => {
      const { data, error } = await listBarbers();
      if (!data) {
        console.error('Erro ao listar barbeiros:', error);
        return;
      }

      setBarbers(data);
    };

    fetchBarbers();

    if (!loading) {
      fetchUser();
    }
  });

  const handleBack = () => {
    navigation.goBack();
  };

  if (loading || !user) {
    return <Text className="text-white">Carregando...</Text>;
  }

  return (
    <View className="gap-6">
      <BackButton className="self-start" onPress={handleBack} />
      <View className="gap-2">
        <Text className="text-2xl font-extrabold text-white">Selecione um barbeiro</Text>
        <Text className="w-2/3 text-white">Selecione um barbeiro de sua preferencia.</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-4">
          {barbers.map((barber) => (
            <BarberCard key={barber.id} id={barber.id} name={barber.name} user={user!} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
