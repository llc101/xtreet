import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAdvertDto {
  @IsString()
  @IsNotEmpty()
  start: string;

  @IsString()
  @IsNotEmpty()
  end: string;

  @IsString()
  @IsOptional()
  banner?: string;
  
  @IsBoolean()
  @IsOptional()
  isRunning?: boolean;
}
