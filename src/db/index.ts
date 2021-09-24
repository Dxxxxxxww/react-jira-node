import mysql from 'mysql'
import { SQL_CONFIG } from '../utils/config'
import { isVoid } from '../utils/utils'

interface queryParams {
    sql: string | mysql.QueryOptions
    args?: any
    cb: (res: any) => void
}

const pool = mysql.createPool(SQL_CONFIG)

export const queryDb = ({ sql, args, cb }: queryParams) => {
    if (isVoid(args)) {
        return connectWithoutParams({ sql, cb })
    }
    return connectWithParams({ sql, args, cb })
}

const connectWithoutParams = ({ sql, cb }: queryParams) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[connection ERROR] - ',err.message);
            return;
        }

        connection.query(sql, (error, results) => {
            if (error) {
                console.log('[SELECT ERROR] - ',error.message);
                return;
            }
            cb(results)
            connection.release()
        })
    })

}

const connectWithParams = ({ sql, args, cb }: queryParams) => {
    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(sql, args, (error, results) => {
            cb(results)
            connection.release()
            if (error) throw error
        })
    })
}
