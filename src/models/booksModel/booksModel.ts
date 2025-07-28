import mongoose from "mongoose";
import { Book } from "src/types/bookTypes";

const bookSchema = new mongoose.Schema<Book>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
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
    image: {
        type: String,
        required: true,
    },
});

// create the model using the book schema

const bookModel = mongoose.model<Book>("Book", bookSchema);

export default bookModel;
