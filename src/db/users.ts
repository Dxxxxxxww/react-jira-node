import { AUTH_SCOPE } from '../utils/constant'
// 全局通用类型
import { User, BasicUser } from '../types/users'
// 就地维护类型
interface UsersDB {
    userList: Array<User>
    selectOptions: Array<BasicUser>
}

export const users: UsersDB = {
    userList: [
        {
            id: 1,
            uid: 1,
            username: '123',
            password: '123',
            name: 'admin',
            scope: AUTH_SCOPE.superAdmin
        }
    ],
    selectOptions: [
        {
            id: 1,
            name: '高修文'
        },
        {
            id: 2,
            name: '熊天成'
        },
        {
            id: 3,
            name: '郑华'
        },
        {
            id: 4,
            name: '王文静'
        }
    ]
}
