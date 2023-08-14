import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const response = NextResponse.json({ message: "logout" }, { status: 200 })
        response.cookies.delete("token");
        return response
    } catch (error: any) {
        throw new Error(error?.message);
    }
}