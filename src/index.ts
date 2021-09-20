import express from 'express'
// @ts-ignore
import cors from 'cors'
import router from './routers/router'

const app = express()
const port = 9205

app.use(
    cors({
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    })
)
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

// 注册接口
router(app)

app.listen(port, () => {
    console.log(port, '服务器运行成功')
})
