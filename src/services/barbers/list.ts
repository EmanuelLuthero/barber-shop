import * as repository from '@infra/repositories/barbers';
import { BarbersResponse } from '@lib/schemas/outputs/BarberResponse';
import { ServiceResponse } from '@lib/types/services';

export const listBarbers = async (): Promise<ServiceResponse<BarbersResponse>> => {
  try {
    const barbers = await repository.listBarbers();
    const response = BarbersResponse.parse(barbers);

    return { data: response };
  } catch (error) {
    console.log('Error listing barbers:', error);
    return { error: 'Houve um erro ao listar os barbeiros' };
  }
};
