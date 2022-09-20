/**
 * 字符串常用工具类
 * @author: lujiahao 
 * @date: 2018-03-29 20:46:28 
 */
class StringUtil {
    public constructor() {
    }

    /**
     * 解析串的缓存字典
     * 解析一次后缓存起来 下次则直接取出来用
     */
    public static analyStrMap: Object = {};

    /**
     * 把"{type:1, id:123}"这样的字符串转换成Object类
     * @param  {string} str
     * @returns Object
     */
    public static parseStr2Object(str: string): Object {
        let t_obj: Object = {};
        let t_reg: RegExp = /([^\s\{,\}]+):([^\s,\}]+)/g;
        var t_arr: Array<any> = t_reg.exec(str);
        while (t_arr && t_arr.length > 0) {
            let t_key = t_arr[1];
            let t_value = t_arr[2];
            if (isNaN(t_value)) {
                t_obj[t_key] = t_value;
            }
            else {
                t_obj[t_key] = parseInt(t_value);
            }

            t_arr = t_reg.exec(str);
        }
        return t_obj;
    }

    /**
     * 把"[xxx,xxx,xxx,xx]"字符串转换成数组
     * @param  {string} pStr
     * @returns any
     */
    public static parseStr2Array(str: string): any[] {
        let t_list: any[] = [];
        let t_reg: RegExp = /[^\s\[,\]]+/g;
        var t_arr: Array<any> = t_reg.exec(str);
        while (t_arr && t_arr.length > 0) {
            let t_value = t_arr[0];
            if (isNaN(t_value)) {
                t_list.push(t_value);
            }
            else {
                t_list.push(parseInt(t_value));
            }

            t_arr = t_reg.exec(str);
        }
        return t_list;
    }

    /**
     * 集成 parseStr2Object 和 parseStr2Array 接口
     * @param  {string} pStr
     * @returns Object
     */
    public static parseStr2ObjectOrArray(pStr: string): Object {
        if (!pStr || pStr == "")
            return null;
        if (pStr.charAt(0) == "{" && pStr.charAt(pStr.length - 1) == "}")
            return this.parseStr2Object(pStr);
        else if (pStr.charAt(0) == "[" && pStr.charAt(pStr.length - 1) == "]")
            return this.parseStr2Array(pStr);
        else
            null;
    }


    /**
     * 组合成字符串key
     * @param  {any[]} pList
     * @param  {string="_"} pSeperator
     * @returns string
     */
    public static combinKey(pList: any[], pSeperator: string = "_"): string {
        return pList.join(pSeperator);
    }


    /**
     * 在不够指定长度的字符串前补零
     * @param str 需要在前面补零的字符串
     * @param len 总长度
     * @return
     */
    public static renewZero(str: string, len: number): string {
        var bul: string = "";
        var strLen: number = str.length;
        if (strLen < len) {
            for (var i: number = 0; i < len - strLen; i++) {
                bul += "0";
            }
            return bul + str;
        }
        else {
            return str;
        }
    }

    /** 
     * 解析配置表中条件以及属性串等.. 
     * 格式如: [1,2],[2,3],[4,5]... 
     * 如果只有一个 [1,2] 这钟 就不需要此函数了 直接JSON 解析
     */
    public static analyConfigPropertyStr(value: string): any {
        if (value && value != "") {
            if (this.analyStrMap[value]) {
                return this.analyStrMap[value];
            }
            value = "[" + value + "]";
            let obj: any = JSON.parse(value);
            if (obj) {
                this.analyStrMap[value] = obj;
                return obj;
            }
        }
        return null;
    }

   static  compare(x1, y1) {
        let x = x1.split("");
        let y = y1.split("");
        var z = 0;
        var s = x.length + y.length;;

        x.sort();
        y.sort();
        var a = x.shift();
        var b = y.shift();

        while (a !== undefined && b !== undefined) {
            if (a === b) {
                z++;
                a = x.shift();
                b = y.shift();
            } else if (a < b) {
                a = x.shift();
            } else if (a > b) {
                b = y.shift();
            }
        }
        return z / s * 200;
    }
}