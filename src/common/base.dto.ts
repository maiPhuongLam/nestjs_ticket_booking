import { plainToClass } from 'class-transformer';

export abstract class BaseDto {
  abstract id: number;
  abstract createdAt: Date;
  abstract updatedAt: Date;
  static plainToClass<T extends BaseDto>(
    this: new (...args: any[]) => T,
    data: Partial<T>,
  ): T {
    return plainToClass(this, data);
  }
}
