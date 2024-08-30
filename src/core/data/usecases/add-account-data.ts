import { AddAccount } from "@/core/domain/usecases/add-account";
import { AddAccountDto } from "@/core/domain/models/add-account.dto";

export class AddAccountData extends AddAccount {
  async add(account: AddAccountDto): Promise<boolean> {
    return true;
  }
}
