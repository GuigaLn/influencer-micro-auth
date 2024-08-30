// src/core/infra/repositories/account-repository-impl.ts
import { AccountRepository } from "@/core/domain/repositories/account-repository";

export class AccountRepositoryImpl implements AccountRepository {
  async checkByEmail(email: string): Promise<boolean> {
    return true;
  }
}
