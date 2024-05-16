import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "../../util/response";

class RefreshTokenResponse {
    @ApiProperty({
        type: String
    })
    access_token: string
}
export class RefreshTokenResponseSwagger extends BaseResponse {
    @ApiProperty({
        type: RefreshTokenResponse
    })
    data: RefreshTokenResponse
}