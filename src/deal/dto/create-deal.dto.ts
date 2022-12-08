import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDealDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsBoolean()
  @IsNotEmpty()
  isNegotiable: boolean;

  @IsNumber()
  @IsNotEmpty()
  dealerID: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  original_price?: string;

  @IsNumber()
  @IsNotEmpty()
  categoryID: number;

  @IsArray()
  @IsNotEmpty()
  images: string[];
}
