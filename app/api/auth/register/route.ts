import { findOne, writeDB, UniqueID } from "@/helpers/dbHelper"
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { whereT, User } from '@/types/users'

export const GET = async () => {
    try {
        let name: string = "Isfhan";
        let email: string = "isfhan@gmail.com";
        let password: string = "123456879"
        let salt: string = await bcryptjs.genSalt(10)
        let passwordhash: string = await bcryptjs.hash(password, salt)
        let user: User | undefined = findOne({ email } as whereT)
        if (user) {
            return new NextResponse("user already registered", { status: 400 })
        }
        let newUser: User = {
            _id: UniqueID(),
            name,
            email,
            password: passwordhash,
            isBlocked: false
        }
        writeDB(newUser)
        return NextResponse.json({ message: "success" }, { status: 201 })
    } catch (error: any) {
        throw new Error(error?.message);
    }
}