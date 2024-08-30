export abstract class AccountRepository {
  abstract checkByEmail(email: string): Promise<boolean>;
}
