export abstract class Token {
  abstract sign(payload: string | Buffer | object): Promise<string>;
}
