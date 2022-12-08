import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFeedDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  feed: string;

  @IsNumber()
  @IsNotEmpty()
  dealID: number;
}
