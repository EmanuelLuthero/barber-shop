import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@components/Form';
import { FormConfig } from '@lib/types/form';
import { LoginInput } from '@lib/schemas/LoginInput';
import { EmailFormInput } from './form-items/EmailFormInput';
import { PasswordFormInput } from './form-items/PasswordFormInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IntroductionParamList } from '@navigations/stacks/IntroductionStack';
import { loginUser } from '@services/users/create';
import { useToast } from '@lib/hooks/toast';

type NavigationProps = NativeStackNavigationProp<IntroductionParamList>;

export const LoginForm: React.FC = () => {
  const { showToast } = useToast();
  const navigation = useNavigation<NavigationProps>();

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginInput),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const config: FormConfig<typeof LoginInput> = {
    form: form,
    items: {
      email: {
        Component: EmailFormInput,
        label: 'Email',
      },
      password: {
        Component: PasswordFormInput,
        label: 'Senha',
      },
    },
  };

  const handleSubmit = async (input: LoginInput) => {
    const { error } = await loginUser(input);
    if (error) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return showToast({
        type: 'error',
        title: 'Erro ao fazer login',
        message: error,
      });
    }

    navigation.navigate('home-screen');
  };

  return <Form config={config} buttonLabel="Entrar" onSubmit={handleSubmit} />;
};
