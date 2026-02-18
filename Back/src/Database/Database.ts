import mysql from "mysql2/promise";
import "dotenv/config";


export class Database {
    private static pool: mysql.Pool | null = null;

    public static initPool(): void{
        if (this.pool) {
            console.warn("Database connection already");
            return;
        }
        try {
            this.pool = mysql.createPool({
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                connectionLimit: 10, // Nombre max de connexions simultanées
            });
            console.log('Database Pool initialized');
        } catch (error) {
            console.error('Initialization failed : ', error);
            return;
        }
    }

    public static getPool(): mysql.Pool {
        if (!this.pool) {
            throw new Error('connection not init');
        }
        return this.pool;
    }

    public static async closePool(): Promise<void> {
        if (this.pool) {
            await this.pool.end();
            this.pool = null;
            console.log('Database pool closed');
        } else {
            console.warn('No database connection to close')
        }
    }
}