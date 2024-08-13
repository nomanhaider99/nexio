import mongoose from "mongoose";
import { Schema } from "mongoose";

interface User {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    isVerified: boolean;
    feedback: Feedback[]; // It should be an array
}

interface Feedback {
    message: string;
    createdAt: Date;
}

const feedbackSchema: Schema<Feedback> = new Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    feedback: [feedbackSchema] // This should be an array
});

const userModel = mongoose.models.Users || mongoose.model('Users', userSchema);

export default userModel;