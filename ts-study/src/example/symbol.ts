/* 
 * Symbol 表示一个独一无二的值
   它和任何值都不一样.
   不可以做运算 
   可以转换为字符串 和布尔值
 */

const s1 = Symbol();
const s2 = Symbol('aa'); // 这是一个标识 打印出来看是哪个标识创建的值 ts只能string 或number 浏览器 可以传其他的 不过也会转换成字符串
console.log(s1) 
console.log(s2)
console.log(s2.toString())
console.log(Boolean(s2))

// es6 可以用变量设置对象的属性值
let prop = 'name'
const info = {
    [prop]: 'andy'
}
console.log(info)

// symbol 可以用作一个属性名
const s3 = Symbol()
const info2 = {
    [s3]: '123'
}

console.log(info2) // 保证属性是独一无二的
info2[s3] = 'HAHA' // 只能用中括号 不能用点

for(let key in info2) {
    console.log(key)
}

Object.keys(info2)

Object.getOwnPropertyNames(info2)

JSON.stringify(info2)

// 以上遍历不会打印出symbol的属性值

Object.getOwnPropertySymbols(info2)

Reflect.ownKeys(info2)  // es6

// Symbol.for() Symbol.keyFor()
const s4 = Symbol('aaa')
const s5 = Symbol('aaa')

const s6 = Symbol.for('bbb') // 会拿字符串在全局的范围内查找 有没有相同标识符创建的symbol值 有的话就返回 
const s7 = Symbol.for('bbb') 

// 获取symbol.for全局注册symbol的标识 
Symbol.keyFor(s6) // bbb
Symbol.keyFor(s5) // undefined

// 内置的值 
// Symbol.hasInstaance 一个对象有以定义的方法 如果 某个对象使用instanceof 来判断这个对象  会调用这个方法
const obj1 = {
    [Symbol.hasInstance] (object) {
        console.log(object)
    }
}
console.log({a: 1} instanceof <any>obj1)

// Symbol.isConcatSpreadable
let arr = [1, 2]
console.log([].concat(arr, [3,4])) // [1,2,3,4]
arr[Symbol.isConcatSpreadable] = false; // 如果设置为false 数组在concat方法里面不会被扁平化
console.log([].concat(arr,[3,4])) // [Array(2), 3, 4]

// Symbol.species 创建衍生对象的构造函数
class C extends Array {
    constructor(...args) {
        super(...args)
    }
    static get [Symbol.species] () {
        return Array;
    }
 getName() {
     return 'aaaa'
 }   
}

const c = new C(1,2,3);
const a = c.map(item=> {
    console.log(item)
    return item + 1;
})
console.log(a)
console.log(a instanceof C)
console.log(a instanceof Array)


// Symbol.match string.match 会调用用这个方法
// Symbol.replace string.replace 会调用用这个方法
// Symbol.search string.search 会调用用这个方法
// Symbol.split string.split 会调用用这个方法
let obj3 = {
    [Symbol.match] (string) {
        console.log(string.length)
    },
    [Symbol.split] (string) {
        console.log('split', string.length)
    }
}

'abcef'.match(<RegExp>obj3)

// Symbol.iterator 会把数组变成一个迭代器 next() 会一个一个输出值 直到done:true
const arr1 = [1,2,3]
const iterator = arr[Symbol.iterator]()
console.log(iterator)
console.log(iterator.next())

// Symbol.toPrimitive 对象 转换成原始类型

let obj4 = {
    [Symbol.toPrimitive] (type) {
        console.log(type) // 输出转换的原始类型
    }
}

let obj5 = {
    [Symbol.toStringTag]: 'aaa'
}

console.log(obj5.toString()) // [object aaa]