import { Application, Request, Response } from 'express'
import { users } from '../db/users'
import { ERR_CODE } from '../utils/constant'
import { RequestData } from '../types/system-exted'

const userRouter = (app: Application) => {
    getUsers(app)
    getInfo(app)
}

const getUsers = (app: Application) => {
    app.get('/api/users', (req: Request, res: Response) => {
        const { selectOptions } = users
        res.json({
            code: ERR_CODE.OK,
            result: {
                userOptions: selectOptions
            }
        })
    })
}
// 通过 token 获取用户信息
const getInfo = (app: Application) => {
    app.get('/api/userInfo', (req, res) => {
        const { decode, token } = (req as RequestData)._data
        const user = users.userList.find((item) => item.id === decode.id)

        if (user) {
            res.json({
                code: ERR_CODE.OK,
                result: {
                    id: user.uid, // 将 uid 返回给前端，而不是把真正的 id 返回
                    username: user.username,
                    name: user.name,
                    token
                }
            })
        } else {
            res.json({
                code: ERR_CODE.NOT_ALLOW,
                result: {},
                message: '请重新登录！'
            })
        }
    })
}

export default userRouter
