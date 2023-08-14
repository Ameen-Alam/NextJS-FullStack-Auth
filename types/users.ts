export type User = {
    readonly _id: string,
    name: string,
    email: string,
    password: string,
    isBlocked: boolean
}

export type whereT = {
    _id?: string,
    name?: string,
    email?: string,
}
export type UserData = {
    _id: string,
    name: string,
    email: string,
}