import { Module } from '@nestjs/common';
import { config } from 'dotenv';
config();
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { SNS } from 'aws-sdk';

@Module({
  imports: [EventEmitterModule.forRoot(), UserModule],
  providers: [SNS, EventEmitter2, AppService],
})
export class AppModule {}
