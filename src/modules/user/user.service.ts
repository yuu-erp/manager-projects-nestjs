import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor() {}

  async create(createUserDto: CreateUserDto) {
    return `Create user`
  }

  async findAll() {
    return `findAll user`
  }

  async findOne(id: string) {
    return `This action returns a #${id} user`
  }

  async update() {
    return `update user`
  }

  async remove(id: string) {
    return `Remove user ${id}`
  }
}
