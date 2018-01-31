// 匹配状态
export function filterStatus(status) {
    if(!status) return

    let s;
    switch (status) {
        case 0:
            s = '未上线'
            break;
        case 1:
            s = '已上线'
            break;
        case 2:
            s = '已下线'
            break;
        case 3:
            s = '已结束'
            break;
        case 4:
            s = '已删除'
            break;
    }
    return s
}

// 匹配认证资料
export function filterAuthentication(value) {
    if(!value) return

    let arr = value.split(','),
        str = ''

    //认证资料 （基本信息：0，身份认证：1，手机认证：2，芝麻信用：3，信用卡：4，填写联系人：5，填写工作信息：6，信用卡账单：7，淘宝认证：8，征信查询：9）
    arr.forEach((val, index, array) => {
        switch(val) {
            case '0':
                str += '，基本信息'
                break;
            case '1':
                str += '，身份认证'
                break;
            case '2':
                str += '，手机认证'
                break;
            case '3':
                str += '，芝麻信用'
                break;
            case '4':
                str += '，信用卡'
                break;
            case '5':
                str += '，填写联系人'
                break;
            case '6':
                str += '，填写工作信息'
                break;
            case '7':
                str += '，信用卡账单'
                break;
            case '8':
                str += '，淘宝认证'
                break;
            case '9':
                str += '，征信查询'
                break;
        }
    })

    return str.substr(1)
}

// 可借贷人群
export function filterUserType(value) {
    if(!value) return

    let arr = value.split(','),
        str = ''

    //可借贷人群  0，无工作  1，蓝领  2，白领  3，上班族  4， 个体户  5，企业主  6，学生党
    arr.forEach((val, index, array) => {
        switch(val) {
            case '0':
                str += '，无工作'
                break;
            case '1':
                str += '，蓝领'
                break;
            case '2':
                str += '，白领'
                break;
            case '3':
                str += '，上班族'
                break;
            case '4':
                str += '，个体户'
                break;
            case '5':
                str += '，企业主'
                break;
            case '6':
                str += '，学生党'
                break;
        }
    })

    return str.substr(1)
}

// 匹配设备
export function filterClientType(val) {
    if(!val) return

    let v;
    switch (val) {
        case 0:
            v = 'iphone'
            break;
        case 1:
            v = 'ipad'
            break;
        case 2:
            v = '安卓'
            break;
        case 3:
            v = '其他'
            break;
    }
    return v
}