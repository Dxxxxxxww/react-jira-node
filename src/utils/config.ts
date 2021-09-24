import { PoolConfig } from 'mysql'

export const SQL_CONFIG: PoolConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'jira',
    connectionLimit: 10
}
