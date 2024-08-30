import { AddAccount } from "@/core/domain/usecases/add-account";
import { AddAccountDto } from "@/core/domain/models/add-account.dto";
import { AccountRepository } from "@/core/domain/repositories/account-repository";

export class AddAccountData implements AddAccount {
  constructor(private readonly accountRepository: AccountRepository) {}

  async add(account: Omit<AddAccountDto, "id">): Promise<boolean> {
    const checkByEmail = await this.accountRepository.checkByEmail(
      account.email,
    );
    if (checkByEmail) {
      return false;
    }
    return true;
  }
}
