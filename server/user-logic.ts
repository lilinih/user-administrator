import { getAllUsers, createUser as createUserDBFunc, deleteUserById } from './user-db';
import bcrypt from 'bcrypt';
import { executeFunction, invalidResponse } from './util';

const User = require("./user")

export async function getUsers() {
    //todo: () => getAllUsers(page, count)
    return await executeFunction(getAllUsers, {});

}

export async function deleteUser(userId: string) {
    if (!Number.isInteger(parseInt(userId))) {
        return { ...invalidResponse, data: 'Invalid user ID' };
    }
    //maybe we should delete by mail?
    return await executeFunction(() => deleteUserById(userId), { statusCode: 201 });
}

export async function createUser(user: typeof User) {
    if (!user.firstName || !user.lastName || !user.emailAddress || !user.password) {
        return  { ...invalidResponse, data: 'Fill all requested data.' };;
    }
    if (!isValidName(user.firstName) || !isValidName(user.lastName)) {
        return  { ...invalidResponse, data: 'Enter valid name.' };;
    }

    if (!isValidEmail(user.emailAddress)) {
        return  { ...invalidResponse, data: 'Enter valid email' };;
    }

    if (!isValidPassword(user.password)) {
        return  { ...invalidResponse, data: 'Create stronger password' };;
    }
    user.password = await bcrypt.hash(user.password, 10); // 10 is the salt rounds, adjust as per your requirement

    return await executeFunction(() => createUserDBFunc(user), { statusCode: 201 });
}


function isValidName(name: string): boolean {
    return typeof name === 'string' && name.trim().length > 0;
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
    return password.length >= 8; // Adjust as per your requirements
}

