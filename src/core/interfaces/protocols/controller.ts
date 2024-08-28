import { Response } from "./http";

export abstract class Controller<T> {
  abstract perform(input: T): Promise<Response>;
}
