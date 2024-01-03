import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { StatusType } from 'src/modules/user/constants/user';
import { CreateProductDto } from '../dto/create-product.dto';
import { RoleType } from '@prisma/client';
import { UserInterface } from 'src/modules/user/interface/user.interface';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(
    createProductDto: CreateProductDto,
    loggedInUser: UserInterface,
  ) {
    if (loggedInUser.role !== RoleType.Seller) {
      throw new BadRequestException(
        'User does not have access to create product',
      );
    }
    const productInfo = {
      ...createProductDto,
      SellerId: loggedInUser.id,
      status: StatusType.LIVE,
    };

    const product = await this.createProducts(productInfo);

    return product;
  }

  async deleteProduct() {}

  async getProductFromId() {}

  async getAllUserProducts() {}

  async getLiveProducts() {}

  async createProducts(data: any) {
    const product = await this.prisma.product.create({ data });
    return product;
  }
}
