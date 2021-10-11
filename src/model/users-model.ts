import { Users } from '../db/users'

// export const addUser = () => {}
// 查找用户是否存在，登录
export const getUser = async (username: string) =>
    await Users.findOne({
        where: {
            username
        },
        attributes: ['id', 'username', 'password', 'scope']
    })
// 获取用户下拉列表框
export const getUserOptions = async () =>
    await Users.findAll({
        attributes: ['id', 'username', 'realName', 'scope']
    })
// 根据 token 携带的 id 获取用户信息
export const getUserInfo = async (id: number) =>
    await Users.findOne({
        where: {
            id
        },
        attributes: ['id', 'username', 'realName', 'scope']
    })
