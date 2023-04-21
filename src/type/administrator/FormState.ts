export interface AdministratorListParams {
  username: string,
  page: number,
  page_size: number
}

export interface AdministratorFormParams {
  administrator_id: number | string,
  username: string,
  nickname: string,
  email: string,
  phone_number: string,
  avatar: string,
  status: string | undefined,
  role: number | undefined
}

export interface RoleOptions {
  id: number,
  name: string,
}