import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AuctionService } from './services/auction.services';
import { AuctionController } from './controller/auction.controller';

@Module({
  imports: [],
  providers: [AuctionService, PrismaService],
  controllers: [AuctionController],
})
export class AuctionModule {}
