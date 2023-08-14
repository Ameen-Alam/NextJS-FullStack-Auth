import { NextRequest, NextResponse } from 'next/server'
import { findOne } from '@/helpers/dbHelper'
import { tokenValidator } from '@/helpers/tokenValidator'
import { User, UserData } from '@/types/users'

export const userValidation = (GetDataFromToken: UserData): UserData | never | string => {
    try {
        const user: User | undefined = findOne(GetDataFromToken)
        if (!user) {
            return "User is undefined"
        }
        if (user.isBlocked) {
            return "User is blocked"
        }
        const { password, ...data } = user
        return data
    } catch (error: any) {
        throw new Error(error?.message);
    }
} 