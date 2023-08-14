import path from 'path';
import fs from 'fs'
import { whereT, User } from '@/types/users'
const DBpath = path.join(process.cwd(), "/database/db.json")
type db = User[]
type dbResponse = db | Error

export const readDB = () => {
    try {
        const db = fs.readFileSync(DBpath, "utf8")
        const dbResponse = JSON.parse(db)
        return dbResponse
    } catch (error: any) {
        throw new Error(error?.message);
    }
}
// console.log(readDB(), " readDB")

export const writeDB = (updatedUsers: User) => {
    try {
        const db: dbResponse = readDB()
        if (db instanceof Error) {
            return db
        }
        const updateUsers = JSON.parse(JSON.stringify(db));
        updateUsers.users.push(updatedUsers);
        const dbWrite = fs.writeFileSync(DBpath, JSON.stringify(updateUsers, null, 2))
        return updateUsers
    } catch (error: any) {
        throw new Error(error?.message);
    }
}
// console.log(writeDB({
//     "_id": "54564654",
//     "name": "Hamza",
//     "email": "hamza@gmail.com",
//     "password": "87654321",
//     "isBlocked": false
// }));

export const findOne = (where: whereT): User | undefined => {
    try {
        const db = readDB()
        return db.users.find((item: User): boolean | undefined => {
            if (where.email) return where.email == item.email
            if (where.name) return where.name == item.name
            if (where._id) return where._id == item._id
        })
    } catch (error: any) {
        throw new Error(error?.message);
    }
}
// console.log(findOne({ email: "ameen@gmail.com" }), " findOne")

export const UniqueID = () => {
    let characters = "abcdefghijklmnopqrstuvwxyz32106478974863ABCDEFGHJIKLOPQRSTUVEDNXZ@#$%^&*()(*&^%$#"
    let uniqueID = ""
    for (let i = 0; i < 15; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        uniqueID += characters[randomIndex]
    }
    return uniqueID
}
// console.log(UniqueID(), " UniqueID")