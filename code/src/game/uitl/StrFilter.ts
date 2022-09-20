class StrFilter {
    public constructor() {
    }

    private static talk_words: Array<any>;
    public static compFun(info): void {
        StrFilter.init(info);
    }

    public static init(str: string): void {
        var arr: Array<any> = str.split('、');
        var len: number = arr.length;
        StrFilter.talk_words = [];

        for (var i: number = 0; i < len; i++) {
            str = arr[i];
            if (str == "") continue;
            var reg: RegExp = new RegExp(str, 'gi');
            StrFilter.talk_words.push(reg);
        }
    }

    /**
     * 将敏感词过滤成***号
     */
    public static replace(str: string): string {
        return StrFilter.replacewords(StrFilter.talk_words, str);
    }

    private static dic: any;
    private static replacewords(array: Array<any>, str: string): string {
        var len: number = array.length;
        for (var i: number = 0; i < len; i++) {
            if (array[i])
                str = str.replace(array[i], '***');
        }
        return str;
    }

    private static takeUnRegisterString_(array: Array<any>, str: string): void {
        var len: number = array.length;
        for (var i: number = 0; i < len; i++) {
            if (array[i].lastIndex != 0) array[i].lastIndex = 0;
            var boolean: boolean = array[i].test(str);
            var newStr: string = str.substr(0, str.length);
            if (boolean == true)
                newStr.replace(array[i], StrFilter.cleanFunc);
        }
    }

    private static cleanFunc(...arg): string {
        var strx: string = (arg[0].split(' ') as Array<any>).join('');
        StrFilter.dic[strx] == null ? StrFilter.dic[strx] = strx : '';
        return strx;
    }

    /**
     * 获取其中的敏感词
     */
    public static CONTAIN_FAIL_WORD: string = "";
    public static takeUnRegisterString(str: string): string {
        StrFilter.dic = {};
        var unstr: string = StrFilter.CONTAIN_FAIL_WORD;
        StrFilter.takeUnRegisterString_(StrFilter.talk_words, str);

        for (var j in StrFilter.dic) {
            unstr += j + ' , ';
        }
        var index: number = unstr.lastIndexOf(',');
        index == -1 ? index = unstr.length : index = index;
        unstr = unstr.substr(0, index);
        return unstr;
    }

    private static hasUnRegisterString_(array: Array<any>, str: string): boolean {
        var len: number = array.length;
        for (var i = 0; i < len; i++) {
            if (array[i].lastIndex != 0) array[i].lastIndex = 0;
            if (array[i].test(str))
                return true;
        }
        return false;
    }

    /**
     * 判断是否有敏感词
     */
    public static hasUnRegisterString(str: string): boolean {
        if (StrFilter.hasUnRegisterString_(StrFilter.talk_words, str))
            return true;
        return false;
    }

    private toXingString(index: number): string {
        var s: string = '';
        for (var i: number = 0; i < index; i++)
            s += '*';
        return s;
    }

    public static getWeekNum(value:number): string {
        if(value <= 0){
            return ""
        }else if(value < 7){
            return StrFilter.chnNumChar[value]
        }else if(value == 7){
            return "日"
        }else{
            return ""
        }
    }


    public static getChineseNum(value:number): string {
        if(value < 0){
            return ""
        }else if(value < 10){
            return StrFilter.chnNumChar[value]
        }else if(value == 10){
            return StrFilter.chnUnitChar[1]
        }else if(value < 20){
            return StrFilter.chnUnitChar[1] + StrFilter.getChineseNum(value%10)
        }else{
            //11会显示一十一,所以前面特殊处理   显示十一
            return StrFilter.NumberToChinese(value)
        }
    }
    //单个数字转换用数组实现，
    private static chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    //节权位同样用数组实现，
    private static chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    //节内权位同样用数组实现，
    private static chnUnitChar = ["", "十", "百", "千"];

    private static SectionToChinese(section) {
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = StrFilter.chnNumChar[v] + chnStr;
                }
            } else {
                zero = false;
                strIns = StrFilter.chnNumChar[v];
                strIns += StrFilter.chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    }

    public static NumberToChinese(num) {
        var unitPos = 0;
        var strIns = '', chnStr = '';
        var needZero = false;

        if (num === 0) {
            return StrFilter.chnNumChar[0];
        }

        while (num > 0) {
            var section = num % 10000;
            if (needZero) {
                chnStr = StrFilter.chnNumChar[0] + chnStr;
            }
            strIns = StrFilter.SectionToChinese(section);
            strIns += (section !== 0) ? StrFilter.chnUnitSection[unitPos] : StrFilter.chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }

        return chnStr;
    }
}