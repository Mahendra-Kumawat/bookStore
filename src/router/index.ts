
import { Router } from "express";
import userRoutes from "./userRoutes/userRoutes";

const router = Router();


router.use("/auth/users", userRoutes);


export default router;