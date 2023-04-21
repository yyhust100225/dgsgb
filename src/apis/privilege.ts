import request from '@/apis/request'
import { getPrivilegeListParams, PrivilegeFormParams } from '@/type/privilege/FormState'

// 获取所有权限信息
export function getAllPrivileges() {
  return request({
    url: 'privilege/all',
    method: 'get',
    params: {}
  })
}

// 获取权限列表
export function getPrivilegeList(params: getPrivilegeListParams) {
  return request({
    url: 'privilege/list',
    method: 'get',
    params: params
  })
}

// 添加新权限
export function addPrivilege(params: PrivilegeFormParams) {
  return request({
    url: 'privilege/create',
    method: 'post',
    data: params
  })
}

// 编辑权限信息
export function editPrivilege(params: PrivilegeFormParams) {
  return request({
    url: 'privilege/update',
    method: 'put',
    data: params
  })
}

// 删除权限信息
export function deletePrivilege(id: number) {
  return request({
    url: 'privilege/delete',
    method: 'delete',
    data: { privilege_ids: [id] }
  })
}