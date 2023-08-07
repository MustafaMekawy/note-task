import { Module } from '@nestjs/common';
import { NotetypeService } from './notetype.service';
import { NotetypeController } from './notetype.controller';
import { socketClient } from '../socket/socket.client';

@Module({

  controllers: [NotetypeController],
  providers: [NotetypeService]

})
export class NotetypeModule {}
