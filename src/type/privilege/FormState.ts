export interface getPrivilegeListParams {
  name: string,
  code: string,
  page: number,
  page_size: number
}

export interface PrivilegeFormParams {
  privilege_id: number | string,
  name: string,
  code: string,
  description: string,
  status: string | undefined
}