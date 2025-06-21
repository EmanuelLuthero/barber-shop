import { BarberModel } from '@infra/models/BarberModel';
import { ScheduleModel } from '@infra/models/ScheduleModel';
import { getBarbersByIds } from '@infra/repositories/barbers';
import { getSchedulesByUserId } from '@infra/repositories/schedules';
import { SchedulesResponse } from '@lib/schemas/outputs/ScheduleResponse';
import { ServiceResponse } from '@lib/types/services';

export const listSchedules = async (
  userId: string
): Promise<ServiceResponse<SchedulesResponse>> => {
  try {
    const schedules = await getSchedulesByUserId(userId);
    const barberIds = schedules.map((schedule) => schedule.barberId);

    const barbers = await getBarbersByIds(barberIds);

    const userSchedules: { schedule: ScheduleModel; barber: BarberModel }[] = [];
    for (const barber of barbers) {
      for (const schedule of schedules) {
        if (schedule.barberId === barber.id) {
          userSchedules.push({ schedule, barber });
        }
      }
    }

    if (!userSchedules.length) {
      return { data: SchedulesResponse.parse([]) };
    }

    const response = SchedulesResponse.parse(userSchedules);

    return { data: response };
  } catch (error) {
    console.error('Error listing schedules:', error);
    return { data: [] };
  }
};
