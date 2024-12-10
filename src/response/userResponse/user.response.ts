import { PrismaService } from '@/service/prismaService/prisma.service'
import { Injectable } from '@nestjs/common'
import {
  CreateUserDto,
  UpdateUserDto,
  GetAllUsersDto,
  AuthenticateUserDto
} from './dto/user.dto'

@Injectable()
export class UserResponse {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserDto) {
    return await this.prismaService.user.create({
      data
    })
  }

  async getUserById(userId: number) {
    return await this.prismaService.user.findUnique({
      where: { id: userId }
    })
  }

  async getAllUsers(params: GetAllUsersDto) {
    const { skip, take, search, orderBy } = params

    return await this.prismaService.user.findMany({
      skip,
      take,
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } }
            ]
          }
        : undefined,
      orderBy
    })
  }

  async updateUser(userId: number, data: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id: userId },
      data
    })
  }

  async deleteUser(userId: number) {
    return await this.prismaService.user.delete({
      where: { id: userId }
    })
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { email }
    })
    return !!user
  }

  async authenticateUser(data: AuthenticateUserDto): Promise<any> {
    const { email, password } = data
    const user = await this.prismaService.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new Error('User not found')
    }

    if (user.password !== password) {
      throw new Error('Invalid password')
    }

    return user
  }
}
