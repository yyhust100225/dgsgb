import request from '@/apis/request'
import { getRoleListParams, RoleFormParams } from '@/type/role/FormState'

// 获取所有角色信息
export function getAllRoles() {
  return request({
    url: 'role/all',
    method: 'get',
    params: {}
  })
}

// 获取角色列表
export function getRoleList(params: getRoleListParams) {
  return request({
    url: 'role/list',
    method: 'get',
    params: params
  })
}

// 添加新角色
export function addRole(params: RoleFormParams) {
  return request({
    url: 'role/create',
    method: 'post',
    data: params
  })
}

// 编辑角色信息
export function editRole(params: RoleFormParams) {
  return request({
    url: 'role/update',
    method: 'put',
    data: params
  })
}

// 删除角色信息
export function deleteRole(id: number) {
  return request({
    url: 'role/delete',
    method: 'delete',
    data: { role_ids: [id] }
  })
}