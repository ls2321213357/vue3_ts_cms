// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 2.代码逻辑判断, 判断当前环境
// vite默认提供的环境变量
// console.log(import.meta.env.MODE)//string 应用运行的模式
// console.log(import.meta.env.DEV) // boolean 是否开发环境
// console.log(import.meta.env.PROD)//boolean 是否生产环境
// console.log(import.meta.env.SSR) // boolean 是否是服务器端渲染(server side render)

let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'http://152.136.185.210:4000'
} else {
  // 开发环境
  BASE_URL = 'http://codercba.com:5000'
  // BASE_URL = 'http://152.136.185.210:5000'
}

// console.log(BASE_URL)

// 3.通过创建.env文件直接创建变量 能拿到.env中自定义的东西
// console.log(import.meta.env.VITE_URL)

export const TIME_OUT = 10000
export { BASE_URL }
