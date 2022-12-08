import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditDealDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsBoolean()
  @IsOptional()
  isNegotiable?: boolean;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  original_price?: string;

  @IsNumber()
  @IsOptional()
  categoryID?: number;

  @IsArray()
  @IsOptional()
  images?: string[];
}
