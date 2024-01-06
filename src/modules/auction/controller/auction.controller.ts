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
import { AdminGuard } from 'src/modules/admin/guards/admin.guard';

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

  @UseGuards(AdminGuard)
  @Patch('admin/approve/:auctionId')
  async approveAuction(
    @Param('auctionId', ParseIntPipe) id: number,
    @User() user: any,
  ) {
    const res = await this.auctionService.approveAuction(id, user);

    return res;
  }

  @Patch(':id')
  async updateAuction(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuctionDto: any,
    @User() user: any,
  ) {
    const res = await this.auctionService.updateAuction(
      id,
      updateAuctionDto,
      user,
    );

    return res;
  }

  @Get('live')
  async getLiveAuctions() {
    const res = await this.auctionService.getLiveAuctions();
    return res;
  }

  @UseGuards(AdminGuard)
  @Get('all')
  async getAllAuctions() {
    const res = await this.auctionService.getAllAuctions();

    return res;
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteAuction(
    @Param('id', ParseIntPipe) id: number,
    @User() user: any,
  ) {
    const res = await this.auctionService.deleteAuction(id, user);

    return res;
  }
}
