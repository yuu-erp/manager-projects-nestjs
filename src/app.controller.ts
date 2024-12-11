import { Controller, Get } from '@nestjs/common'

@Controller('')
export class AppController {
  constructor() {}

  @Get()
  async excute() {
    return 'Hello Work!'
  }
}
