export function isvalidUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

export const pickerOptions = [
    {
        text: '今天',
        onClick(picker) {
            const end = new Date()
            const start = new Date(new Date().toDateString())
            end.setTime(start.getTime())
            picker.$emit('pick', [start, end])
        }
    }, {
        text: '最近一周',
        onClick(picker) {
            const end = new Date(new Date().toDateString())
            const start = new Date()
            start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
        }
    }, {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date(new Date().toDateString())
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
        }
    }, {
        text: '最近三个月',
        onClick(picker) {
            const end = new Date(new Date().toDateString())
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
        }
    }
]

// 格林威时间转换成字符串格式时间
export function GMTToStr(time){
    let date = new Date(time),
        year = date.getFullYear(),
        month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
        day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

    return year+'-'+month+'-'+day
}