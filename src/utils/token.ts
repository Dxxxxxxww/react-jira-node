// @ts-ignore
import jwt from 'jsonwebtoken'
import { CONFIG } from './constant'

export const getToken = ({
    id,
    scope
}: {
    id: number
    scope: number
}): string => {
    const secretKey = CONFIG.security.secretKey
    // 用真正的 id 来制作 token
    return jwt.sign(
        {
            id,
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
