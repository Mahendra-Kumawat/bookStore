import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import fs from "node:fs/promises";

const uploadToCloudinary = async (
    file: Express.Multer.File,
    folder: string,
) => {
    try {
        const { path, filename, mimetype } = file;
        const format = mimetype.split("/")[1];
        const result = await cloudinary.uploader.upload(path, {
            filename_override: filename,
            folder,
            format,
        });

        // remove the file from the local server
        await fs.unlink(path);

        return result.secure_url;
    } catch (error) {
        throw createHttpError(500, `Error uploading to ${folder}`);
    }
};

export { uploadToCloudinary };
