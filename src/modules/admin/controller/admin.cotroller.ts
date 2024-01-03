import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { UserRegistrationDto } from 'src/modules/user/dto/registration.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('create-admin')
  async createAdmin(@Body() userRegistration: UserRegistrationDto) {
    const { message, data } = await this.adminService.registerAdmin(
      userRegistration,
    );

    return { message, data };
  }
}
