import { Note } from '@prisma/client';

import { Injectable, OnModuleInit } from "@nestjs/common";

import { Socket, io } from "socket.io-client";



@Injectable()
export class socketClient implements OnModuleInit{
    public socketClient: Socket;
    constructor(){
        this.socketClient=io('http://localhost:3000')
     
    }
     onModuleInit() {
       this.event()
     }
     event(){
        this.socketClient.emit('newMessage',{msg:'gg'})
         this.socketClient.on('connect',()=>{
          
           
        })
        this.socketClient.on('onNewMessage',(paylog:any)=>{
            console.log(paylog);
            

        })
    }
}