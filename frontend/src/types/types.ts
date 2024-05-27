export interface ITour {
    _id: string
    name: string
    city: string
    description: string
    price: string
    duration: string
    startDate: string
    endDate: string
    facilities: string[]
    images: string[]
}

export interface IDestinationCardProps {
    tourData: ITour
    fromMyTours: boolean
    bookingId: string
}

export interface IBooking {
    name: string
    email: string
    phoneNo: string
    price: string
    numOfAdults: string
    numOfChilds: string
    paymentMethod: string
    tours?: string
    userId?: string
}

export interface IWeatherCardProps {
    temprature: number
    day: number
}

export interface IAlertDialogProps {
    cityName: string
    open: boolean
    onClose: () => void
    onConfirmDelete: () => void
}
