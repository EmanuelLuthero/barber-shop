import { ClockIcon } from '@components/icons/ClockIcon';
import { ScheduleIcon } from '@components/icons/ScheduleIcon';
import { barberImage } from '@lib/assets/barbers';
import { useSession } from '@lib/hooks/session';
import { SchedulesResponse } from '@lib/schemas/outputs/ScheduleResponse';
import { UserResponse } from '@lib/schemas/outputs/UserResponse';
import { listSchedules } from '@services/schedules/list';
import { getUserByToken } from '@services/users/get-by-token';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

export default function SchedulesScreen() {
  const { token, loading } = useSession();
  const [user, setUser] = useState<UserResponse>();
  const [schedules, setSchedules] = useState<SchedulesResponse>([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const response = await getUserByToken(token);
        if (response.data) {
          setUser(response.data);
        }
      }
    };

    const fetchSchedules = async () => {
      if (user) {
        const { data } = await listSchedules(user.id);

        setSchedules(data!);
      }
    };

    if (!loading) {
      fetchUser();
      fetchSchedules();
    }
  }, [token, loading, user]);

  if (loading || !user) {
    return (
      <View className="h-full">
        <ActivityIndicator color="#ffffff" className="self-center" size="large" />
      </View>
    );
  }

  return (
    <View className="gap-6">
      <View className="gap-1">
        <Text className="text-xl font-bold text-white">Meus Agendamentos</Text>
        <Text className="w-2/3 text-white">
          Organize sua agenda e fique no estilo na hora certa.
        </Text>
      </View>

      <View className="gap-2">
        {schedules.length > 0 ? (
          schedules.map(({ schedule, barber }, index) => {
            const BarberImage = barberImage[barber.name];

            return (
              <View key={index} className="mb-2 flex-row gap-4 rounded-lg bg-neutral-dark p-4">
                <View>
                  <Image
                    source={BarberImage}
                    className="h-16 w-16 rounded-full"
                    resizeMode="cover"
                  />
                </View>

                <View className="gap-2">
                  <Text className="font-bold text-white">{barber.name}</Text>

                  <View className="flex-row items-center gap-2">
                    <ScheduleIcon className="h-5 w-5" />
                    <Text className="text-white">
                      {new Date(schedule.date).toLocaleDateString()}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <ClockIcon className="h-5 w-5" />
                    <Text className="text-white">
                      {new Date(schedule.date).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <Text className="text-xl font-bold text-white">Nenhum agendamento encontrado.</Text>
        )}
      </View>
    </View>
  );
}
