import { UseCase } from "../protocols/usecase";

interface Input {
  name: string;
  email: string;
  password: string;
}

export abstract class AddAccount implements UseCase<Input, boolean> {
  abstract perform: (account: Input) => Promise<boolean>;
}
