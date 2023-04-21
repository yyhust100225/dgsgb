import request from '@/apis/request'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {getCategoryListParams, CategoryFormParams} from "@/type/category/FormState";

// 获取内容分类列表
export function getCategoryList(params: getCategoryListParams) {
  return request({
    url: 'category/list',
    method: 'get',
    params: params
  })
}

// 添加新内容分类
export function addCategory(params: CategoryFormParams) {
  return request({
    url: 'category/create',
    method: 'post',
    data: params
  })
}

// 编辑内容分类信息
export function editCategory(params: CategoryFormParams) {
  return request({
    url: 'category/update',
    method: 'put',
    data: params
  })
}

// 删除内容分类信息
export function deleteCategory(id: number) {
  return request({
    url: 'category/delete',
    method: 'delete',
    data: { category_ids: [id] }
  })
}