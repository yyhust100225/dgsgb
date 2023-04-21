import request from '@/apis/request'


// 获取后台首信息
export function getHomePage() {
  return request({
    url: 'home/index',
    method: 'get'
  })
}