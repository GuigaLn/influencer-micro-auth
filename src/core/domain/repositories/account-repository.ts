import { AddAccountDto } from "../models/add-account.dto";

export abstract class AccountRepository {
  abstract checkByEmail(email: string): Promise<boolean>;
  abstract add(account: AddAccountDto): Promise<boolean>;
}
