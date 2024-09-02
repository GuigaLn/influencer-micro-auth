import { Signin } from "@/core/domain/usecases/signin";
import { SigninDto } from "@/core/domain/models/signin.dto";
import { AccountRepository } from "@/core/domain/repositories/account-repository";
import { Encrypter } from "@/core/domain/cryptography/encrypter";
import { Token } from "@/core/domain/cryptography/token";

export class SigninData implements Signin {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly encrypter: Encrypter,
    private readonly token: Token,
  ) {}

  async auth({
    email,
    password,
  }: SigninDto): Promise<{ id: string; name: string; token: string } | null> {
    const account = await this.accountRepository.getEmail(email);
    if (!account) {
      return null;
    }

    const isValidPassword = await this.encrypter.compare(
      password,
      account.password,
    );
    if (!isValidPassword) {
      return null;
    }

    const accessToken = await this.token.sign({ sub: account.id });

    return {
      id: account.id,
      name: account.name,
      token: accessToken,
    };
  }
}
