import { NextRequest, NextResponse } from 'next/server'
import { findOne } from '@/helpers/dbHelper'
import { User } from '@/types/users'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

export const GET = (request: NextRequest) => {
    try {
        let email: string = "isfhan@gmail.com"
        let password: string = "123456879"
        let user: User | undefined = findOne({ email })
        if (!user) {
            return new NextResponse("User is not register", { status: 400 })
        }
        if (user.isBlocked) {
            return new NextResponse("User is blocked", { status: 400 })
        }
        // const passwordMatch = password == user.password
        const passwordMatch = bcryptjs.compare(password, user.password)
        if (!passwordMatch) {
            return new NextResponse("Password is incorrect", { status: 400 })
        }
        const { password: passwordHash, ...updatedUser } = user

        const token = jwt.sign(updatedUser, process.env.JWT_SECRET_KEY!, { expiresIn: "6h" })
        const response = NextResponse.json({ message: "success", user: updatedUser }, { status: 201 })
        response.cookies.set('token', token, { httpOnly: true })
        return response
    } catch (error: any) {
        throw new Error(error?.message);
    }
} 