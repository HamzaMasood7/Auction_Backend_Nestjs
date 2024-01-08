// src/modules/auction/services/bidding.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { StatusType } from 'src/modules/user/constants/user';
import { CreateBidDto } from '../dto/create-bidding.dt';
import { UserInterface } from 'src/modules/user/interface/user.interface';

@Injectable()
export class BiddingService {
  constructor(private prisma: PrismaService) {}

  async createBid(createBidDto: CreateBidDto, loggedInUser: UserInterface) {
    const bidderId = loggedInUser.id;
    const { productId, amount } = createBidDto;

    // Start a transaction
    const result = await this.prisma.$transaction(async (prisma) => {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      if (product.status !== StatusType.LIVE) {
        throw new BadRequestException(
          `Product with ID ${productId} is not live for bidding`,
        );
      }

      // Check if the bid amount is greater than the current maximum bid
      if (product.MaximumBid && amount <= product.MaximumBid) {
        throw new BadRequestException(
          `Bid must be greater than the current maximum bid`,
        );
      }

      const bid = await prisma.bids.create({
        data: {
          amount,
          BidderId: bidderId,
          productId,
          bidTime: new Date(),
        },
      });

      // Update the maximum bid and bid time in the Product model
      await prisma.product.update({
        where: { id: productId },
        data: {
          MaximumBid: amount,
          timeBid: new Date(),
          winnerId: bidderId,
        },
      });

      return bid;
    });

    // Transaction is automatically committed if no exceptions are thrown
    return result;
  }
}
