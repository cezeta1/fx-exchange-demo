export interface BaseSelect<T> {
    id: T,
    name: string,
    description: string
}

export interface Select extends BaseSelect<number> {}