import { Database, RunResult } from 'sqlite3';
import {User} from "./user";
const db = new Database('./usersdatabase.db');

// Create users table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT,
            lastName TEXT,
            emailAddress TEXT,
            password TEXT
        )
    `);
});

export async function getAllUsers(): Promise< User[]> {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                //todo: should we also return the password??? if no change the comment line
                const users: User[] = rows.map((row: any) => new User(row.id, row.firstName, row.lastName, row.emailAddress, row.password));
                // const users: User[] = rows.map((row: any) => new User(row.id, row.firstName, row.lastName, row.emailAddress, "****"));
                resolve(users);
            }
        });
    });
}

export async function createUser(newUser): Promise<number> {
    return new Promise((resolve, reject) => {
        db.run(`
            INSERT INTO users (firstName, lastName, emailAddress, password)
            VALUES (?, ?, ?, ?)
        `, [newUser.firstName, newUser.lastName, newUser.emailAddress, newUser.password], function (this: RunResult, err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

export async function deleteUserById(userId): Promise<number> {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM users WHERE id = ?', [userId], function (this: RunResult, err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
}

// Close the database connection
export function closeDatabase(): void {
    db.close();
}
