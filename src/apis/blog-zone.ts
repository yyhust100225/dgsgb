import request from '@/apis/request'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {getBlogZoneListParams} from "@/type/blog-zone/FormState";

// 获取内容分类列表
export function getBlogZoneList(params: getBlogZoneListParams) {
    return request({
        url: 'blog_zone/list',
        method: 'get',
        params: params
    })
}