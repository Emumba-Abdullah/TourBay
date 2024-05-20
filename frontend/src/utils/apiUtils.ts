import axios from 'axios'

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
    },
})
export const findPlace = async (placeName: string) => {
    const options = {
        method: 'GET',
        url: 'https://trueway-places.p.rapidapi.com/FindPlaceByText',
        params: {
            text: placeName,
        },
        headers: {
            'X-RapidAPI-Key':
                'f80bca974amsh5b4af88fcac459ap167b81jsn8c617240196d',
            'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com',
        },
    }

    try {
        const response = await axios.request(options)
        return response.data.results
    } catch (error) {
        console.log(error)
    }
}

export const getAllTours = async () => {
    const url = 'http://localhost:3000/tour/'

    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const AddTourApiCall = async (values) => {
    const url = 'http://localhost:3000/tour/'

    try {
        const response = await axios.post(url, values)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getTourById = async (id: string) => {
    const url = `http://localhost:3000/tour/${id}`

    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const AddBookingApiCall = async (values) => {
    const url = 'http://localhost:3000/booking/'

    try {
        const response = await axios.post(url, values, getAuthHeaders())
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getAllBookingsApiCall = async () => {
    const url = 'http://localhost:3000/booking/'

    try {
        const response = await axios.get(url, getAuthHeaders())
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const deleteBookingApiCall = async (id: string | undefined) => {
    const url = `http://localhost:3000/booking/${id}`

    try {
        const response = await axios.delete(url, getAuthHeaders())
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getBookingByIdApiCall = async (id: string | undefined) => {
    const url = `http://localhost:3000/booking/${id}`

    try {
        const response = await axios.get(url, getAuthHeaders())
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const updateBookingApiCall = async (id, payload) => {
    const url = `http://localhost:3000/booking/${id}`

    try {
        const response = await axios.put(url, payload, getAuthHeaders())
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const registerUserApiCall = async (data) => {
    const url = ` http://localhost:3000/user/register`
    const response = await axios.post(url, data)
    return response.data
}
