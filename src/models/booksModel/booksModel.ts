import mongoose from "mongoose";
import { Book } from "../../types/booksTypes";

const bookSchema = new mongoose.Schema<Book>(
    {
        name: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        coverImage: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const bookModel = mongoose.model<Book>("Book", bookSchema);

export default bookModel;
