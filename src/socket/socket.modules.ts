import { Module } from "@nestjs/common";
import { socketClient } from "./socket.client";




@Module({
    providers:[socketClient],
    exports:[socketClient]
})
export class socket{
    static brodecast: any;
    static emit: any;
    static id(userName: any, id: any) {
        throw new Error('Method not implemented.');
    }
    static handshake: any;

}