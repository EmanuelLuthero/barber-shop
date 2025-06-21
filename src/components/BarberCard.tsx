import {
  TouchableOpacity,
  Image,
  Text,
  View,
  Modal,
  ImageSourcePropType,
  ScrollView,
} from 'react-native';

import { barberImage } from '@lib/assets/barbers';
import { useEffect, useState } from 'react';
import { AreaView } from './AreaView';
import { getAllHoursFromRange, getCurrentDateMonthDays, getDayName } from '@lib/utils/date';
import { cn } from '@lib/utils/tailwind';
import { MenusResponse } from '@lib/schemas/outputs/MenuResponse';
import { listMenus } from '@services/menus/list';
import { Button } from './Button';
import { UserResponse } from '@lib/schemas/outputs/UserResponse';
import { createSchedule } from '@services/schedules/create';

type Props = {
  id: string;
  name: string;
  user: UserResponse;
};

export const BarberCard: React.FC<Props> = ({ id, name, user }) => {
  const [isVisible, setIsVisible] = useState(false);
  const BarberImage = barberImage[name];

  return (
    <TouchableOpacity onPress={() => setIsVisible(true)}>
      <Image source={BarberImage} className="h-52 w-52 rounded-lg opacity-60" />
      <View className="absolute inset-x-0 bottom-2">
        <Text className=" text-center font-extrabold text-white">{name}</Text>
      </View>
      <BarberModal
        id={id}
        name={name}
        userId={user.id}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        BarberImage={BarberImage}
      />
    </TouchableOpacity>
  );
};

const BarberModal: React.FC<{
  id: string;
  name: string;
  userId: string;
  BarberImage: ImageSourcePropType;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}> = ({ id, name, userId, isVisible, setIsVisible, BarberImage }) => {
  const [menus, setMenus] = useState<MenusResponse>([]);

  const [selectedHour, setSelectedHour] = useState<number>();
  const [selectedDay, setSelectedDay] = useState<number>();
  const [selectedMenu, setSelectedMenu] = useState<string>();

  const days = getCurrentDateMonthDays();
  const months = getAllHoursFromRange(9, 19);
  const disabled = !selectedMenu || !selectedDay || !selectedHour;

  useEffect(() => {
    const fetchMenus = async () => {
      const { data, error } = await listMenus();
      if (!data) {
        console.error('Erro ao listar menus:', error);
        return;
      }

      setMenus(data);
    };

    fetchMenus();
  }, []);

  const handleConfirm = async () => {
    const date = new Date();
    date.setDate(selectedDay!);
    date.setHours(selectedHour!);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const schedule = await createSchedule(id, userId, selectedMenu!, date);
    console.log('Horário agendado com sucesso:', schedule);

    setIsVisible(false);
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <AreaView className="rounded-t-2xl">
        <ScrollView className="h-full">
          <View className="self-center">
            <Image source={BarberImage} className="h-80 w-80 rounded-lg" />

            <View className="absolute inset-x-0 -left-12 bottom-2">
              <Text className="text-start text-3xl font-extrabold text-black">{name || ''}</Text>
            </View>
          </View>

          <View className="h-full gap-8 rounded-t-2xl bg-neutral-dark p-4">
            <Text className="text-xl font-extrabold text-white">Agende seu corte ✂️</Text>
            <View className="gap-2">
              <Text className="text-xl font-bold capitalize text-white">
                {new Intl.DateTimeFormat('pt-BR', {
                  month: 'long',
                }).format(new Date())}
              </Text>

              <Text className="font-bold text-white">Escolha um dia</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-3">
                  {days.map((day, index) => (
                    <View
                      key={index}
                      className={cn(
                        'rounded-lg border border-neutral-soft bg-transparent p-2 px-5',
                        {
                          'border-2 border-primary-soft': selectedDay === day,
                        }
                      )}>
                      <TouchableOpacity
                        key={day}
                        className="items-center"
                        onPress={() => setSelectedDay(day)}>
                        <Text className="text-lg font-bold text-white">
                          {day.toString().padStart(2, '0')}
                        </Text>
                        <Text className="text-sm text-white">{getDayName(day)}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View className="gap-3">
              <Text className="font-bold text-white">Escolha um horário</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-3">
                  {months.map((hour, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedHour(hour)}
                      className={cn(
                        'rounded-lg border border-neutral-soft bg-transparent p-2 px-5',
                        {
                          'border-2 border-primary-soft': selectedHour === hour,
                        }
                      )}>
                      <Text className="text-lg font-bold text-white">{hour}:00</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View className="gap-3">
              <Text className="font-bold text-white">Escolha o serviço</Text>
              {menus.map((menu, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedMenu(menu.id)}
                  className={cn(
                    'h-20 justify-center gap-1 rounded-lg border border-neutral-soft bg-transparent p-2 px-5',
                    {
                      'border-2 border-primary-soft': selectedMenu === menu.id,
                    }
                  )}>
                  <Text className=" text-white">{menu.name}</Text>
                  <Text className=" font-bold text-white">R$ {menu.price.toFixed(2)}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="border-t border-neutral-soft" />
            <Button
              disabled={disabled}
              label="Confirmar"
              className={cn({ 'opacity-50': disabled })}
              onPress={handleConfirm}
            />
          </View>
        </ScrollView>
      </AreaView>
    </Modal>
  );
};
