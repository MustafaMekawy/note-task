import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import CRUD from 'src/common/helpers/crud-factory-helper/crud.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediaService } from 'src/media/media.service';
import { async } from 'rxjs';

import { ErrorHandler } from 'src/common/helpers/error/errorHandler';
import { Note, Prisma } from '@prisma/client';
import { notification } from '../notification/notification';

// import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class NoteService {
  constructor(private prisma :PrismaService, private mediaService:MediaService,private notitf:notification){}
  async create(createNoteDto: CreateNoteDto,mediaFiles) {
    try {
      if(createNoteDto.authorId===null) createNoteDto.authorId="guest"
      const { userIds, ...noteData } = createNoteDto;
   
    // Check if users exist
    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    if (users.length !== userIds.length) {
      throw ErrorHandler.createError('Invalid user ID',304);
    }


    //check  note type exist or not
    await CRUD.findUnique(this.prisma.noteType,{where:{id:createNoteDto.typeId}})

    const note:CreateNoteDto =await  CRUD.create(this.prisma.note,noteData);
    const userNotes = users.map((user) => ({
      userId: user.id,
      noteId: note.id,
    }));
       
    await this.prisma.userNote.createMany({ data: userNotes });
   
    //create media
    const media = await this.mediaService.createMedia({
      noteId: note.id,
      files: mediaFiles,
    });
    note.media = media;
    // this.notificationService.sendNotificationToUsers(users)
this.notitf.onNewMessage(note)
    return note
      
    } catch (error) {
      throw error.message
      
    }
    
  }

  async getTimelineNotes(userId: string, page: number, pageSize: number,typeIds?: string[]): Promise<Note[]> {

    try {
      const currentDate = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(currentDate.getDate() - 30);
  
      const whereConditions: Prisma.NoteWhereInput = {
        createdAt: { gte: thirtyDaysAgo, lte: currentDate },
        type: { disabled: false },
        disabled: false,
        users: { some: { userId } },
      };
  
      if (typeIds && typeIds.length > 0) {
        whereConditions.typeId = { in: typeIds };
      }
  
      const notes = await this.prisma.note.findMany({
        where: whereConditions,
        skip: (page - 1) * pageSize,
        take: +pageSize,
      });
  
      return notes;
      
    } catch (error) {
      throw error.message
      
    }
   
  }

  async softDeleteNotes(noteIds: string[],userId:string){
    try {
      console.log(noteIds);
      for (const noteId of noteIds){
        await CRUD.findUnique(this.prisma.userNote,{where: {
          userId_noteId: {
            userId: userId,
            noteId: noteId,
          },
        },})
        await CRUD.update(this.prisma.note,{id:noteId},{ disabled: true })
      }
      
    } catch (error) {
       throw error.message
    }
   

  }

  findAll() {
    return `This action returns all note`;
  }

 async findOne(id: number) {
  
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
