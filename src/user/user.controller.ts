import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }

  @Get(':id')
  async get(@Param('id') userId: string): Promise<User | null> {
    return await this.userService.get(userId);
  }

  @Delete(':id')
  async delete(@Param('id') userId: string): Promise<void> {
    await this.userService.delete(userId);
  }
}
