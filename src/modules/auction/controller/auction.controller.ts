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
