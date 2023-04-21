export interface getRoleListParams {
  name: string,
  page: number,
  page_size: number
}

export interface RoleFormParams {
  role_id: number | string,
  name: string,
  remark: string,
  privileges: string[]
}