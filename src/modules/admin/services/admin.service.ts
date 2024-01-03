import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { RoleType, UserType } from 'src/modules/user/constants/user';
import { UserRegistrationDto } from 'src/modules/user/dto/registration.dto';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { GeneratorProvider } from 'src/common/providers/generator.povider';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async registerAdmin(userRegistrationDto: UserRegistrationDto) {
    const { phone, email } = userRegistrationDto;

    // check if user exists
    const [phoneExists, emailExists] = await Promise.all([
      this.prisma.user.findUnique({ where: { phone } }),
      this.prisma.user.findUnique({ where: { email } }),
    ]);

    if (phoneExists || emailExists) {
      throw new BadRequestException('User Already Exists');
    }

    const salt = crypto.randomBytes(48).toString('hex');
    const hashedPassword = bcrypt.hashSync(
      userRegistrationDto.password + salt,
      10,
    );

    userRegistrationDto.salt = salt;
    userRegistrationDto.password = hashedPassword;
    userRegistrationDto.type = UserType.ADMIN;
    userRegistrationDto.role = RoleType.SUPERADMIN;

    userRegistrationDto.uuid = GeneratorProvider.uuid();
    const user = await this.authService.createUser(userRegistrationDto);

    return {
      message: 'Registered Successfully',
      data: await this.authService.serializeUserProfile(user),
    };
  }
}
