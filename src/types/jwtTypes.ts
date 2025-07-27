export interface JwtPayload {
    id: string;
    email: string;
}
export interface JwtToken {
    token: string;
    expiresIn: number;
}
