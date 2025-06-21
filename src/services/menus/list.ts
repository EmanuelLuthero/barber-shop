import { ServiceResponse } from '@lib/types/services';
import { MenusResponse } from '@lib/schemas/outputs/MenuResponse';
import * as repository from '@infra/repositories/menus';

export const listMenus = async (): Promise<ServiceResponse<MenusResponse>> => {
  try {
    const menus = await repository.listMenus();
    const response = MenusResponse.parse(menus);

    return { data: response };
  } catch (error) {
    console.error('Error listing menus:', error);
    return { error: 'Failed to list menus' };
  }
};
