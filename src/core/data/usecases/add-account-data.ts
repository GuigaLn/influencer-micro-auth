import { AddAccount } from "@/core/domain/usecases/add-account";
import { AddAccountDto } from "@/core/domain/models/add-account.dto";
import { AccountRepository } from "@/core/domain/repositories/account-repository";
import { Encrypter } from "@/core/domain/cryptography/encrypter";
import { UUIDGenerator } from "@/core/domain/services/uuid-generator";

export class AddAccountData implements AddAccount {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly encrypter: Encrypter,
    private readonly uuidGenerator: UUIDGenerator,
  ) {}

  async add({
    name,
    email,
    password,
  }: Omit<AddAccountDto, "id">): Promise<boolean> {
    const checkByEmail = await this.accountRepository.checkByEmail(email);
    if (checkByEmail) {
      return false;
    }

    const uuid = this.uuidGenerator.generate();
    const hashedPassword = await this.encrypter.encrypt(password);
    const account: AddAccountDto = {
      id: uuid,
      name,
      email,
      password: hashedPassword,
    };

    const created = await this.accountRepository.add(account);
    return created;
  }
}
