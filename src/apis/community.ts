import request from '@/apis/request'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {getCommunityListParams, CommunityFormParams} from "@/type/community/FormState";

// 获取所有社区信息
export function getAllCommunities() {
  return request({
    url: 'community/all',
    method: 'get',
    params: {}
  })
}

// 获取社区列表
export function getCommunityList(params: getCommunityListParams) {
  return request({
    url: 'community/list',
    method: 'get',
    params: params
  })
}

// 添加新社区
export function addCommunity(params: CommunityFormParams) {
  return request({
    url: 'community/create',
    method: 'post',
    data: params
  })
}

// 编辑社区信息
export function editCommunity(params: CommunityFormParams) {
  return request({
    url: 'community/update',
    method: 'put',
    data: params
  })
}

// 删除社区信息
export function deleteCommunity(id: number) {
  return request({
    url: 'community/delete',
    method: 'delete',
    data: { community_ids: [id] }
  })
}