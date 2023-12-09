/* src/utils/index.ts */
// 通用工具函数
import { useRouter } from 'vue-router'

const router = useRouter()

interface DateFormatOptions {
  year?: string
  month?: string
  day?: string
  hour?: string
  minute?: string
  second?: string
}

// 将 Date 对象格式化为指定格式的字符串
export const formatDate = (
  dateInput: Date | string | number,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string => {
  const date = new Date(dateInput)
  const formatOptions: DateFormatOptions = {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    day: date.getDate().toString().padStart(2, '0'),
    hour: date.getHours().toString().padStart(2, '0'),
    minute: date.getMinutes().toString().padStart(2, '0'),
    second: date.getSeconds().toString().padStart(2, '0')
  }

  let formattedDate = format

  formattedDate = formattedDate.replace(/YYYY/g, formatOptions.year ?? '')
  formattedDate = formattedDate.replace(/MM/g, formatOptions.month ?? '')
  formattedDate = formattedDate.replace(/DD/g, formatOptions.day ?? '')
  formattedDate = formattedDate.replace(/HH/g, formatOptions.hour ?? '')
  formattedDate = formattedDate.replace(/mm/g, formatOptions.minute ?? '')
  formattedDate = formattedDate.replace(/ss/g, formatOptions.second ?? '')

  return formattedDate
}

// 点击进入他人的主页
export const enterSpace = (id: number): void => {
  router.push({
    path: '/MyArticles/' + id
  })
}

// 防抖函数
export function debounce<T>(
  this: T,
  func: (this: T, ...args: any[]) => void,
  delay: number
) {
  let timer: number | undefined
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
