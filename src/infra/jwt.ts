import { JwtPayload } from '@lib/types/jwt';
import jwt, { HeaderOptions, SupportedAlgorithms } from 'expo-jwt';

const tokenSecret = process.env.TOKEN_SECRET || 'defaultSecret';

const getHours = (hours: number): number => Math.floor(Date.now() / 1000) + hours * 60 * 60;

export const generateToken = async (userId: string): Promise<string> => {
  const payload = {
    sub: userId,
    exp: getHours(24),
  };

  const header: HeaderOptions = { alg: SupportedAlgorithms.HS256 };

  return jwt.encode(payload, tokenSecret, header);
};

export const extractIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwt.decode<JwtPayload>(token, tokenSecret);
    return decoded.sub || null;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}

export function getTokenExpiration(token: string): number {
  const decoded = jwt.decode<JwtPayload>(token, tokenSecret);

  return decoded.exp * 1000; // converte pra milisegundos
}
