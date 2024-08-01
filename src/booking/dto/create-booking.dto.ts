export class CreateBookingDto {
    id: number
    from: string
    to: string
    quantity: number
}

export class CreateBookingAdminDto extends CreateBookingDto {
    user_id: number
}
