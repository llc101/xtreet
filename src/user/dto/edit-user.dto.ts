import { IsString, IsEmail, IsOptional } from 'class-validator';

export class EditUserDto {
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
