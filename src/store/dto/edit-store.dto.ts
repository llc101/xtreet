import { IsOptional, IsString } from 'class-validator';

export class EditStoreDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  banner?: string;
}
