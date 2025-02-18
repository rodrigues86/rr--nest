/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  public static readonly USER_CREATED_EVENT = 'user-created-event';
  public static readonly USER_PATCHED_EVENT = 'user-patched-event';
  public static readonly USER_DELETED_EVENT = 'user-deleted-event';
  constructor(
    private readonly repository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(user: User): Promise<User> {
    const result = await this.repository.insert(user);
    this.eventEmitter.emit(UserService.USER_CREATED_EVENT, result);
    return result;
  }

  async get(userId: string): Promise<User> {
    const result = await this.repository.get(userId);

    if (!result) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return result;
  }

  async delete(userId: string): Promise<void> {
    const found = await this.get(userId);
    await this.repository.delete(userId);

    if (!found) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    this.eventEmitter.emit(UserService.USER_DELETED_EVENT, found);
  }
}
