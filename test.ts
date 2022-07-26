class Test {
  foo() {
    console.log("foo");
  }
  bar() {
    console.log("bar");
  }
  w() {
    console.log(this)
    this.foo = this.bar
    console.log(this);
    return this
  }
}

let t = new Test()

t.foo()
t.w()
t.foo()

export {};