import * as moment from "moment"
import { RoomEntity } from "src/room/entities/room.entity"

export class BookingHistoryResponse {
    from: string
    to: string
    created_at: string
    quantity: number
    code: string
    room: RoomEntity

    constructor(data?: BookingHistoryResponse) {
        this.from = data?.from ? moment(data.from).format('DD/MM/YYYY') : ''
        this.to = data?.to ? moment(data.to).format('DD/MM/YYYY') : ''
        this.created_at = data?.created_at ? moment(data.created_at).format('DD/MM/YYYY') : ''
        this.quantity = data?.quantity || 0
        this.code = data?.room.code ||''
    }

    static mapToList(data?: BookingHistoryResponse[]) {
        return data.map(item => new BookingHistoryResponse(item))
    }
}