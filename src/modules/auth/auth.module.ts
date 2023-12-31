import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controller/auth.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtFactory } from './config/jwt.config';

@Module({
  imports: [JwtModule.registerAsync(jwtFactory)],
  providers: [AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
