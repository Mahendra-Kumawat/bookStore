import { multerUploader } from "../../middleware/fileUploader/multerUploader";
import { createBook } from "../../controller/bookController/bookController";
import { Router } from "express";
import verifyToken from "../../middleware/verifyToken/verifyToken";

const bookRoutes = Router();

bookRoutes.post(
    "/create",
    [
        verifyToken,
        multerUploader.fields([
            // this is the multer configration to upload the files
            {
                name: "coverImage",
                maxCount: 1,
            },
            {
                name: "file",
                maxCount: 1,
            },
        ]),
    ],
    createBook,
);

export default bookRoutes;
