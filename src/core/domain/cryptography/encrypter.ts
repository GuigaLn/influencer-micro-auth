export interface Encrypter {
  encrypt(value: string): Promise<string>;
  compare(value: string, encryptedValue: string): Promise<boolean>;
}
