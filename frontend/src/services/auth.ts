import axios from 'axios'
const baseURL = 'http://localhost:3000'
const api = axios.create({ baseURL })

export function loginUser(user) {
    return api.post('/user/login', user)
}

export function signupUser(user) {
    return api.post('/user/signup', user)
}
