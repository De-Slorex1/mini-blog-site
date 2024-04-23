const fs = require('fs')
const path = require('path')
const Arithmetic = require('./func')

// const data  = fs.readFileSync(path.join(__dirname, "./testing/test.txt"), 'utf8')
// fs.writeFileSync('./test/text.txt', "I really want to learn yahoo and make alot of money from it")
// console.log(data)

fs.readFile(path.join(__dirname, './testing/text.txt'), "utf8", (err, value) => {
    if(err) {
        throw err
    } else {
        console.log(value)
    }
})

fs.writeFile('./testing/text2.txt', "I really want to know backend development too", (err, result) => {
    if(err) {
        throw err
    } else {
        console.log(result)
    }
})
const arith = new Arithmetic()
console.log(arith.div(46, 5))
console.log(arith.sum(46, 5))
console.log(arith.mul(46, 5))
console.log(arith.sub(46, 5))