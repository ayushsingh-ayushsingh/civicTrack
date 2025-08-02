import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const { phone, password } = await req.json();

        if (!phone || !password) {
            return NextResponse.json(
                { message: "Phone and password are required" },
                { status: 400 }
            );
        }

        // Fetch user by phone
        const users = await db.select().from(usersTable).where(eq(usersTable.phone, phone));
        const user = users[0];

        if (!user) {
            return NextResponse.json(
                { message: "Invalid phone or password" },
                { status: 401 }
            );
        }

        // Simple plain text password check
        if (user.password !== password) {
            return NextResponse.json(
                { message: "Invalid phone or password" },
                { status: 401 }
            );
        }

        // Login successful
        return NextResponse.json(
            { message: "Login successful", user: { id: user.id, name: user.name, phone: user.phone } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
