import { Application, Request, Response } from 'express'
import { ERR_CODE } from '../utils/constant'
import { RequestData } from '../types/system-exted'
import { getUserInfo, getUserOptions } from '../model/users-model'

const userRouter = (app: Application) => {
    getUsers(app)
    getInfo(app)
}

const getUsers = (app: Application) => {
    app.get('/api/users', async (req: Request, res: Response) => {
        // const { selectOptions } = users
        const users = await getUserOptions()
        res.json({
            code: ERR_CODE.OK,
            result: {
                userOptions: users
            }
        })
    })
}
// 通过 token 获取用户信息
const getInfo = (app: Application) => {
    app.get('/api/userInfo', async (req, res) => {
        const { decode, token } = (req as RequestData)._data
        const user = await getUserInfo(decode.id)

        if (user) {
            res.json({
                code: ERR_CODE.OK,
                result: {
                    id: user.id,
                    username: user.username,
                    name: user.realName,
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
