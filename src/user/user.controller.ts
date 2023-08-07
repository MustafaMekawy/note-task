
import { Controller, Get, Body, Patch, Param, Delete, UseGuards ,Response} from '@nestjs/common';
import { UserService } from './user.service';

import { UpdateUserDto } from './dto/update-user.dto';

import { MyMulter } from 'src/common/helpers/multer/multer.helper';

import * as path from 'path';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { NoteService } from 'src/note/note.service';
import { GetCurrentUser } from 'src/auth/decorators/get-user.decorator';
import { ResponseController } from 'src/common/helpers/response/response.controller';
import { DeleteNoteDto } from 'src/note/dto/delete-notes.dto';

export const storage = {
  storage: MyMulter.Storage('./uploads/profileimages'),
  fileFilter: MyMulter.fileFilter('image/png', 'image/jpg', 'image/jpeg'),
};
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private noteService:NoteService
  ) {}
  
  @UseGuards(JwtGuard)
  @Delete('deleteNotes')
  async deleteNotes(@GetCurrentUser('id') userId: string, @Body() notes:DeleteNoteDto,@Response() res): Promise<void> {
    await this.noteService.softDeleteNotes(notes.noteIds,userId);
    return ResponseController.success(res,"notes deleted",null)
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
