import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../services/products.services';
import { CreateProductDto } from '../dto/create-product.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsQueryDto } from '../dto/status-product.dto';

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

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
    @User() user: any,
  ) {
    const res = await this.productService.updateProduct(
      productId,
      updateProductDto,
      user,
    );
    return res;
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseIntPipe) productId: number,
    @User() user: any,
  ) {
    const res = await this.productService.deleteProduct(productId, user);
    return res;
  }

  @Get('/id/:id')
  async getProductById(@Param('id', ParseIntPipe) productId: number) {
    const res = await this.productService.findProductById(productId);
    return res;
  }

  @Get('')
  async getAllUserProducts(@User() user: any) {
    const res = await this.productService.getAllUserProducts(user);
    return res;
  }

  @Get('/admin')
  async getProductsByStatus(@Query() query: ProductsQueryDto) {
    const res = await this.productService.getProductsByStatus(query.status);
    return res;
  }
}
