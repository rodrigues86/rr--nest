import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRepository } from './user.repository';
import { SNS } from 'aws-sdk';
import { AutoSNSProducer } from '@rodrigues86/nestjs-auto-sns-producer';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    EventEmitter2,
    SNS,
    AutoSNSProducer.register({
      eventName: UserService.USER_CREATED_EVENT,
      topicArn: process.env.RR__USER_CREATED_EVENT__SNS_TOPIC_ARN || '',
    }),
  ],
})
export class UserModule {}
