import { getAllTours } from './apiUtils'
import dayjs from 'dayjs'

export const getChoosedTours = async ({ date, location, priceRange }) => {
    const price = priceRange.split('-')
    const minPrice = parseInt(price[0].replace('$', ''))
    const maxPrice = parseInt(price[1].replace('$', ''))
    const startDate = dayjs(date.selection.startDate).format('YYYY-MM-DD')
    const endDate = dayjs(date.selection.endDate).format('YYYY-MM-DD')

    const response = await getAllTours()

    const result = response.filter(checkMatchedTours)

    function checkMatchedTours(tour) {
        return (
            tour.startDate == startDate &&
            tour.endDate == endDate &&
            parseInt(tour.price) <= maxPrice &&
            parseInt(tour.price) >= minPrice &&
            tour.city == location
        )
    }
    return result
}

export const images = [
    'https://plus.unsplash.com/premium_photo-1664303481282-99da219425f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1619900626853-6dadd9c20618?q=80&w=1922&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://unsplash.com/photos/high-angle-photography-of-two-red-and-white-vehicles-on-concrete-road-between-trees-and-buildings-at-daytime-pAWY7xrsLwc',
    'https://images.unsplash.com/photo-1564678043463-cb44638ea0e2?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1483630127888-2327389638e7?q=80&w=1971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

export const popularSearches = [
    'Pakistan',
    'India',
    'Miami',
    'Canada',
    'USA',
    'France',
    'Japan',
    'Paris',
    'Sawat',
    'Himaliya',
    'Skardu',
    'Gujrat',
]
