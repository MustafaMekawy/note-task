import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import multer, { File } from 'multer';

export class CreateNoteDto {
 @IsOptional()
  id: string
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  message: string;
  @IsNotEmpty()
  @IsString()
  typeId: string;
  @IsString()
  @IsOptional()
  authorId: string;
  @IsOptional()
  media: File[];
  @IsNotEmpty()
  userIds: string[];
}
