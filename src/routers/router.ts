import { Application, NextFunction, Request, Response } from 'express'
import { getToken, verifyToken } from '../utils/token'
import { users } from '../db/users'
import { ERR_CODE } from '../utils/constant'
import projectRouter from './project-router'
import userRouter from './user-router'

function registerRouter(app: Application) {
    // 注册
    register(app)
    // 登录
    login(app)
    // 测试
    testConnection(app)
    app.use(_verifyToken)
    // 用户模块
    userRouter(app)
    // 项目模块
    projectRouter(app)
}

function register(app: Application) {
    app.post('/api/register', (req, res) => {
        const { username, password } = req.body
        if (username === '123' && password === '123') {
            res.json({
                code: ERR_CODE.OK,
                result: {}
            })
        } else {
            res.json({
                code: ERR_CODE.ERROR,
                result: {
                    errMsg: '注册失败'
                }
            })
        }
    })
}

function login(app: Application) {
    app.post('/api/login', (req, res) => {
        const { username, password } = req.body
        const { userList } = users
        const existUser = userList.find(
            (item: { username: string; password: string }) =>
                item.username === username
        )

        if (!existUser) {
            return res.json({
                code: ERR_CODE.ERROR,
                result: {},
                message: '账号未注册，请先注册'
            })
        }

        if (existUser?.password !== password) {
            return res.json({
                code: ERR_CODE.ERROR,
                result: {},
                message: '账号或密码不正确，请重试'
            })
        }

        return res.json({
            code: ERR_CODE.OK,
            result: {
                id: existUser.uid, // 将 uid 返回给前端，而不是把真正的 id 返回
                name: existUser.username,
                token: getToken({
                    id: existUser.id,
                    scope: existUser.scope
                })
            }
        })
    })
}

function testConnection(app: Application) {
    app.get('/api/test', (req: Request, res: Response) => {
        res.send('成功啦')
    })
}

function _verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers
    const token = authorization?.slice(7)
    const decode = verifyToken(token as string)
    if (!!decode) {
        ;(req as RequestData)._data = {
            decode,
            token
        }
        next()
    } else {
        return res.status(401).json({
            code: ERR_CODE.NOT_ALLOW,
            result: {},
            message: `未授权账户`
        })
    }
}

export default registerRouter
