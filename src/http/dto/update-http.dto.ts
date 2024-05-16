import { PartialType } from '@nestjs/swagger';
import { CreateHttpDto } from './create-http.dto';

export class UpdateHttpDto extends PartialType(CreateHttpDto) {}
