import { plainToClass } from 'class-transformer';

export abstract class BaseDto {
  abstract id: number;
  abstract created_at: Date;
  abstract updated_at: Date;
  static plainToClass<T extends BaseDto>(
    this: new (...args: any[]) => T,
    data: Partial<T>,
  ): T {
    return plainToClass(this, data);
  }
}
