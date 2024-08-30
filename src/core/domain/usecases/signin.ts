import { SigninDto } from "../models/signin.dto";

export abstract class Signin {
  abstract auth(signin: SigninDto): Promise<{ name: string; token: string }>;
}
