import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @IsNotEmpty({message: 'id not found'})
    @ApiProperty({
        type: Number
    })
    id: number
}
