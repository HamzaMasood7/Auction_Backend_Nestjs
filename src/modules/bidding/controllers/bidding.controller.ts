import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

import { Controller, UseGuards } from '@nestjs/common';
import { BiddingService } from '../services/bidding.services';

@UseGuards(JwtAuthGuard)
@Controller('Auction')
export class BiddingController {
  constructor(private biddingService: BiddingService) {}
}
