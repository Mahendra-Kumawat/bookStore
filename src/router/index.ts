
import { Router } from "express";
import userRoutes from "./userRoutes/userRoutes";
import bookRoutes from "./bookRoutes/bookRoutes";

const router = Router();


router.use("/auth/users", userRoutes);

router.use("/book" , bookRoutes)


export default router;