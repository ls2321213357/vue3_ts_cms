import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { ElMessage } from 'element-plus'
dayjs.extend(utc)
export function formatUTC(utcTime: string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs.utc(utcTime).utcOffset(8).format(format)
}

export function messageTip(text = '1', typeMsg = 'success') {
  ElMessage({
    center: true,
    showClose: true,
    message: text,
    type: `${typeMsg}`
  })
}

/**
 * 取对象的并集 再obj1中挑选obj2有的key
 * @param obj1
 * @param obj2
 * @returns 合并后的对象
 */
export function getObjectCommon(obj1: any, obj2: any) {
  const objRes: any = {}
  for (let key in obj1) {
    if (obj2.hasOwnProperty(key)) {
      objRes[key] = obj1[key]
    }
  }
  return objRes
}
