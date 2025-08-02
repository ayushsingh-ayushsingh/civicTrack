import { NextRequest, NextResponse } from "next/server";
import {
    createUser,
    getUserById,
    getUserByPhone,
    updateUser,
    deleteUser,
} from "@/src/db/crud/users";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, phone, password } = body;

        // Basic validation (you can also validate with Zod here)
        if (!name || !phone || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Check if user already exists by phone
        const existingUser = await getUserByPhone(phone);
        if (existingUser) {
            return NextResponse.json({ message: "User with this phone already exists" }, { status: 409 });
        }

        // Create user
        const user = await createUser({ name, phone, password });
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("POST /api/users error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get("id");

        if (userId) {
            const user = await getUserById(Number(userId));
            if (!user) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }
            return NextResponse.json(user);
        }

        // For simplicity, no pagination here - you can implement as needed
        // If you have a getAllUsers function, call it here.
        return NextResponse.json({ message: "Specify user id to fetch" }, { status: 400 });
    } catch (error) {
        console.error("GET /api/users error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updateData } = body;
        if (!id) {
            return NextResponse.json({ message: "User id is required" }, { status: 400 });
        }
        const updatedUser = await updateUser(Number(id), updateData);
        if (!updatedUser) {
            return NextResponse.json({ message: "User not found or update failed" }, { status: 404 });
        }
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("PATCH /api/users error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get("id");
        if (!userId) {
            return NextResponse.json({ message: "User id is required" }, { status: 400 });
        }
        const deletedUser = await deleteUser(Number(userId));
        if (!deletedUser) {
            return NextResponse.json({ message: "User not found or delete failed" }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("DELETE /api/users error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
