import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsOptional()
  banner?: string;
}
