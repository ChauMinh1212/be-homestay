export class FindAllRoomResponse {
    id: number
    code: string
    name: string
    address: string
    description: string
    quantity: number
    type: number
    img: string
    price: string
    capacity: number
    color: string

    constructor(data?: FindAllRoomResponse) {
        this.id = data?.id || 0
        this.code = data?.code || ''
        this.name = data?.name || ''
        this.address = data?.address || ''
        this.description = data?.description || ''
        this.quantity = data?.quantity || 0
        this.capacity = data?.capacity || 0
        this.type = data?.type || 0
        this.img = data?.img ? JSON.parse(data.img) : []
        this.price = data?.price || ''
        this.color = data?.color || ''
    }

    static mapToList(data?: FindAllRoomResponse[]) {
        return data.map(item => new FindAllRoomResponse(item))
    }
}