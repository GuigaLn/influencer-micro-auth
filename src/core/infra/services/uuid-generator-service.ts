import { v4 as uuidv4 } from "uuid";
import { UUIDGenerator } from "@/core/domain/services/uuid-generator";

export class UUIDGeneratorService implements UUIDGenerator {
  generate(): string {
    return uuidv4();
  }
}
