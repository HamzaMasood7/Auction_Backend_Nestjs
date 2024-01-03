import { IsString, IsArray, IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  images: string[];

  @IsInt()
  @Min(0)
  minimumBid: number;
}
