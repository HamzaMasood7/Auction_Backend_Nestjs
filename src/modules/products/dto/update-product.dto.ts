import {
  IsString,
  IsArray,
  IsInt,
  Min,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  minimumBid?: number;
}
