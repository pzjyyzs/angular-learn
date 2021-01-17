// 布尔类型
let bool: boolean = true;

// 数字类型

let num: number = 123;
console.log(num)

// 元组类型 数组的拓展 数组指定了类型 可以写多个元素
// 元组是固定长度和固定位置类型的

let tuple: [string, number, boolean] = ['abc', 123, true]

// 枚举类型 类型用于取值被限定在一定范围内的场景 一周七天 颜色限制为红蓝绿 用户角色权限等  
// 每一个属性有一个序列号 可以自动的 0开始 可以至指定  可以指定数字和字符串
// 可以通过名字拿到序列号 也可以通过 序列号拿到名字
enum Roles {
    SUPER_ADMIN, // 0
    ADMIN,  // 1
    USER // 2
}

enum Roles2 {
    SUPER_ADMIN = 1, // 1
    ADMIN = 3,  // 3
    USER = 8 // 8
}

enum Roles3 {
    SUPER_ADMIN, // 0
    ADMIN = 4,  // 4
    USER // 5
}
console.log(Roles.ADMIN)
/*  结果是1 例如 后端返回登陆的角色权限是 0 代表 超级管理员，1 管理员，2 用户
 *   登陆后做不一样的事
 *  roles === 1 不容易知道1是什么权限 所以定义一个人枚举类型 Roles.ADMIN
 */

console.log(Roles2.ADMIN)
console.log(Roles3.USER)
console.log(Roles3[5])

// any类型 任何类型
// void 类型 什么类型都不是 可以赋值给 undefined 和 null(需要调整设置strictNullChecks为false)

const consoleText = (text: string): void => {
    console.log(text)
}

// never 类型 永远不存在值的类型 抛出错误 死循环永远不可能有返回值
const errorFunc = (message: string): never => {
    throw new Error(message);
}


// object 

let getObject = (obj: object): void =>  {
    console.log(obj)
}

// 类型断言 某个值强行指定为某个值 <string>target 或  target as string

const getLength = (target: string | number): number => {
    if ((<string>target).length || (target as string).length === 0) {
        return (target as string).length
    } else {
        return target.toString().length
    }
}
