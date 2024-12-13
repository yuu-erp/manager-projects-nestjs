import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { PrismaService } from '@/service/prismaService/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    return Boolean(user)
  }

  async create(createUserDto: CreateUserDto): Promise<string> {
    return 'Create user'
  }

  async findAll(): Promise<string> {
    return `findAll`
  }

  async findOne(id: string): Promise<string> {
    return `findOne ${id}`
  }

  async update(): Promise<string> {
    return `update user with id`
  }

  async remove(id: string): Promise<string> {
    return `Remove user ${id}`
  }
}
