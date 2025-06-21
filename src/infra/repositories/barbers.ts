import { expoDb } from '@infra/database/client';
import { BarberModel } from '@infra/models/BarberModel';

export const listBarbers = async () => {
  try {
    return expoDb.getAllAsync<BarberModel>(`SELECT * FROM barbers;`);
  } catch (error) {
    console.error('Error listing barbers:', error);
    throw new Error('Failed to list barbers');
  }
};

export const getBarbersByIds = async (ids: string[]) => {
  try {
    return expoDb.getAllAsync<BarberModel>(
      `SELECT * FROM barbers WHERE id IN (${ids.map(() => '?').join(', ')});`,
      ids
    );
  } catch (error) {
    console.error('Error fetching barber by ID:', error);
    throw new Error('Failed to fetch barber by ID');
  }
};
