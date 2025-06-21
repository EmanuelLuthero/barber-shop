import { extractIdFromToken } from '@infra/jwt';
import { getUserById } from '@infra/repositories/user';
import { UserResponse } from '@lib/schemas/outputs/UserResponse';
import { ServiceResponse } from '@lib/types/services';

export const getUserByToken = async (token: string): Promise<ServiceResponse<UserResponse>> => {
  const id = extractIdFromToken(token);

  if (!id) {
    return { error: 'Invalid token' };
  }

  const user = await getUserById(id);
  if (!user) {
    return { error: 'User not found' };
  }

  const response = UserResponse.parse(user);

  return { data: response };
};
