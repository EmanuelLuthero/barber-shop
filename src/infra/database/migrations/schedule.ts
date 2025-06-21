import { expoDb } from '../client';
import { Migration } from '@lib/types/migrations';

const tableName = 'schedules';

export const schedulesMigrations: Migration[] = [
  {
    tableName: tableName,
    name: 'Create Schedule Table',
    operation: () => {
      expoDb.execSync(`
          CREATE TABLE IF NOT EXISTS ${tableName} (
            id TEXT PRIMARY KEY,
            barberId TEXT NOT NULL,
            userId TEXT NOT NULL,
            menuId TEXT NOT NULL,
            date TEXT NOT NULL,
            FOREIGN KEY (barberId) REFERENCES barbers(id),
            FOREIGN KEY (userId) REFERENCES users(id)
            FOREIGN KEY (menuId) REFERENCES menus(id)
          );
        `);
    },
  },
];
