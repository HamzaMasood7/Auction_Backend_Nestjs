import {
  IsString,
  IsEnum,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsOptional,
  Matches,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Gender, RoleType, UserType } from '../constants/user';

export class UserRegistrationDto {
  @ApiProperty({
    example: 'Jhon Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  uuid: string;

  @ApiProperty({
    example: 'JhonDoe@test.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z]).*$/, {
    message: 'Password must contain alphabet,numbers and special characters',
  })
  password: string;

  @ApiProperty({
    enum: UserType,
    enumName: 'UserType',
    required: true,
  })
  @IsString()
  @IsEnum(UserType)
  @IsOptional()
  type: UserType;

  @ApiProperty({
    enum: RoleType,
    enumName: 'RoleType',
    required: true,
  })
  @IsString()
  @IsEnum(RoleType)
  @IsOptional()
  role: RoleType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?:\+92|0)[1-9]\d{9}$/, {
    message: 'Please enter a valid phone number',
  })
  phone: string;

  @ApiProperty({
    example: '1999-12-15',
  })
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'BirthDate must be in YYYY-MM-DD format',
  })
  birthDate: string;

  @ApiProperty({
    enum: Gender,
    enumName: 'Gender',
    required: true,
  })
  @IsString()
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  salt: string;
}
