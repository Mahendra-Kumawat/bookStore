// types/express/index.d.ts
import { JwtPayloadData } from "../../types/jwtTypes"; // Adjust path as needed

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayloadData;
        }
    }
}
