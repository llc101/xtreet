import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @IsNotEmpty()
  address: object;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  payment_type: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsOptional()
  productID?: number;

  @IsNumber()
  @IsOptional()
  dealID?: number;
}
