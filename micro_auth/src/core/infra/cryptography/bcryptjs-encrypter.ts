// infra/cryptography/bcrypt-encrypter.ts
import * as bcryptjs from "bcryptjs";
import { Encrypter } from "@/core/domain/cryptography/encrypter";

export class BcryptEncrypter implements Encrypter {
  private readonly salt: number = 12;

  async encrypt(value: string): Promise<string> {
    return bcryptjs.hash(value, this.salt);
  }

  async compare(value: string, encryptedValue: string): Promise<boolean> {
    return bcryptjs.compare(value, encryptedValue);
  }
}
