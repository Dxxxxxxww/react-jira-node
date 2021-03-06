// import { AUTH_SCOPE } from '../utils/constant'
// // 全局通用类型
// import { User, BasicUser } from '../types/users'
// // 就地维护类型
// interface UsersDB {
//     userList: Array<User>
//     selectOptions: Array<BasicUser>
// }

// export const users: UsersDB = {
//     userList: [
//         {
//             id: 1, // 真正的 id
//             uid: 1, // 暴露给前端的 id
//             username: '123',
//             password: '123',
//             name: 'admin',
//             scope: AUTH_SCOPE.superAdmin
//         }
//     ],
//     selectOptions: [
//         {
//             id: 1,
//             name: '高修文'
//         },
//         {
//             id: 2,
//             name: '熊天成'
//         },
//         {
//             id: 3,
//             name: '郑华'
//         },
//         {
//             id: 4,
//             name: '王文静'
//         }
//     ]
// }

// export const getUsers = () => {
//     // queryDb({ sql: 'SELECT * FROM USERS', cb(reslut) {} })
// }

import sequelize from './index'
import Sequelize, { Model } from 'sequelize'

export class Users extends Model {
    // 踩坑记录：这里定义数据类型时不能给默认值，否则查询到的数据会被这里给覆盖掉
    public id: number | undefined
    public username: string | undefined
    public password: string | undefined
    public realName: string | undefined
    public scope: number | undefined
}

Users.init(
    {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING(32),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(32),
            allowNull: false
        },
        realName: Sequelize.STRING(32),
        scope: Sequelize.INTEGER.UNSIGNED
    },
    {
        sequelize,
        modelName: 'users'
        // tableName: 'users'
    }
)
