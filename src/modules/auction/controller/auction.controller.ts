import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AuctionService } from '../services/auction.services';
import { User } from 'src/decorators/user.decorator';
import { CreateAuctionDto } from '../dto/create-auction.dto';

@UseGuards(JwtAuthGuard)
@Controller('Auction')
export class AuctionController {
  constructor(private auctionService: AuctionService) {}

  @Post('create')
  async createAuction(
    @Body() createAuctionDto: CreateAuctionDto,
    @User() user: any,
  ) {
    const res = await this.auctionService.createAuction(createAuctionDto, user);

    return res;
  }

  @Patch('admin/approve/:auctionId')
  async approveAuction(
    @Param('auctionId', ParseIntPipe) id: number,
    @User() user: any,
  ) {
    const res = await this.auctionService.approveAuction(id, user);

    return res;
  }

  @Post(':auctionId/add-product/:productId')
  async addProductToAuction(
    @Param('auctionId', ParseIntPipe) auctionId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const res = await this.auctionService.addProductToAuction(
      auctionId,
      productId,
    );

    return res;
  }

  @Patch('deleteProduct/:auctionId/:productId')
  async deleteProductFromAuction(
    @Param('auctionId', ParseIntPipe) auctionId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const res = await this.auctionService.deleteProductFromAuction(
      auctionId,
      productId,
    );
    return res;
  }

  @Delete()
  deleteAuction() {}

  @Get()
  getAuction() {}

  @Get()
  getAllUserAuctions() {}

  @Patch()
  updateAuction() {}

  @Get()
  getAuctionByStatus() {}
}
