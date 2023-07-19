import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { ElMessage } from 'element-plus'
dayjs.extend(utc)
export function formatUTC(utcTime: string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs.utc(utcTime).utcOffset(8).format(format)
}

export function messageTip(text: string, typeMsg = 'success') {
  ElMessage({
    center: true,
    showClose: true,
    message: text,
    type: `${typeMsg}`
  })
}
