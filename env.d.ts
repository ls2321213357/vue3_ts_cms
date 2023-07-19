//类型声明文件
/// <reference types="vite/client" />

//对引入的组件进行统一的类型声明 让ts识别vue文件
declare module '*.vue' {
  //相当于组件中export default defineComponent({})
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
