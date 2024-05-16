import { IsNotEmpty } from "class-validator"
import { MemoryStoredFile } from "nestjs-form-data"

export class CreateRoomDto {
    @IsNotEmpty()
    code: string
    name: string
    description: string
    price: string
    address: string
    color: string
    quantity: number
    capacity: number
    img: MemoryStoredFile[]
}

