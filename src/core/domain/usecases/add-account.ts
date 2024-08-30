import { AddAccountDto } from "../models/add-account.dto";

export abstract class AddAccount {
  abstract add(account: AddAccountDto): Promise<boolean>;
}
