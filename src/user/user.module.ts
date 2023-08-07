import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NoteService } from 'src/note/note.service';
import { MediaService } from 'src/media/media.service';
import { notification } from '../notification/notification';
// import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService,NoteService,MediaService,notification],
  exports: [UserService],
})
export class UserModule {}
