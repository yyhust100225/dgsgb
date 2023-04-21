export interface getCommunityListParams {
  name: string,
  page: number,
  page_size: number
}

export interface CommunityFormParams {
  community_id: number | string | null,
  name: string,
  description: string | null,
  icon: string | undefined,
  theme_color: string,
  standard: string | null,
  status: string | undefined
}