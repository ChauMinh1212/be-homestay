import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty({
    type: Number,
    example: 200,
  })
  readonly status: number;

  @ApiProperty({
    type: String,
    example: 'OK',
  })
  readonly message: string;

  @ApiProperty({})
  readonly data: any;

  constructor({ status, message, data }: Partial<BaseResponse>) {
    this.status = status || 200;
    this.message = message || 'success';
    this.data = data || null;
  }
}

export class UserResponseCommon {
    @ApiProperty({
        type: Number
    })
    id: number

    @ApiProperty({
        type: String
    })
    user_name: string

    @ApiProperty({
        type: String
    })
    description: string

    @ApiProperty({
        type: String
    })
    email: string

    @ApiProperty({
        type: String
    })
    avatar: string

    constructor(data?: UserResponseCommon){
        this.id = data?.id || 0
        this.user_name = data?.user_name || ''
        this.description = data?.description || ''
        this.email = data?.email || ''
        this.avatar = data?.avatar || ''  
    }


    static mapToList(data?: UserResponseCommon[]){
         return data.map(item => new UserResponseCommon(item))
    }
}
