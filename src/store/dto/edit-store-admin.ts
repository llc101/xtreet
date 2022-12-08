import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class EditStoreAdminDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsString()
  @IsOptional()
  banner?: string;
}
