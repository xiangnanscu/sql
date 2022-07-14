class a {
  foo = 1
  print() {
    console.log(Object.getPrototypeOf(this)==a.prototype)
  }
}

class b extends a {
  foo = 2
  say() {
    console.log("hahaha")
  }
  copy() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
}

let bi = new b()
let bc = bi.copy()
bi.say()
bc.say()

console.log(Object.getPrototypeOf(bi), Object.getPrototypeOf(bc),bc instanceof b)