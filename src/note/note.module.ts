import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { MediaService } from 'src/media/media.service';
import { notification } from '../notification/notification';
import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/common/modules/email/email.service';
import { UserService } from 'src/user/user.service';

// import { NotificationService } from 'src/notification/notification.service';

@Module({

  controllers: [NoteController],
  providers: [NoteService,MediaService,notification,AuthService,BcryptService,
    JwtService,
    ConfigService,
    EmailService,UserService]
})
export class NoteModule {}
