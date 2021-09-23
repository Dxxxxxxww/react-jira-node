import mysql from 'mysql'

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'jira'
})

export const query = (sql, args, cb) => {
    if (args) {
        
    }
    pool.getConnection((err, connection) => {
        connection.query(sql, args, (err, rows) => {

        })
    })
}
