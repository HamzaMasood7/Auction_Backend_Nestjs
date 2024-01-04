import { IsEnum, IsOptional } from 'class-validator';
import { StatusType } from 'src/modules/user/constants/user';

export class ProductsQueryDto {
  @IsOptional()
  @IsEnum(StatusType, { message: 'Invalid status' })
  status?: StatusType;
}
