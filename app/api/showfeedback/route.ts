// app/api/feedback/route.ts

import db from "@/lib/db";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await db();
    try {
        const users = await userModel.find({}, 'username feedback').lean();
        
        // Ensure feedback is always an array
        const feedbacks = users.flatMap(user =>
            Array.isArray(user.feedback) ? 
            user.feedback.map(feedback => ({
                ...feedback,
                username: user.username
            })) : []
        );
        console.log(feedbacks)
        return NextResponse.json({ feedbacks });
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        return NextResponse.json({ message: (error as any).message || 'Internal Server Error' }, { status: 500 });
    }
}
