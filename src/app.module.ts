import { Module } from '@nestjs/common';
import { config } from 'dotenv';
config();
import { UserModule } from './user/user.module';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { SNS } from 'aws-sdk';

@Module({
  imports: [EventEmitterModule.forRoot(), UserModule],
  providers: [SNS, EventEmitter2],
})
export class AppModule {}
