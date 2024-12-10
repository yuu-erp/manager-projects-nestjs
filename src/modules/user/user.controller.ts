import { Controller, Get } from '@nestjs/common'

@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor() {}

  @Get()
  async me() {
    return 'Hello Work!'
  }
}