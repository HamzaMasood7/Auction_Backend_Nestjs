import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { BiddingService } from './services/bidding.services';
import { BiddingController } from './controllers/bidding.controller';

@Module({
  imports: [],
  providers: [BiddingService, PrismaService],
  controllers: [BiddingController],
})
export class BiddingModule {}
