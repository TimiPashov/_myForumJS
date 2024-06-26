import { Post } from "./post";
import { User } from "./user";

export interface Theme {

       "subscribers": String[],
       "posts": Post[],
       "_id": string,
       "themeName": string,
       "userId": User,
       "created_at": string,
       "updatedAt": string,
       "__v": number

}

export interface CurrentTheme{
       "subscribers": String[],
       "posts": Post[],
       "_id": string,
       "themeName": string,
       "userId": string,
       "created_at": string,
       "updatedAt": string,
       "__v": number
}

export interface ThemeForCreate {
       themeName: string,
       postText: string
}