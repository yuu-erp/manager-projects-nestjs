// src/dto/user.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'

// DTO cho việc tạo người dùng
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  password: string
}

// DTO cho việc cập nhật người dùng
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEmail()
  email?: string
}

// DTO cho việc lọc, phân trang và sắp xếp người dùng
export class GetAllUsersDto {
  @IsOptional()
  skip?: number

  @IsOptional()
  take?: number

  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  orderBy?: { [key: string]: 'asc' | 'desc' }
}

// DTO cho việc xác thực người dùng
export class AuthenticateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  password: string
}
