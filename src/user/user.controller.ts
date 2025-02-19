import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller({ version: '1', path: 'users' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }

  @Patch(':userId')
  async patch(
    @Param('userId') userId: string,
    @Body() patchUser: User,
  ): Promise<User | null> {
    return await this.userService.patch(userId, patchUser);
  }

  @Get(':userId')
  async get(@Param('userId') userId: string): Promise<User | null> {
    return await this.userService.get(userId);
  }

  @Get()
  async getAll(): Promise<User[] | null> {
    return await this.userService.getAll();
  }

  @Delete(':id')
  async delete(@Param('id') userId: string): Promise<void> {
    await this.userService.delete(userId);
  }
}
