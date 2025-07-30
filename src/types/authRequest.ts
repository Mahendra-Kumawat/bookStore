import { Request } from "express";
import { JwtPayloadData } from "./jwtTypes";

export interface AuthRequest extends Request {
  user?: JwtPayloadData; // Optional if you set it conditionally (e.g., after token verification)
  userId?: string;
}
