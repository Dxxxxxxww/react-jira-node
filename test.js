class P {
    constructor() {}
    sayHi() {
        console.log('P.hi', this)
    }
}

class S extends P {
    constructor() {
        super()
        if (Math.random() > 0.2) {
            super.sayHi()
        } else {
            this.sayHi()
        }
    }
    sayHi() {
        console.log('S.hello', this)
    }
}
