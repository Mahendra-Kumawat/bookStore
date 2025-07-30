import multer from "multer";
import path from "node:path";

const multerUploader = multer({
    // in the line __dirname represent the current folder
    dest: path.resolve(__dirname, "../../../public/uploads"),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10mb
    },
});

export { multerUploader };
