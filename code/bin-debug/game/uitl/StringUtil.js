var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 字符串常用工具类
 * @author: lujiahao
 * @date: 2018-03-29 20:46:28
 */
var StringUtil = (function () {
    function StringUtil() {
    }
    /**
     * 把"{type:1, id:123}"这样的字符串转换成Object类
     * @param  {string} str
     * @returns Object
     */
    StringUtil.parseStr2Object = function (str) {
        var t_obj = {};
        var t_reg = /([^\s\{,\}]+):([^\s,\}]+)/g;
        var t_arr = t_reg.exec(str);
        while (t_arr && t_arr.length > 0) {
            var t_key = t_arr[1];
            var t_value = t_arr[2];
            if (isNaN(t_value)) {
                t_obj[t_key] = t_value;
            }
            else {
                t_obj[t_key] = parseInt(t_value);
            }
            t_arr = t_reg.exec(str);
        }
        return t_obj;
    };
    /**
     * 把"[xxx,xxx,xxx,xx]"字符串转换成数组
     * @param  {string} pStr
     * @returns any
     */
    StringUtil.parseStr2Array = function (str) {
        var t_list = [];
        var t_reg = /[^\s\[,\]]+/g;
        var t_arr = t_reg.exec(str);
        while (t_arr && t_arr.length > 0) {
            var t_value = t_arr[0];
            if (isNaN(t_value)) {
                t_list.push(t_value);
            }
            else {
                t_list.push(parseInt(t_value));
            }
            t_arr = t_reg.exec(str);
        }
        return t_list;
    };
    /**
     * 集成 parseStr2Object 和 parseStr2Array 接口
     * @param  {string} pStr
     * @returns Object
     */
    StringUtil.parseStr2ObjectOrArray = function (pStr) {
        if (!pStr || pStr == "")
            return null;
        if (pStr.charAt(0) == "{" && pStr.charAt(pStr.length - 1) == "}")
            return this.parseStr2Object(pStr);
        else if (pStr.charAt(0) == "[" && pStr.charAt(pStr.length - 1) == "]")
            return this.parseStr2Array(pStr);
        else
            null;
    };
    /**
     * 组合成字符串key
     * @param  {any[]} pList
     * @param  {string="_"} pSeperator
     * @returns string
     */
    StringUtil.combinKey = function (pList, pSeperator) {
        if (pSeperator === void 0) { pSeperator = "_"; }
        return pList.join(pSeperator);
    };
    /**
     * 在不够指定长度的字符串前补零
     * @param str 需要在前面补零的字符串
     * @param len 总长度
     * @return
     */
    StringUtil.renewZero = function (str, len) {
        var bul = "";
        var strLen = str.length;
        if (strLen < len) {
            for (var i = 0; i < len - strLen; i++) {
                bul += "0";
            }
            return bul + str;
        }
        else {
            return str;
        }
    };
    /**
     * 解析配置表中条件以及属性串等..
     * 格式如: [1,2],[2,3],[4,5]...
     * 如果只有一个 [1,2] 这钟 就不需要此函数了 直接JSON 解析
     */
    StringUtil.analyConfigPropertyStr = function (value) {
        if (value && value != "") {
            if (this.analyStrMap[value]) {
                return this.analyStrMap[value];
            }
            value = "[" + value + "]";
            var obj = JSON.parse(value);
            if (obj) {
                this.analyStrMap[value] = obj;
                return obj;
            }
        }
        return null;
    };
    StringUtil.compare = function (x1, y1) {
        var x = x1.split("");
        var y = y1.split("");
        var z = 0;
        var s = x.length + y.length;
        ;
        x.sort();
        y.sort();
        var a = x.shift();
        var b = y.shift();
        while (a !== undefined && b !== undefined) {
            if (a === b) {
                z++;
                a = x.shift();
                b = y.shift();
            }
            else if (a < b) {
                a = x.shift();
            }
            else if (a > b) {
                b = y.shift();
            }
        }
        return z / s * 200;
    };
    /**
     * 解析串的缓存字典
     * 解析一次后缓存起来 下次则直接取出来用
     */
    StringUtil.analyStrMap = {};
    return StringUtil;
}());
__reflect(StringUtil.prototype, "StringUtil");
