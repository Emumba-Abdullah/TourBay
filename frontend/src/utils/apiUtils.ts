import api from './api'

export const findPlace = async (placeName) => {
    const options = {
        method: 'GET',
        url: 'https://trueway-places.p.rapidapi.com/FindPlaceByText',
        params: { text: placeName },
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
    try {
        const response = await api.get('/tour/')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const AddTourApiCall = async (values) => {
    try {
        const response = await api.post('/tour/', values)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getTourById = async (id) => {
    try {
        const response = await api.get(`/tour/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const AddBookingApiCall = async (values) => {
    try {
        const response = await api.post('/booking/', values)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getAllBookingsApiCall = async () => {
    try {
        const response = await api.get('/booking/')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const deleteBookingApiCall = async (id) => {
    try {
        const response = await api.delete(`/booking/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getBookingByIdApiCall = async (id) => {
    try {
        const response = await api.get(`/booking/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const updateBookingApiCall = async (id, payload) => {
    try {
        const response = await api.put(`/booking/${id}`, payload)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const registerUserApiCall = async (data) => {
    try {
        const response = await api.post('/user/register', data)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getFilteredToursApiCall = async (choice) => {
    try {
        const response = await api.get('/tour/filtered', { params: choice })
        return response.data
    } catch (error) {
        console.error(error)
    }
}
