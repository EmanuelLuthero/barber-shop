export type Migration = {
  name: string;
  tableName: string;
  operation: () => void;
};
