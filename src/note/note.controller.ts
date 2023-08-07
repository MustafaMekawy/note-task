import { Controller, Get, Post, Body, Patch, Param, Delete ,Response,Headers, UseInterceptors, UploadedFile, UploadedFiles, Query, UseGuards} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ResponseController } from 'src/common/helpers/response/response.controller';
import { MyMulter } from 'src/common/helpers/multer/multer.helper';
import {  FilesInterceptor } from '@nestjs/platform-express';
import { File } from 'multer';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetCurrentUser } from 'src/auth/decorators/get-user.decorator';
import { AuthService } from 'src/auth/auth.service';
 
export const storage = {
  storage: MyMulter.Storage('./uploads/media'),
  limits:MyMulter.limits(1.7 * 1024 * 1024)
};
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService, private AuthService:AuthService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('media',null,storage))
 async create(@UploadedFiles() mediaFiles:File[],@Body() createNoteDto: CreateNoteDto, @Response() res,@Headers('authorization') authorization: string) {
  //to handel guest note if he is not login
 
  createNoteDto.authorId = await this.AuthService.getUserIdFromToken(authorization); 
  
  const note= await this.noteService.create(createNoteDto,mediaFiles);
    return ResponseController.created(res,"note created",note)
  }
  @UseGuards(JwtGuard)
  @Get('timeline')
  async getTimelineNotes(
    @GetCurrentUser('id') userId,
    @Query('typeIds') typeIds: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number, @Response() res
  ) {
    const typeIdsArray = typeIds ? typeIds.split(',') : [];
     const notes = await this.noteService.getTimelineNotes(userId, page, pageSize,typeIdsArray);
     return ResponseController.success(res,"timline nots",notes)
  }


  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }
}
