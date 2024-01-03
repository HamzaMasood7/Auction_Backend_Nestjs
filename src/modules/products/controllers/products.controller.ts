import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../services/products.services';
import { CreateProductDto } from '../dto/create-product.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @User() user: any,
  ) {
    const res = await this.productService.createProduct(createProductDto, user);

    return res;
  }

  @Delete()
  deleteProduct() {}

  @Get()
  getProduct() {}

  @Get()
  getAllUserProducts() {}

  @Patch()
  updateProduct() {}

  @Get()
  getProductByStatus() {}
}
