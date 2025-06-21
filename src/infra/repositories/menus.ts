import { expoDb } from '@infra/database/client';
import { MenuModel } from '@infra/models/MenuModel';

export const listMenus = async () => {
  try {
    return expoDb.getAllAsync<MenuModel>(`SELECT * FROM menus ORDER BY price DESC;`);
  } catch (error) {
    console.error('Error listing menus:', error);
    throw new Error('Failed to list menus');
  }
};
