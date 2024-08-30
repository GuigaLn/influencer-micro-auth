import { AccountRepository } from "@/core/domain/repositories/account-repository";
import { getSqliteHelper } from "./sqlite-helper";
import { AddAccountDto } from "@/core/domain/models/add-account.dto";

export class AccountRepositorySqlite implements AccountRepository {
  async checkByEmail(email: string): Promise<boolean> {
    const database = await getSqliteHelper();
    const row = await database.get("SELECT 1 FROM users WHERE email = ?", [
      email,
    ]);
    return !!row;
  }

  async add(account: AddAccountDto): Promise<boolean> {
    const database = await getSqliteHelper();
    const sql = await database.prepare(`
      INSERT INTO users (id, name, email, password)
      VALUES (?, ?, ?, ?)
    `);
    const row = await sql.run(
      "e",
      account.name,
      account.email,
      account.password,
    );
    return !!row;
  }
}
