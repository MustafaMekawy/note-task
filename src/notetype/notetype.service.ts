import { Injectable } from '@nestjs/common';
import { CreateNotetypeDto } from './dto/create-notetype.dto';
import { UpdateNotetypeDto } from './dto/update-notetype.dto';
import CRUD from 'src/common/helpers/crud-factory-helper/crud.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotetypeService {
  constructor(private prisma: PrismaService){}
 async create(createNotetypeDto: CreateNotetypeDto) {
    return await CRUD.create(this.prisma.noteType,createNotetypeDto);
  }

  // findAll() { 
  //   return `This action returns all notetype`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} notetype`;
  // }

  // update(id: number, updateNotetypeDto: UpdateNotetypeDto) {
  //   return `This action updates a #${id} notetype`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} notetype`;
  // }
}
