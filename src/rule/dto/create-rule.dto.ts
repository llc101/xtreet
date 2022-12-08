import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  rules: string[];

  @IsNumber()
  @IsNotEmpty()
  dealID: number;
}
