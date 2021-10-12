import { Projects } from '../db/projects'
// 查询所有项目
export const getProjectsModel = async () =>
    await Projects.findAll({
        attributes: ['id', 'projectName', 'personId', 'organization', 'pin']
    })
// 修改收藏
export const editProjectModel = async (id: number, pin: number) =>
    await Projects.update(
        {
            pin
        },
        {
            where: {
                id
            }
        }
    )
