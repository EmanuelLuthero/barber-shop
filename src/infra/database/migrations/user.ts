import { expoDb } from '../client';
import { Migration } from '@lib/types/migrations';

const tableName = 'users';

export const usersMigrations: Migration[] = [
  {
    tableName: tableName,
    name: 'Create Users Table',
    operation: () => {
      expoDb.execSync(`
          CREATE TABLE IF NOT EXISTS ${tableName} (
            id TEXT PRIMARY KEY,
            name TEXT,
            email TEXT,
            password TEXT
          );
        `);
    },
  },
];
