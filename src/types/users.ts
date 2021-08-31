export interface BasicUser {
    id: number
    name: string
}

export interface User extends BasicUser {
    uid: number
    username: string
    password: string
    scope: number
    email?: string
    organization?: string
    [key: string]: any
}
