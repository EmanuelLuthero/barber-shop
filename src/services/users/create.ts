import { generateToken } from '@infra/jwt';
import { saveSession } from '@lib/session';
import { compareHash, generateHash } from '@lib/utils/password';
import { ServiceResponse } from '@lib/types/services';
import { SignupInput } from '@lib/schemas/SignupInput';
import { getUserByEmail, saveUser } from '@infra/repositories/user';
import { CreateUserInput } from '@lib/schemas/inputs/CreateUserInput';
import uuid from 'react-native-uuid';
import { LoginInput } from '@lib/schemas/LoginInput';

export const createUser = async (signupInput: SignupInput): Promise<ServiceResponse<string>> => {
  try {
    const user = await getUserByEmail(signupInput.email);
    if (user) {
      return { error: 'Email já cadastrado' };
    }

    const password = await generateHash(signupInput.password);
    const input = CreateUserInput.parse({
      id: uuid.v4(),
      name: signupInput.name,
      email: signupInput.email,
      password: password,
    });

    const newUser = await saveUser(input);
    if (!newUser) {
      return { error: 'Falha ao criar usuário' };
    }

    console.log('Usuário criado com sucesso', newUser);

    const token = await generateToken(newUser.id);
    await saveSession(token);

    return { data: token };
  } catch (error) {
    console.log('Erro ao criar usuário:', error);

    return { error: 'Ocorreu um erro inesperado' };
  }
};

export const loginUser = async (input: LoginInput): Promise<ServiceResponse<string>> => {
  try {
    const user = await getUserByEmail(input.email);
    if (!user) {
      return { error: 'Login ou senha invalidos' };
    }

    const isValidPassword = await compareHash(input.password, user.password);
    if (!isValidPassword) {
      return { error: 'Login ou senha invalidos' };
    }

    const token = await generateToken(user.id);
    await saveSession(token);

    return { data: token };
  } catch (error) {
    console.log('Erro ao fazer login:', error);
    return { error: 'Ocorreu um erro inesperado' };
  }
};
