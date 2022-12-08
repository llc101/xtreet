import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRateDto {
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  dealID: number;
}
