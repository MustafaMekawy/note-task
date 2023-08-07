import { PartialType } from '@nestjs/mapped-types';
import { CreateNotetypeDto } from './create-notetype.dto';

export class UpdateNotetypeDto extends PartialType(CreateNotetypeDto) {}
