import { Module } from "@nestjs/common";
import { notification } from "../notification/notification";


@Module({
    providers:[notification]
})
export class notificationModule{}