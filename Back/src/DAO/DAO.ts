import { Database } from "../Database/Database.js";
import { type RowDataPacket, type ResultSetHeader } from 'mysql2/promise';
import "dotenv/config";


export class DAO<T> {
    private tableName: string;
    private primaryKey: string;

    constructor(tableName: string, primaryKey: string) {
        this.tableName= tableName;
        this.primaryKey = primaryKey;
    }

    private get fullTableName(): string {
        return `${process.env.DB_TABLE}__${this.tableName}`;
    }

    public async create(item: T): Promise<number> {
        const db = Database.getPool();
        const queryString = `INSERT INTO ${this.fullTableName} SET ?`;
        const [result] = await db.query<ResultSetHeader>(queryString, item);
        return result.insertId;
    }

    public async find(options: {where?: string, params?: any[], join?: string}= {}): Promise<T[]> {
        const db = Database.getPool();
        const joinClause = options.join ? options.join : "";
        const whereClause = options.where ? `WHERE ${options.where}` : "";
        const queryString = `SELECT * FROM ${this.fullTableName} ${joinClause} ${whereClause}`;
        const [rows] = await db.query<RowDataPacket[]>(queryString, options.params || []);

        return rows as T[]
    }

    public async findById(id: number): Promise<T | null> {
        const db = Database.getPool();
        const queryString = `SELECT * FROM ${this.fullTableName} WHERE ${this.primaryKey} = ?`;
        const [rows] = await db.query<RowDataPacket[]>(queryString, id);

        return (rows[0] as T) || null;
    }

        public async update(id: number, item: Partial<T>): Promise<number> {
        const db = Database.getPool();
        const query = `UPDATE ${this.fullTableName} SET ? WHERE ${this.primaryKey} = ?`;
        
        const [result] = await db.query<ResultSetHeader>(query, [item, id]);
        return result.affectedRows;
    }

    public async delete(id: number): Promise<number> {
        const db = Database.getPool();
        const sql = `DELETE FROM ${this.fullTableName} WHERE ${this.primaryKey} = ?`;
        
        const [result] = await (db as any).promise().query(sql, [id]);
        
        return (result as ResultSetHeader).affectedRows;
    }
    
}
