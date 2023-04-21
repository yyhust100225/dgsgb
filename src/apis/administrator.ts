import request from '@/apis/request'
import { AdministratorFormParams, AdministratorListParams } from '@/type/administrator/FormState'

// 获取账户列表
export function getAdministratorList(params: AdministratorListParams) {
  return request({
    url: 'administrator/list',
    method: 'get',
    params: params
  })
}

// 添加新账户
export function addAdministrator(params: AdministratorFormParams) {
  return request({
    url: 'administrator/create',
    method: 'post',
    data: params
  })
}

// 编辑账户信息
export function editAdministrator(params: AdministratorFormParams) {
  return request({
    url: 'administrator/update',
    method: 'put',
    data: params
  })
}

// 删除账户信息
export function deleteAdministrator(id: number) {
  return request({
    url: 'administrator/delete',
    method: 'delete',
    data: { administrator_ids: [id] }
  })
}