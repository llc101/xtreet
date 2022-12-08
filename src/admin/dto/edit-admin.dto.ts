import { IsString, IsEmail, IsOptional } from 'class-validator';

export class EditAdminDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  mobile?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
