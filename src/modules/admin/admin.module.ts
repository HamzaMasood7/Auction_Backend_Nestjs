import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AdminController } from './controller/admin.cotroller';
import { AdminService } from './services/admin.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/services/auth.service';
import { jwtFactory } from '../auth/config/jwt.config';

@Module({
  imports: [JwtModule.registerAsync(jwtFactory)],
  providers: [PrismaService, AdminService, JwtService, AuthService],
  controllers: [AdminController],
})
export class AdminModule {}
