import { z } from "zod";

export const MenuResponse = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});
export type MenuResponse = z.infer<typeof MenuResponse>;

export const MenusResponse = z.array(MenuResponse);
export type MenusResponse = z.infer<typeof MenusResponse>;
