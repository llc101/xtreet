import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOneStoreDto {
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

  @IsNumber()
  @IsNotEmpty()
  ownerID: number;

  @IsBoolean()
  isPublic: boolean;
}
