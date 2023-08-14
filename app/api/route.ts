import { NextRequest, NextResponse } from 'next/server'
import { userValidation } from "@/helpers/userValidation"
import { tokenValidator } from '@/helpers/tokenValidator'
import { UserData } from '@/types/users'

export const GET = async (request: NextRequest, response: NextResponse) => {
    try {
        let getDataFromToken = tokenValidator(request)
        if (typeof getDataFromToken === "string") {
            let response = new NextResponse(getDataFromToken as string, { status: 400 })
            response.cookies.delete("token")
            return response
        }
        let user: UserData | string = userValidation(getDataFromToken)
        if (typeof user === "string") {
            let response = new NextResponse(user as string, { status: 400 })
            response.cookies.delete("token")
            return response
        }
        return NextResponse.json({ message: "success", user }, { status: 200 })
    } catch (error: any) {
        throw new Error(error?.message);
    }
} 