import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BiddingService {
  constructor(private prisma: PrismaService) {}
}
