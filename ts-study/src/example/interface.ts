const getFullName = ({ firstName, lastName}: NameInfo): string => {
    return `${firstName} ${lastName}`
}

interface NameInfo {
    firstName: string,
    lastName: string
}

interface Vegetable {
    color?: string, // 可选属性
    readonly type: string, // 只读属性
    [props: string]: string
}

// 定义一个函数形式的接口
type AddFunc = (num1: number, num2: number) => number

// 索引类型 属性值随意 符合类型要求即可
interface RoleDic {
    [id: number]: string
}

const role1: RoleDic = {
    0: '123',
    2: '312'
}

// 混合类型接口 Counter是一个函数 具有count
interface Counter {
    ():void,
    count: number
}
const getCounter = (): Counter => {
    const c = () => { c.count++ }
    c.count = 0
    return c
}

const counter: Counter = getCounter()
counter()