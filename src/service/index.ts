import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import Request from './request'
import { LOGIN_TOKEN } from '@/assets/global/constants'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn(config) {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        //!.  为非空断言
        config.headers!.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default request
