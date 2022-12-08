import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditAdvertDto {
  @IsString()
  @IsOptional()
  start?: string;

  @IsString()
  @IsOptional()
  end?: string;

  @IsString()
  @IsOptional()
  banner?: string;

  @IsNumber()
  @IsOptional()
  productID?: number;

  @IsNumber()
  @IsOptional()
  isRunning?: boolean;

  @IsNumber()
  @IsOptional()
  dealID?: number;
}
