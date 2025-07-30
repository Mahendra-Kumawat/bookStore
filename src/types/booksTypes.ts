import User from "./userTypes";

export interface Book {
    _id: string;
    name: string;
    author: User;
    description: string;
    price: number;
    coverImage: string;
    file: string;
}
