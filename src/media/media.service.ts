import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediaService {

    constructor(private prisma: PrismaService) {}

  async createMedia(createMediaDto: CreateMediaDto): Promise<any> {
    const { noteId, files } = createMediaDto;
    const media = await Promise.all(
      files.map(async (file) => {
        const createdMedia = await this.prisma.media.create({
          data: {
            noteId,
            file: file.path,
          },
        });
        return createdMedia;
      }),
    );
    return media;
  }
}
