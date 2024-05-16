import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteRoomDto {
    @IsNumber()
    @IsNotEmpty()
    id: number
}