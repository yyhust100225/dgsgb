export interface getCategoryListParams {
    name: string,
    page: number,
    page_size: number
}

export interface CategoryFormParams {
    category_id: number | string | null,
    name: string,
    description: string | null,
    simple_name: string | null,
    status: string | undefined
}