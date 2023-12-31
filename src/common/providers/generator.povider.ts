import { config } from 'dotenv';
import { v1 as uuid } from 'uuid';

config();

export class GeneratorProvider {
  static uuid(): string {
    return uuid();
  }
}
