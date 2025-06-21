import { expoDb } from '@infra/database/client';
import { UserModel } from '@infra/models/UserModel';

import { CreateUserInput } from '@lib/schemas/inputs/CreateUserInput';

export const saveUser = async (input: CreateUserInput) => {
  try {
    await expoDb.withTransactionAsync(async () => {
      expoDb.execAsync(`
          INSERT INTO users (id, name, email, password)
          VALUES ('${input.id}', '${input.name}', '${input.email}', '${input.password}');
      `);
    });

    return await expoDb.getFirstAsync<UserModel>(`SELECT * FROM users WHERE id = ?`, [input.id]);
  } catch (e) {
    console.error('Falha ao salvar usuário', e);
  }
};

export const getUserById = async (id: string) => {
  try {
    return await expoDb.getFirstAsync<UserModel>(`SELECT * FROM users WHERE id = ?`, [id]);
  } catch (e) {
    console.error('Falha ao buscar usuário por ID', e);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await expoDb.getFirstAsync<UserModel>(`SELECT * FROM users WHERE email = ?`, [email]);
  } catch (e) {
    console.error('Falha ao buscar usuário por email', e);
  }
};
