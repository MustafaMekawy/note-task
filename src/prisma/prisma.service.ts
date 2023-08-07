import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
// export class PrismaService extends PrismaClient implements OnModuleInit{
//   [x: string]: any;
//   async   onModuleInit() {
//         await this.$connect()
//      }
    
//  }
