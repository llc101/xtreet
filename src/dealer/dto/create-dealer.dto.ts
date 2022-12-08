import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDealerDto {
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
