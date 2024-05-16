import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "../../util/response";

class UploadResponse {
    @ApiProperty({
        type: String,
        isArray: true
    })
    url: string[]
}

export class UploadResponseSwagger extends BaseResponse {
    @ApiProperty({
        type: UploadResponse
    })
    data: UploadResponse
}