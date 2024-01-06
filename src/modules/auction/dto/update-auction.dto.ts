import {
  IsInt,
  IsDateString,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class UpdateAuctionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsDateString()
  exact;
  startTime: Date;

  @IsOptional()
  @IsDateString()
  endTime: Date;

  @IsOptional()
  @IsInt()
  minimumBids: number;
}
