### 跨域配置的几种方式

1. 使用自带的 cors 库（目前使用的是这种）
2. 自己配置

```js
// 第一种
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*') //自定义中间件，设置跨域需要的响应头。

    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    ) //允许任何方法

    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type,X-Session-Token'
    ) //允许任何类型

    next() //一定要添加这段代码，不然程序无法正常往下执行
}
app.use(allowCrossDomain)
// 第二种
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001') //当允许携带cookies此处的白名单不能写’*’
    res.header(
        'Access-Control-Allow-Headers',
        'content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'
    ) //允许的请求头
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT') //允许的请求方法
    res.header('Access-Control-Allow-Credentials', true) //允许携带cookies
    next()
})
```
