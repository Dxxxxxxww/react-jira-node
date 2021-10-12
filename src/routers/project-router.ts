import { Application, Request, Response } from 'express'
import { ERR_CODE } from '../utils/constant'
import { editProjectModel, getProjectsModel } from '../model/projects-model'

const projectRouter = (app: Application) => {
    getProjects(app)
    editProject(app)
}

const getProjects = (app: Application) => {
    app.get('/api/projects', async (req: Request, res: Response) => {
        const projects = await getProjectsModel()
        if (projects) {
            return res.json({
                code: ERR_CODE.OK,
                result: {
                    projectList: projects
                }
            })
        }
        return res.json({
            code: ERR_CODE.ERROR,
            result: {},
            message: '操作失败'
        })
    })
}

const editProject = (app: Application) => {
    app.patch('/api/projects/edit', async (req, res) => {
        const { id, pin } = req.body

        const result = await editProjectModel(id, pin ? 1 : 0)
        if (result[0]) {
            return res.json({
                code: ERR_CODE.OK,
                result: {}
            })
        }
        return res.json({
            code: ERR_CODE.ERROR,
            result: {},
            message: '操作失败'
        })
    })
}

export default projectRouter
