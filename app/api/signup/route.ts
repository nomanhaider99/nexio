import db from "@/lib/db";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from "bcryptjs"

export async function POST(request: NextRequest) {
    await db();
    try {
        const { username, email, password} = await request.json();
        const userExistsByEmail = await userModel.findOne({email: email});
        if (userExistsByEmail) {
            throw new Error("user already exists");
        }
        const userExistsByUsername = await userModel.findOne({username: username});
        if (userExistsByUsername) {
            throw new Error("user already exists");
        }
        const hashedPassword = await bycryptjs.hash(password, 10);
        const user = await userModel.create({username: username, email: email, password: hashedPassword});
        if (!user) {
            throw new Error("user registration failed")
        }
        return NextResponse.json({message: "user created succesfully"})
    } catch (error: any) {
        throw new Error(error.message);
    }
}