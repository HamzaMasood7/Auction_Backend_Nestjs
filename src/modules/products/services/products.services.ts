import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { StatusType } from 'src/modules/user/constants/user';
import { CreateProductDto } from '../dto/create-product.dto';
import { RoleType } from '@prisma/client';
import { UserInterface } from 'src/modules/user/interface/user.interface';
import { UpdateProductDto } from '../dto/update-product.dto';

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

  async updateProduct(
    productId: number,
    updateProductDto: UpdateProductDto,
    loggedInUser: UserInterface,
  ) {
    const existingProduct = await this.findProductById(productId);

    if (
      existingProduct.SellerId !== loggedInUser.id &&
      loggedInUser.role !== RoleType.SuperAdmin
    ) {
      throw new BadRequestException(
        'User does not have permission to update this product',
      );
    }

    // Perform the update
    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: updateProductDto,
    });

    return updatedProduct;
  }

  async deleteProduct(productId: number, loggedInUser: UserInterface) {
    // Check if the product exists
    const existingProduct = await this.findProductById(productId);

    // Check if the logged-in user has permission to delete the product
    if (
      existingProduct.SellerId !== loggedInUser.id &&
      loggedInUser.role !== RoleType.SuperAdmin
    ) {
      throw new BadRequestException(
        'User does not have permission to delete this product',
      );
    }

    // Perform the delete
    const deletedProduct = await this.prisma.product.delete({
      where: { id: productId },
    });

    return deletedProduct;
  }

  async getAllUserProducts(loggedInUser: UserInterface) {
    const userProducts = await this.prisma.product.findMany({
      where: { SellerId: loggedInUser.id },
    });

    if (!userProducts || userProducts.length === 0) {
      throw new NotFoundException('No products found for the user');
    }

    return userProducts;
  }

  async getProductsByStatus(status: StatusType) {
    // Retrieve all products with the specified status
    const productsByStatus = await this.prisma.product.findMany({
      where: { status },
    });

    if (!productsByStatus || productsByStatus.length === 0) {
      throw new NotFoundException(`No products found with status: ${status}`);
    }

    return productsByStatus;
  }

  async createProducts(data: any) {
    const product = await this.prisma.product.create({ data });
    return product;
  }

  async findProductById(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return product;
  }
}
