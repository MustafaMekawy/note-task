import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { NotetypeModule } from './notetype/notetype.module';
import { EmailModule } from './common/modules/email/email.module';
import { ConfigModule } from '@nestjs/config';
import { MediaService } from './media/media.service';
import { UserModule } from './user/user.module';
import { socket } from './socket/socket.modules';
import { notificationModule } from './notification/notificoation.module';
import { socketClient } from './socket/socket.client';
// import { NotificationService } from './notification/notification.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule, AuthModule, NoteModule, NotetypeModule, EmailModule,UserModule,socket,notificationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, MediaService,socketClient],
  
})
export class AppModule {}
