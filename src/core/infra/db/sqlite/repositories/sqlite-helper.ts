import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

class SqliteHelper {
  private async initDatabase(): Promise<
    Database<sqlite3.Database, sqlite3.Statement>
  > {
    const database = await open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });

    // Cria a tabela se não existir
    await database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT,
        password TEXT
      )
    `);

    return database;
  }

  async getDatabase(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
    return this.initDatabase();
  }
}

export const getSqliteHelper = async () => {
  const sqliteHelper = new SqliteHelper();
  return sqliteHelper.getDatabase();
};
