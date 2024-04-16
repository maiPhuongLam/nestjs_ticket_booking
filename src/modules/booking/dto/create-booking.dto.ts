import { IsArray, IsInt, IsNotEmpty } from "class-validator"
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, ValidationOptions } from 'class-validator';

@ValidatorConstraint({ name: 'isArrayNumbers', async: false })
class IsArrayNumbersConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!Array.isArray(value)) {
      return false;
    }
    return value.every(item => typeof item === 'number');
  }

  defaultMessage(args: ValidationArguments) {
    return 'Each element in the array must be a number.';
  }
}

function IsArrayNumbers(validationOptions?: ValidationOptions) {
  console.log(validationOptions);
  
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsArrayNumbersConstraint,
    });
  };
}

export class CreateBookingDto {
  @IsNotEmpty()
  @IsInt()
  showId: number

  @IsNotEmpty()
  @IsArray()
  @IsArrayNumbers()
  seats: number[]

  constructor(showId: number, seats: number[]) {
    this.showId = showId;
    this.seats = seats;
  }
}
