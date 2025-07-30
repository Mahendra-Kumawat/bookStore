import { uploader } from "../../middleware/fileUploader/uploader";
import { createBook } from "../../controller/bookController/bookController";
import { Router } from "express";

const bookRoutes = Router();

bookRoutes.post(
    "/create",
    [
        uploader.fields([
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
