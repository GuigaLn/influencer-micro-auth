import jwt from "jsonwebtoken";
import { Token } from "@/core/domain/cryptography/token";
import { env } from "@/core/shared/config/env";

export class JsonwebTokenAdpter implements Token {
  async sign(payload: string): Promise<string> {
    return jwt.sign(payload, env.JWT_SECRET);
  }
}
