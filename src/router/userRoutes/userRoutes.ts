import { Router } from "express";
import { register , login, userProfile  } from "../../controller/usersController/usersController";
import { validate } from "../../middleware/validate/validate";
import { userLoginSchema, userRegisterSchema } from "../../validations/usersValidation/usersValidations";

const userRoutes = Router();

userRoutes.post("/register", [validate(userRegisterSchema)], register);

userRoutes.post("/login", [validate(userLoginSchema)], login);


userRoutes.get("/profile" , [] , userProfile)


export default userRoutes;
