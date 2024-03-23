export interface User {

        "themes": String[],
        "posts": String[],
        "_id": string,
        "tel": string,
        "email": string,
        "username": string,
        "password": string,
        "created_at": string,
        "updatedAt": string,
        "__v": number

}

export interface AuthUser {
        username: string,
        email: string,
        phoneNumber: string,
        password: string,
        rePassword: string,
        id: string
}