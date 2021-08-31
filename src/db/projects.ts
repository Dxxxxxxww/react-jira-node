import { Projects } from '../types/projects'
// 就地维护类型
interface ProjectsDB {
    projectList: Array<Projects>
}

export const projects: ProjectsDB = {
    projectList: [
        {
            id: 1,
            name: '骑手管理',
            personId: 1,
            organization: '外卖组',
            created: 1604989757139
        },
        {
            id: 2,
            name: '团购 APP',
            personId: 2,
            organization: '团购组',
            created: 1604989757139
        },
        {
            id: 3,
            name: '物料管理系统',
            personId: 2,
            organization: '物料组',
            created: 1546300800000
        },
        {
            id: 4,
            name: '总部管理系统',
            personId: 3,
            organization: '总部',
            created: 1604980000011
        },
        {
            id: 5,
            name: '送餐路线规划系统',
            personId: 4,
            organization: '外卖组',
            created: 1546900800000
        }
    ]
}
