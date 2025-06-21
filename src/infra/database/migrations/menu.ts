import uuid from 'react-native-uuid';

import { MenuModel } from '@infra/models/MenuModel';
import { Migration } from '@lib/types/migrations';
import { expoDb } from '../client';

const tableName = 'menus';

const data: MenuModel[] = [
  {
    id: uuid.v4(),
    name: 'Corte de cabelo',
    price: 35.0,
  },
  {
    id: uuid.v4(),
    name: 'Barba',
    price: 25.0,
  },
  {
    id: uuid.v4(),
    name: 'Limpeza de rosto',
    price: 30.0,
  },
];

const tableExists = () => {
  const result = expoDb.getAllSync(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`
  );

  return result.length > 0;
};

export const menuMigrations: Migration[] = [
  {
    tableName: tableName,
    name: 'Create Menu Table',
    operation: () => {
      expoDb.execSync(`
          CREATE TABLE IF NOT EXISTS ${tableName} (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            price DECIMAL(10,2) NOT NULL
          );
        `);
    },
  },
  {
    tableName: tableName,
    name: 'Insert Initial Menus',
    operation: () => {
      const isTableExists = tableExists();

      if (!isTableExists) {
        console.log(`Table ${tableName} does not exist. Aborting initial data insert.`);
        return;
      }

      const menus = expoDb.getAllSync(`SELECT * FROM ${tableName};`);
      console.log(`Menus found: ${menus.length}`);
      const isDataInserted = expoDb.getAllSync(`SELECT * FROM ${tableName};`).length > 0;
      if (!isDataInserted) {
        return initialMigrationInsert();
      }
    },
  },
];

const initialMigrationInsert = () => {
  expoDb.execSync(`
      INSERT INTO ${tableName} (id, name, price) VALUES
      ${data.map((menu) => `('${menu.id}', '${menu.name}', ${menu.price})`).join(', ')};
    `);
};
