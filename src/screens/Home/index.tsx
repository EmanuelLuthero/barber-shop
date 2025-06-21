import { BarbersResponse } from '@lib/schemas/outputs/BarberResponse';
import { listBarbers } from '@services/barbers/list';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MenuResponse } from '@lib/schemas/outputs/MenuResponse';
import { listMenus } from '@services/menus/list';
import { MenuCard } from './_components/MenuCard';
import { getUserByToken } from '@services/users/get-by-token';
import { useSession } from '@lib/hooks/session';
import { UserResponse } from '@lib/schemas/outputs/UserResponse';
import { UserSummary } from './_components/UserSummary';
import { BarberCard } from '@components/BarberCard';

export default function Home() {
  const { token, logout, loading } = useSession();
  const [user, setUser] = useState<UserResponse>();
  const [barbers, setBarbers] = useState<BarbersResponse>([]);
  const [menus, setMenus] = useState<MenuResponse[]>([]);
  const [isLoadingResponses, setIsLoadingResponses] = useState(true);

  useEffect(() => {
    const fetchBarbers = async () => {
      if (token) {
        const { data } = await getUserByToken(token);
        setUser(data);
      }

      const barbersResponse = await listBarbers();
      const menuResponse = await listMenus();

      if (barbersResponse.error) {
        console.log('Erro ao listar barbeiros:', barbersResponse.error);
      }
      if (menuResponse.error) {
        console.log('Erro ao listar menus:', menuResponse.error);
      }

      if (barbersResponse.data && menuResponse.data) {
        setBarbers(barbersResponse.data);
        setMenus(menuResponse.data);
      }
      setIsLoadingResponses(false);
    };

    fetchBarbers();
  }, [token]);

  if (isLoadingResponses || loading || !user) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View className="gap-12">
      <UserSummary user={user} logout={logout} />

      <View className="gap-2">
        <Text className="text-xl font-bold text-white">Seu próximo horário</Text>
        <View className="h-32 rounded-lg border border-neutral-soft bg-neutral-dark">
          <View className="flex-1 items-center justify-center">
            <Text className="text-base font-bold text-white">
              Você ainda não possui horários agendados...
            </Text>
          </View>
        </View>
      </View>

      <View className="gap-8">
        <View className="gap-2">
          <Text className="text-xl font-bold text-white">Serviços disponíveis</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4">
              {menus.map((menu, index) => (
                <MenuCard key={index} name={menu.name} price={menu.price} />
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="gap-2">
          <Text className="text-xl font-bold text-white">Conheça os barbeiros</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {barbers.map((barber, index) => (
                <BarberCard key={index} id={barber.id} name={barber.name} user={user!} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
