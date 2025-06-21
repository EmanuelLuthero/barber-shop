import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@components/Form';
import { FormConfig } from '@lib/types/form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IntroductionParamList } from '@navigations/stacks/IntroductionStack';
import { SignupInput } from '@lib/schemas/SignupInput';
import { EmailFormInput } from './form-items/EmailFormInput';
import { PasswordFormInput } from './form-items/PasswordFormInput';
import { NameFormInput } from './form-items/NameFormInput';
import { View, Text } from 'react-native';
import { CheckIcon } from '@components/icons/CheckIcon';
import { createUser } from '@services/users/create';
import { useToast } from '@lib/hooks/toast';

type NavigationProps = NativeStackNavigationProp<IntroductionParamList>;

export const SignupForm: React.FC = () => {
  const { showToast } = useToast();
  const navigation = useNavigation<NavigationProps>();

  const form = useForm<SignupInput>({
    resolver: zodResolver(SignupInput),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const config: FormConfig<typeof SignupInput> = {
    form: form,
    items: {
      name: {
        label: 'Nome',
        Component: NameFormInput,
      },
      email: {
        label: 'Email',
        Component: EmailFormInput,
      },
      password: {
        label: 'Senha',
        Component: PasswordFormInput,
      },
      confirmPassword: {
        label: 'Confirmar Senha',
        Component: PasswordFormInput,
        FieldSummary: FieldSummary,
      },
    },
  };

  const handleSubmit = async (input: SignupInput) => {
    const { error } = await createUser(input);
    if (error) {
      console.log('Erro ao criar usuário:', error);
      return showToast({ type: 'error', title: 'Ocorreu um erro!', message: error });
    }

    navigation.navigate('home-screen');
  };

  return <Form className="gap-6" config={config} buttonLabel="Entrar" onSubmit={handleSubmit} />;
};

const FieldSummary: React.FC = () => (
  <View className="mt-4 gap-2">
    <FieldSummaryItem label="Pelo menos 8 caracteres" />
    <FieldSummaryItem label="Letras maiusculas e minusculas" />
    <FieldSummaryItem label="Pelo menos 1 caractere especial (como ! @ # $ %)" />
  </View>
);

export const FieldSummaryItem: React.FC<{ label: string }> = ({ label }) => (
  <View className="flex-row items-center gap-1">
    <CheckIcon className="h-6 w-6" />
    <Text className="font-medium text-white">{label}</Text>
  </View>
);
