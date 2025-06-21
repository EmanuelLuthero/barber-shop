import { expoDb } from '@infra/database/client';
import { BarberModel } from '@infra/models/BarberModel';
import { ScheduleModel } from '@infra/models/ScheduleModel';
import { CreateScheduleInput } from '@lib/schemas/inputs/CreateScheduleInput';

export const saveSchedule = async (schedule: CreateScheduleInput) => {
  const { id, barberId, userId, menuId, date } = schedule;
  console.log('DATA', schedule.date);

  const query = `
    INSERT INTO schedules (id, barberId, userId, menuId, date)
    VALUES ('${id}', '${barberId}', '${userId}', '${menuId}', '${date.toISOString()}');
  `;

  try {
    await expoDb.execAsync(query);
    return await expoDb.getFirstAsync<ScheduleModel>(
      `SELECT * FROM schedules WHERE id = ? LIMIT 1;`,
      [id]
    );
  } catch (error) {
    console.error('Error saving schedule:', error);
  }
};

export const getSchedulesByUserId = async (userId: string) => {
  try {
    return await expoDb.getAllAsync<ScheduleModel>(
      `SELECT * FROM schedules as schedules 
       WHERE userId = ?;`,
      [userId]
    );
  } catch (error) {
    console.error('Error fetching schedules by user ID:', error);
    return [];
  }
};
