import request from '@/apis/request'
import { LoginFormParams } from '@/type/auth/FormState'


// 管理后台登陆
export function login(params: LoginFormParams) {
  return request({
    url: 'auth/login',
    method: 'post',
    data: params
  })
}

// 管理后台登出
export function logout() {
  return request({
    url: 'auth/logout',
    method: 'post'
  })
}
