import { Application, NextFunction, Request, Response } from 'express'
import { getToken, verifyToken } from '../utils/token'
import { Users } from '../db/users'
import { ERR_CODE } from '../utils/constant'
import projectRouter from './project-router'
import userRouter from './user-router'
import { RequestData } from '../types/system-exted'
import {getUserModel} from "../model/users-model";

function registerRouter(app: Application) {
    // 注册
    register(app)
    // 登录
    login(app)
    // 测试
    // testConnection(app)
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
    app.post('/api/login', async (req, res) => {
        const { username, password } = req.body
        const existUser: Users | null = await getUserModel(username)
        console.log(existUser)
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
                id: existUser.id,
                username: existUser.username,
                token: getToken({
                    id: existUser.id,
                    scope: existUser.scope
                })
            }
        })
    })
}

// function testConnection(app: Application) {
    // app.get('/api/test', (req: Request, res: Response) => {
    //     queryDb('SELECT * FROM test')
    //         .then((result: any) => {
    //             console.log('result==', result)
    //         })
    //         .catch((err: Error) => {
    //             console.log(err)
    //         })
    // })
// }

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
