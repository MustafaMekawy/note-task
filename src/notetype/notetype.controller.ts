import { Controller, Get, Post, Body, Patch, Param, Delete, Response } from '@nestjs/common';
import { NotetypeService } from './notetype.service';
import { CreateNotetypeDto } from './dto/create-notetype.dto';
import { UpdateNotetypeDto } from './dto/update-notetype.dto';
import { ResponseController } from 'src/common/helpers/response/response.controller';

@Controller('notetype')
export class NotetypeController {
  constructor(private readonly notetypeService: NotetypeService) {}

  @Post()
 async create(@Body() createNotetypeDto: CreateNotetypeDto, @Response() res) {
    const noteType= await this.notetypeService.create(createNotetypeDto);
    return ResponseController.created(res,"note type created succssflly",noteType)
  }

  // @Get()
  // findAll() {
  //   return this.notetypeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notetypeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNotetypeDto: UpdateNotetypeDto) {
  //   return this.notetypeService.update(+id, updateNotetypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notetypeService.remove(+id);
  // }
}
