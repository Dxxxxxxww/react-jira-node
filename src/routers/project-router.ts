import { Application, Request, Response } from 'express'
import { projects } from '../db/projects'
import { ERR_CODE } from '../utils/constant'

const projectRouter = (app: Application) => {
    getProjects(app)
    editProject(app)
}

const getProjects = (app: Application) => {
    app.get('/api/projects', (req: Request, res: Response) => {
        const { personId } = req.query
        const { projectList } = projects

        res.json({
            code: ERR_CODE.OK,
            result: {
                projectList:
                    personId && personId != 0
                        ? projectList.filter(
                              (item) => item.personId == personId
                          )
                        : projectList
            }
        })
    })
}

const editProject = (app: Application) => {
    app.patch('/api/projects/edit', (req, res) => {
        const { id, pin } = req.query
    })
}

export default projectRouter
