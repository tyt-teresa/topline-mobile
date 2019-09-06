import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 按需加載插件
import rTime from 'dayjs/plugin/relativeTime' // 相對時間插件
dayjs.locale('zh-cn') // 全局使用中文
dayjs.extend(rTime) // 配置相對相對時間插件

// 處理相對時間的函數
export const relativeTime = time => {
  return dayjs().to(dayjs(time))
}
