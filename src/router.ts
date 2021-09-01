import { Application, Request, Response } from 'express'
import { getToken, verifyToken } from './utils/token'
import { users } from './db/users'
import { User } from './types/users'
import { ERR_CODE } from './utils/constant'
import { nextTick } from 'process'

function registerRouter(app: Application) {
    // 注册
    register(app)
    // 登录
    login(app)
    app.use((req, res, next) => {
        const { authorization } = req.headers
        const token = authorization?.slice(7)
        const decode = verifyToken(token as string)
        console.log('decode---', decode)
        next(res.json(decode))
    })
    // 用户
    getUsers(app)
    // 项目
    getProjects(app)
    testConnection(app)
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
                item.username === username && item.password === password
        )

        if (!!existUser) {
            res.json({
                code: ERR_CODE.OK,
                result: {
                    id: existUser.id,
                    name: existUser.name,
                    token: getToken({
                        uid: existUser.uid,
                        scope: existUser.scope
                    })
                }
            })
        } else {
            res.json({
                code: ERR_CODE.ERROR,
                result: {
                    errMsg: '账号或密码不正确'
                }
            })
        }
    })
}

function getUsers(app: Application) {
    app.get('/api/users', (result, req: Request, res: Response) => {
        const { selectOptions } = users
        // if (!!decode?.scope) {
        res.json({
            code: ERR_CODE.OK,
            result
            // {
            //     userOptions: selectOptions
            // }
        })
        // }
    })
}

function getProjects(app: Application) {
    app.get('/api/projects', (req: Request, res: Response) => {
        const { authorization } = req.headers
        const token = authorization?.slice(7)
        const decode = verifyToken(token as string)

        const { selectOptions } = users
        if (!!decode?.scope) {
            res.json({
                code: ERR_CODE.OK,
                result: {
                    userOptions: selectOptions
                }
            })
        }
    })
}

function testConnection(app: Application) {
    app.get('/api/test', (req: Request, res: Response) => {
        res.send('成功啦')
    })
}

export default registerRouter
