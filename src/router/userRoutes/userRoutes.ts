import { Router } from "express";
import { register } from "../../controller/usersController/usersController";
import { validate } from "../../middleware/validate/validate";
import { userRegisterSchema } from "../../validations/usersValidation/usersValidations";

const userRoutes = Router();

userRoutes.post("/register", [validate(userRegisterSchema)], register);

export default userRoutes;
