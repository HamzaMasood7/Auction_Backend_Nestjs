import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BiddingService } from '../services/bidding.services';
import { CreateBidDto } from '../dto/create-bidding.dt';
import { User } from 'src/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('bid')
export class BiddingController {
  constructor(private biddingService: BiddingService) {}

  @Post('create')
  async createBid(@Body() createBidDto: CreateBidDto, @User() user: any) {
    return this.biddingService.createBid(createBidDto, user);
  }
}
