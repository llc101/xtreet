import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
