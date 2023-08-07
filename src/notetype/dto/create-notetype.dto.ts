import { IsString,IsNotEmpty  } from 'class-validator';
export class CreateNotetypeDto {   
    @IsNotEmpty()
    @IsString()
    name    : string
}


