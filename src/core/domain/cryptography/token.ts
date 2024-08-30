export abstract class Token {
  abstract sign(payload: string): Promise<string>;
}
