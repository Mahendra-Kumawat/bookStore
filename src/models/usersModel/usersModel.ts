import mongoose from "mongoose";
import User from "../../types/userTypes";

const userSchema = new mongoose.Schema<User>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

// create a model using the schema

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
