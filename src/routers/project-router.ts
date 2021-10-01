import { Application, Request, Response } from 'express'
import { editProjectDb, getProjectsDb, projects } from '../db/projects'
import { ERR_CODE } from '../utils/constant'

const projectRouter = (app: Application) => {
    getProjects(app)
    editProject(app)
}

const getProjects = (app: Application) => {
    app.get('/api/projects', (req: Request, res: Response) => {

        getProjectsDb()
            .then((result: any) => {
                res.json({
                    code: ERR_CODE.OK,
                    result: {
                        projectList: result
                    }
                })
            })
            .catch((err: Error) => {
                res.json({
                    code: ERR_CODE.ERROR,
                    result: {},
                    message: err.message
                })
            })
    })
}

const editProject = (app: Application) => {
    app.patch('/api/projects/edit', (req, res) => {
        const { id, pin } = req.body
        editProjectDb(id, pin)
            .then((result: any) => {
                res.json({
                    code: ERR_CODE.OK,
                    result: {}
                })
            })
            .catch((err: Error) => {
                res.json({
                    code: ERR_CODE.ERROR,
                    result: {},
                    message: err.message
                })
            })
    })
}

export default projectRouter
