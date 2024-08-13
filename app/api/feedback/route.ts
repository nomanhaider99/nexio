import db from "@/lib/db";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await db();
    try {
        const { email, message } = await request.json();

        // Ensure feedback is an object with message and createdAt
        const feedback = {
            message,
            createdAt: new Date()
        };

        // Find the user and update their feedback array
        const user = await userModel.findOneAndUpdate(
            { email: email },
            {
                $push: {
                    feedback: feedback // Append feedback to the array
                }
            },
            {
                new: true, // Return the updated document
                runValidators: true // Ensure the update meets schema requirements
            }
        );

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Feedback added successfully", user });
    } catch (error) {
        console.error("Error adding feedback:", error);
        return NextResponse.json({ message: (error as any).message || 'Internal Server Error' }, { status: 500 });
    }
}
