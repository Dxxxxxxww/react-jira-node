import { Request } from 'express'

export interface RequestData extends Request {
    _data: any
}
