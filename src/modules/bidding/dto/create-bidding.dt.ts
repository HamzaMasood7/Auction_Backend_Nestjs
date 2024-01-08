import { IsInt, Min } from 'class-validator';

export class CreateBidDto {
  @IsInt()
  @Min(1)
  amount: number;

  @IsInt()
  @Min(1)
  productId: number;
}
