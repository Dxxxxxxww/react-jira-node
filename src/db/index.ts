import mysql from 'mysql'
import { SQL_CONFIG } from '../utils/config'
import { isVoid } from '../utils/utils'

interface queryParams {
    sql: string | mysql.QueryOptions
    args?: any
    cb?: (res: any) => void
}

const pool = mysql.createPool(SQL_CONFIG)

export const queryDb = (sql: string | mysql.QueryOptions, args?: any): any => {
    if (isVoid(args)) {
        return connect(sql)
    }
    return connect(sql, args)
}

const connect = (...[sql, args]: Parameters<typeof queryDb>): any => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err)
            }

            connection.query(sql, args, (error, results) => {
                if (error) {
                    return reject(error)
                }
                connection.release()
                return resolve(results)
            })
        })
    })
}

// const connectWithoutParams = ({ sql, cb }: queryParams) => {
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.log('[connection ERROR] - ', err.message)
//             return
//         }

//         connection.query(sql, (error, results) => {
//             if (error) {
//                 console.log('[SELECT ERROR] - ', error.message)
//                 return
//             }
//             cb(results)
//             connection.release()
//         })
//     })
// }

// const connectWithParams = ({ sql, args, cb }: queryParams) => {
//     pool.getConnection((err, connection) => {
//         if (err) throw err

//         connection.query(sql, args, (error, results) => {
//             if (error) throw error
//             cb(results)
//             connection.release()
//         })
//     })
// }

// const connectWithoutParams2 = ({ sql }: queryParams) => {
//     return new Promise((resolve, reject) => {
//         pool.getConnection((err, connection) => {
//             if (err) {
//                 return reject(err)
//             }

//             connection.query(sql, (error, results) => {
//                 if (error) {
//                     return reject(error)
//                 }
//                 connection.release()
//                 return resolve(results)
//             })
//         })
//     })
// }

// const connection = (resolve, reject, sql, args) =>
//     pool.getConnection((err, connection) => {
//         if (err) {
//             return reject(err)
//         }

//         connection.query(sql, args, (error, results) => {
//             if (error) {
//                 return reject(error)
//             }
//             connection.release()
//             return resolve(results)
//         })
//     })
