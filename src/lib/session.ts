import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@west-coast:token';

export async function saveSession(token: string) {
  try {
    await AsyncStorage.setItem(key, token);
  } catch (e) {
    console.error('Falha ao salvar token', e);
  }
}

export async function getSession(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error('Falha ao ler token', e);
    return null;
  }
}

export async function removeSession() {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Falha ao remover token', e);
  }
}
