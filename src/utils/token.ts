// @ts-ignore
import jwt from 'jsonwebtoken'
import { CONFIG } from './constant'

export const getToken = ({
    uid,
    scope
}: {
    uid: number
    scope: number
}): string => {
    const secretKey = CONFIG.security.secretKey
    return jwt.sign(
        {
            uid,
            scope
        },
        secretKey
    )
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, CONFIG.security.secretKey)
    } catch (error) {
        return undefined
    }
}
