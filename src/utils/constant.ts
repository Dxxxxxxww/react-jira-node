export const CONFIG = {
    security: {
        secretKey: '1q2w3e4r5t6y'
    }
}

// 用户身份权限
export const AUTH_SCOPE = {
    user: 8,
    admin: 16,
    superAdmin: 32
}

export enum ERR_CODE {
    OK = 1,
    ERROR,
    NOT_ALLOW
}
