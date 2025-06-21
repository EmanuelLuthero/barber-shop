import { expoDb } from '../client';
import { Migration } from '@lib/types/migrations';
import uuid from 'react-native-uuid';
import { BarberModel } from '@infra/models/BarberModel';

const tableName = 'barbers';

const data: BarberModel[] = [
  {
    id: uuid.v4(),
    name: 'Jardel',
  },
  {
    id: uuid.v4(),
    name: 'Carlos',
  },
  {
    id: uuid.v4(),
    name: 'Leo',
  },
];

const tableExists = () => {
  const result = expoDb.getAllSync(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`
  );

  return result.length > 0;
};

export const barberMigrations: Migration[] = [
  {
    tableName: tableName,
    name: 'Create Barber Table',
    operation: () => {
      expoDb.execSync(`
          CREATE TABLE IF NOT EXISTS ${tableName} (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL
          );
        `);
    },
  },
  {
    tableName: tableName,
    name: 'Insert Initial Barbers',
    operation: () => {
      const isTableExists = tableExists();

      if (!isTableExists) {
        console.log(`Table ${tableName} does not exist. Aborting initial data insert.`);
        return;
      }

      const barbers = expoDb.getAllSync(`SELECT * FROM ${tableName};`);
      console.log(`Barbers found: ${barbers.length}`);
      const isDataInserted = expoDb.getAllSync(`SELECT * FROM ${tableName};`).length > 0;
      if (!isDataInserted) {
        return initialMigrationInsert();
      }
    },
  },
];

const initialMigrationInsert = () => {
  expoDb.execSync(`
      INSERT INTO ${tableName} (id, name) VALUES
      ${data.map((barber) => `('${barber.id}', '${barber.name}')`).join(', ')};
    `);
};
