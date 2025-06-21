import { expoDb } from './client';
import { Migration } from '@lib/types/migrations';
import { menuMigrations } from './migrations/menu';
import { usersMigrations } from './migrations/user';
import { barberMigrations } from './migrations/barber';
import { schedulesMigrations } from './migrations/schedule';

const migrations: Migration[] = [
  ...barberMigrations,
  ...usersMigrations,
  ...menuMigrations,
  ...schedulesMigrations,
];

export const MigratorExecutor = {
  run: () => {
    for (const migration of migrations) {
      try {
        migration.operation();
      } catch (error) {
        console.log(`Error applying migration ${migration.name}:`, error);
        return { success: false, error: error };
      }
    }

    return { success: true, error: null };
  },

  reset: () => {
    for (const migration of migrations) {
      try {
        expoDb.execSync(`DROP TABLE IF EXISTS ${migration.tableName};`);
      } catch (error) {
        console.log(`Error reseting migration ${migration.name}:`, error);
        return { success: false, error: error };
      }
    }

    console.log('All migrations reset successfully');
    return { success: true, error: null };
  },
};
