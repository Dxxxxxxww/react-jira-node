// import { Project } from '../types/projects'
// // import { toCamelCase } from '../utils/utils'
// // import { queryDb } from './index'
// // 就地维护类型
// interface ProjectsDB {
//     projectList: Array<Project>
// }
//
// export const projects: ProjectsDB = {
//     projectList: [
//         {
//             id: 1,
//             name: '骑手管理',
//             personId: 1,
//             organization: '外卖组',
//             created: 1604989757139
//         },
//         {
//             id: 2,
//             name: '团购 APP',
//             personId: 2,
//             organization: '团购组',
//             created: 1604989757139
//         },
//         {
//             id: 3,
//             name: '物料管理系统',
//             personId: 2,
//             organization: '物料组',
//             created: 1546300800000
//         },
//         {
//             id: 4,
//             name: '总部管理系统',
//             personId: 3,
//             organization: '总部',
//             created: 1604980000011
//         },
//         {
//             id: 5,
//             name: '送餐路线规划系统',
//             personId: 4,
//             organization: '外卖组',
//             created: 1546900800000
//         }
//     ]
// }
//
// // export const getProjectsDb = () => {
// //     return queryDb(`SELECT * FROM project_list`)
// //         .then((result: any[]) =>
// //             result.reduce((camelArr: Project[], item: Project) => {
// //                 const camelItem = Object.keys(item).reduce((initVal, key) => {
// //                     initVal[toCamelCase(key)] = item[key]
// //                     return initVal
// //                 }, {} as Project)
// //                 camelArr.push(camelItem)
// //                 return camelArr
// //             }, [] as Project[])
// //         )
// //         .catch(Promise.reject)
// // }
// //
// // export const editProjectDb = (id: number, pin: boolean) => {
// //     return queryDb(
// //         `UPDATE project_list SET pin = ${Number(pin)} WHERE id = ${id}`
// //     )
// // }

import sequelize from './index'
import Sequelize, { Model } from 'sequelize'

export class Projects extends Model {}

Projects.init(
    {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        projectName: {
            type: Sequelize.STRING(32),
            allowNull: false
        },
        personId: Sequelize.INTEGER.UNSIGNED,
        organization: Sequelize.STRING(32),
        pin: Sequelize.INTEGER.UNSIGNED
    },
    {
        sequelize,
        modelName: 'projects'
        // tableName: 'users'
    }
)
