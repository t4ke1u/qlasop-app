import aspida from '@aspida/axios'
import axios, { isAxiosError } from 'axios'

import api from '@/generated/api/$api'
import { HTTPError } from '@/utils/error'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 20000,
  headers: {
    Accept: 'application/json',
  },
})

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    let error
    if (isAxiosError(err) && err.response) {
      error = new HTTPError(err.response.status, err.response.data?.detail ?? 'error')
    } else {
      error = new Error('unexpected error')
    }
    return Promise.reject(error)
  },
)

export const restClient = api(aspida(axiosClient))
