import axios from 'axios'
import { sweetAlertToken } from '../utils/sweetAlert'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@SonhosDeNinar:token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.message === 'Request failed with status code 401') {
      sweetAlertToken()
    }

    return Promise.reject(error)
  },
)

export default api
