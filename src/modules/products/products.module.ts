import { Module } from '@nestjs/common';
import { ProductService } from './services/products.services';
import { ProductController } from './controllers/products.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [],
  providers: [ProductService, PrismaService],
  controllers: [ProductController],
})
export class ProductModule {}
