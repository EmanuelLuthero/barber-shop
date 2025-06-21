import { TouchableOpacity, Image, Text, View } from 'react-native';
import { menuImage } from '@lib/assets/menus';

type Props = {
  name: string;
  price: number;
};

export const MenuCard: React.FC<Props> = ({ name, price }) => {
  const MenuImage = menuImage[name];
  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <TouchableOpacity className="gap-2">
      <Image source={MenuImage} className="h-40 w-40 rounded-lg object-cover opacity-60" />

      <View className="gap-1">
        <Text className="text-white">{name}</Text>
        <Text className="font-extrabold text-white">{formattedPrice}</Text>
      </View>
    </TouchableOpacity>
  );
};
