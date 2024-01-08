import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { UserRegistrationDto } from 'src/modules/user/dto/registration.dto';

import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { GeneratorProvider } from 'src/common/providers/generator.povider';
import { plainToClass } from 'class-transformer';
import { UserSerialization } from '../serialization/user.serialization';
import { UserType } from 'src/modules/user/constants/user';
import { UserLoginDto } from 'src/modules/user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async registration(userRegistrationDto: UserRegistrationDto) {
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
    userRegistrationDto.type = UserType.MEMBER;

    userRegistrationDto.uuid = GeneratorProvider.uuid();
    const user = await this.createUser(userRegistrationDto);
    const userObj = {
      uuid: user.uuid,
      role: user.role,
      type: user.type,
    };
    const token = await this.jwtService.signAsync({ userObj });
    return {
      message: 'Registered Successfully',
      data: await this.serializeUserProfile(user),
      token,
    };
  }

  async login(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new NotFoundException('User not found');

    const { salt } = user;
    const isPasswordMatch = await bcrypt.compare(
      password + salt,
      user.password,
    );

    if (!isPasswordMatch) throw new NotFoundException('User not found');
    const userObj = {
      uuid: user.uuid,
      role: user.role,
      type: user.type,
    };
    const token = await this.jwtService.signAsync({ userObj });
    return {
      message: 'logged in',
      data: await this.serializeUserProfile(user),
      token,
    };
  }

  async createUser(data: any) {
    const user = await this.prisma.user.create({ data });
    return user;
  }

  async serializeUserProfile(user: any) {
    return plainToClass(UserSerialization, user, {
      excludeExtraneousValues: true,
    });
  }
}
