import request from '@/apis/request'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {getErrorMessageListParams, ErrorMessageFormParams} from "@/type/error-message-service/FormState";

// 通过ID获取
export function getErrorMessageById(id: string) {
  return request({
    url: '/api/ErrorMessageServices/errorMessage/id',
    method: 'get',
    params: { id: id }
  })
}

// 通过异常代码获取
export function getErrorMessageByErrorCode(errorCode: string) {
  return request({
    url: '/api/ErrorMessageServices/errorMessage/errorCode',
    method: 'get',
    params: { errorCode: errorCode }
  })
}

// 获取错误消息列表
export function getErrorMessageList(params: getErrorMessageListParams) {
  return request({
    url: '/api/ErrorMessageServices/errorMessage/list',
    method: 'get',
    params: params
  })
}

// 添加新错误消息
export function addErrorMessage(params: ErrorMessageFormParams) {
  return request({
    url: '/api/ErrorMessageServices/errorMessage',
    method: 'post',
    data: params
  })
}

// 编辑错误消息信息
export function editErrorMessage(params: ErrorMessageFormParams) {
  return request({
    url: '/api/ErrorMessageServices/errorMessage/id?id=' + params.id,
    method: 'put',
    data: params
  })
}

// 删除错误消息信息
export function deleteErrorMessage(id: string) {
  return request({
    url: '/api/ErrorMessageServices/errorMessage/id?id=' + id,
    method: 'delete',
    data: {}
  })
}