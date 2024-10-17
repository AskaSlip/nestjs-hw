import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotIn,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { TransformHelper } from '../../../common/helpers/transform.helper';
import { GenderEnum } from '../enums/gender.enum';

export class CarBaseReqDto {
  @IsString()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @Length(3, 40)
  producer: string;

  @IsString()
  @Transform(TransformHelper.trim)
  @Length(3, 40)
  model: string;

  @ApiProperty({ example: 2021 })
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  year: number;
}
export class UserBaseReqDto {
  @IsString()
  @Transform(TransformHelper.trim)
  @Length(3, 50)
  name: string;

  @ApiProperty({ example: 'test@test.com' })
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @ValidateIf((obj) => !obj.phone)
  @IsEmail()
  email: string;

  @ValidateIf((obj) => !obj.email)
  @Transform(TransformHelper.trim)
  @IsString()
  phone: string;

  @ApiProperty({ example: 'qwery1231' })
  @Transform(TransformHelper.trim)
  @IsNotIn(['password', '12345678', 'qwerty'])
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 1 letter, 1 number, and be at least 8 characters long',
  })
  password: string;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(123)
  age?: number;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsOptional()
  @IsBoolean()
  isStudent: boolean = false;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CarBaseReqDto)
  cars: CarBaseReqDto[];
}
