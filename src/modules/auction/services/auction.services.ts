import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAuctionDto } from '../dto/create-auction.dto';
import { UserInterface } from 'src/modules/user/interface/user.interface';
import { RoleType } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StatusType } from 'src/modules/user/constants/user';

@Injectable()
export class AuctionService {
  constructor(private prisma: PrismaService) {}

  async createAuction(
    createAuctionDto: CreateAuctionDto,
    loggedInUser: UserInterface,
  ) {
    if (loggedInUser.role === RoleType.Buyer) {
      throw new BadRequestException('Buyer cannot create Auction');
    }

    createAuctionDto.startTime = new Date(createAuctionDto.startTime);
    createAuctionDto.endTime = new Date(createAuctionDto.endTime);

    const { startTime, endTime } = createAuctionDto;

    const currentTime = new Date();

    if (startTime <= currentTime) {
      throw new BadRequestException(
        'Start time must be greater than the current time',
      );
    }

    // Validate end time
    if (endTime <= startTime) {
      throw new BadRequestException(
        'End time must be greater than the start time',
      );
    }

    // Minimum duration of 1 hour
    const minimumEndTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    if (endTime < minimumEndTime) {
      throw new BadRequestException('Auction duration must be at least 1 hour');
    }

    const auctionInfo = {
      ...createAuctionDto,
      sellerId: loggedInUser.id,
      isApproved: loggedInUser.role === RoleType.SuperAdmin,
    };

    const auction = await this.prisma.auction.create({
      data: auctionInfo,
    });

    return auction;
  }

  async approveAuction(id: number, loggedInUser: UserInterface) {
    if (loggedInUser.role !== RoleType.SuperAdmin) {
      throw new BadRequestException('Admin can only approve Auction');
    }
    const existingAuction = await this.findAuctionById(id);

    const currentTime = new Date();
    if (existingAuction.endTime <= currentTime) {
      throw new BadRequestException('Auction end time has already passed');
    }

    const updatedAuction = await this.prisma.auction.update({
      where: { id },
      data: { isApproved: true },
    });

    return {
      message: `Auction with ID ${id} has been approved`,
      updatedAuction,
    };
  }

  async findAuctionById(id: number) {
    const auction = await this.prisma.auction.findUnique({
      where: { id },
    });

    if (!auction) {
      throw new NotFoundException(`Auction with ID ${id} not found`);
    }

    return auction;
  }

  async addProductToAuction(auctionId: number, productId: number) {
    const auction = await this.findAuctionById(auctionId);

    if (auction.startTime <= new Date()) {
      // Auction has started, update product status to live
      await this.prisma.product.update({
        where: { id: productId },
        data: { status: StatusType.LIVE },
      });
    }

    // Add the product to the auction
    const updatedAuction = await this.prisma.auction.update({
      where: { id: auctionId },
      data: { products: { set: [...(auction.products || []), productId] } },
    });

    return updatedAuction;
  }

  async deleteProductFromAuction(auctionId: number, productId: number) {
    const auction = await this.findAuctionById(auctionId);

    // Remove the product ID from the array of products
    const updatedAuction = await this.prisma.auction.update({
      where: { id: auctionId },
      data: {
        products: {
          set: (auction.products || []).filter((id) => id !== productId),
        },
      },
    });

    // Update the product status to notActive
    await this.prisma.product.update({
      where: { id: productId },
      data: { status: StatusType.NOTACTIVE },
    });

    return updatedAuction;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async updateLiveAuctions() {
    const currentTime = new Date();

    const res = await this.prisma.auction.updateMany({
      where: {
        isApproved: true,
        startTime: { gte: currentTime },
        // endTime: { lt: currentTime },
        isLive: false,
      },
      data: { isLive: true },
    });

    console.log(res);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async UnLiveAuctions() {
    const currentTime = new Date();

    const res = await this.prisma.auction.updateMany({
      where: {
        endTime: { lt: currentTime },
        isLive: true,
      },
      data: { isLive: false },
    });
    console.log(res);
  }
}
