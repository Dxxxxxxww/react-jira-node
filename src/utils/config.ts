import { Options } from 'sequelize'

export const SQL_CONFIG: Options = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'jira',
    dialect: 'mysql',
    timezone: '+08:00',
    logging: true,
    define: {
        freezeTableName: true, // 设置表名与模型名相同
        paranoid: true, // 设置软删除，增加删除时间字段
        underscored: true, // 设置数据库字段为 _ 连接
    }
}
