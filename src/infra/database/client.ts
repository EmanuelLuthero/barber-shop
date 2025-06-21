import { openDatabaseSync } from 'expo-sqlite';

export const expoDb = openDatabaseSync('database.db');
