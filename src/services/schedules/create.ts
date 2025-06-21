import uuid from 'react-native-uuid';

import { CreateScheduleInput } from '@lib/schemas/inputs/CreateScheduleInput';
import { saveSchedule } from '@infra/repositories/schedules';
import { ServiceResponse } from '@lib/types/services';
import { ScheduleModel } from '@infra/models/ScheduleModel';

export const createSchedule = async (
  barberId: string,
  userId: string,
  menuId: string,
  date: Date
): Promise<ServiceResponse<ScheduleModel>> => {
  const input = CreateScheduleInput.parse({
    id: uuid.v4(),
    barberId: barberId,
    userId: userId,
    menuId: menuId,
    date: date,
  });

  try {
    const schedule = await saveSchedule(input);
    if (!schedule) {
      throw new Error('Failed to create schedule');
    }
    return { data: schedule };
  } catch (error) {
    console.error('Error creating schedule:', error);
    return { error: 'Failed to create schedule' };
  }
};
