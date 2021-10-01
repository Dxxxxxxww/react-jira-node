let isFunction = (value: any) =>
    value && Object.toString.call(value) === '[object Function]'

if (
    typeof /./ !== 'function' &&
    typeof Int8Array !== 'object'
    // && typeof document.childNodes !== 'function'
) {
    isFunction = function (obj) {
        return typeof obj === 'function' || false
    }
}

export { isFunction }

// undefined 并不是保留词（reserved word），它只是全局对象的一个属性，在低版本 IE 中能被重写。
// undefined 在 ES5 中已经是全局对象的一个只读（read-only）属性了，它不能被重写。但是在局部(函数)作用域中，还是可以被重写的。
// function aa() {
//     var undefined = 10
//     console.log(undefined)
// }
// aa() // log: 10
export const isVoid = (value: any) =>
    value === void 0 || value === null || value === ''

export const isString = (str: any) => typeof str === 'string'

export const toCamelCase = (item: string): string =>
    item.replace(/\_([a-z])/g, (all: string, letter: string) => {
        return letter.toUpperCase()
    })
