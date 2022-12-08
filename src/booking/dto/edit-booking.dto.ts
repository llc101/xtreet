import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditBookingDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsObject()
  @IsOptional()
  address?: object;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsBoolean()
  @IsOptional()
  isDelivered?: boolean;

  @IsString()
  @IsOptional()
  payment_type?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsNumber()
  @IsOptional()
  productID?: number;

  @IsNumber()
  @IsOptional()
  dealID?: number;
}
