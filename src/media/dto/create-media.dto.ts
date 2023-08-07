import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import  { File } from 'multer';

export class CreateMediaDto {
 
  @IsNotEmpty()
  @IsString()
  noteId: string;
  files: File[];
}
