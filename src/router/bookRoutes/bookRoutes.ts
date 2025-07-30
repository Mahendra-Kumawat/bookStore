import { multerUploader } from "../../middleware/fileUploader/multerUploader";
import {
    createBook,
    updateBook,
} from "../../controller/bookController/bookController";
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

bookRoutes.put("/update/:bookId", [
    verifyToken,
    multerUploader.fields([
        {
            name: "coverImage",
            maxCount: 1,
        },
        {
            name: "file",
            maxCount: 1,
        },
    ]),
    updateBook,
]);

export default bookRoutes;
