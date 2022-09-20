var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StrFilter = (function () {
    function StrFilter() {
    }
    StrFilter.compFun = function (info) {
        StrFilter.init(info);
    };
    StrFilter.init = function (str) {
        var arr = str.split('、');
        var len = arr.length;
        StrFilter.talk_words = [];
        for (var i = 0; i < len; i++) {
            str = arr[i];
            if (str == "")
                continue;
            var reg = new RegExp(str, 'gi');
            StrFilter.talk_words.push(reg);
        }
    };
    /**
     * 将敏感词过滤成***号
     */
    StrFilter.replace = function (str) {
        return StrFilter.replacewords(StrFilter.talk_words, str);
    };
    StrFilter.replacewords = function (array, str) {
        var len = array.length;
        for (var i = 0; i < len; i++) {
            if (array[i])
                str = str.replace(array[i], '***');
        }
        return str;
    };
    StrFilter.takeUnRegisterString_ = function (array, str) {
        var len = array.length;
        for (var i = 0; i < len; i++) {
            if (array[i].lastIndex != 0)
                array[i].lastIndex = 0;
            var boolean = array[i].test(str);
            var newStr = str.substr(0, str.length);
            if (boolean == true)
                newStr.replace(array[i], StrFilter.cleanFunc);
        }
    };
    StrFilter.cleanFunc = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        var strx = arg[0].split(' ').join('');
        StrFilter.dic[strx] == null ? StrFilter.dic[strx] = strx : '';
        return strx;
    };
    StrFilter.takeUnRegisterString = function (str) {
        StrFilter.dic = {};
        var unstr = StrFilter.CONTAIN_FAIL_WORD;
        StrFilter.takeUnRegisterString_(StrFilter.talk_words, str);
        for (var j in StrFilter.dic) {
            unstr += j + ' , ';
        }
        var index = unstr.lastIndexOf(',');
        index == -1 ? index = unstr.length : index = index;
        unstr = unstr.substr(0, index);
        return unstr;
    };
    StrFilter.hasUnRegisterString_ = function (array, str) {
        var len = array.length;
        for (var i = 0; i < len; i++) {
            if (array[i].lastIndex != 0)
                array[i].lastIndex = 0;
            if (array[i].test(str))
                return true;
        }
        return false;
    };
    /**
     * 判断是否有敏感词
     */
    StrFilter.hasUnRegisterString = function (str) {
        if (StrFilter.hasUnRegisterString_(StrFilter.talk_words, str))
            return true;
        return false;
    };
    StrFilter.prototype.toXingString = function (index) {
        var s = '';
        for (var i = 0; i < index; i++)
            s += '*';
        return s;
    };
    StrFilter.getWeekNum = function (value) {
        if (value <= 0) {
            return "";
        }
        else if (value < 7) {
            return StrFilter.chnNumChar[value];
        }
        else if (value == 7) {
            return "日";
        }
        else {
            return "";
        }
    };
    StrFilter.getChineseNum = function (value) {
        if (value < 0) {
            return "";
        }
        else if (value < 10) {
            return StrFilter.chnNumChar[value];
        }
        else if (value == 10) {
            return StrFilter.chnUnitChar[1];
        }
        else if (value < 20) {
            return StrFilter.chnUnitChar[1] + StrFilter.getChineseNum(value % 10);
        }
        else {
            //11会显示一十一,所以前面特殊处理   显示十一
            return StrFilter.NumberToChinese(value);
        }
    };
    StrFilter.SectionToChinese = function (section) {
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
            }
            else {
                zero = false;
                strIns = StrFilter.chnNumChar[v];
                strIns += StrFilter.chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    };
    StrFilter.NumberToChinese = function (num) {
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
    };
    /**
     * 获取其中的敏感词
     */
    StrFilter.CONTAIN_FAIL_WORD = "";
    //单个数字转换用数组实现，
    StrFilter.chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    //节权位同样用数组实现，
    StrFilter.chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    //节内权位同样用数组实现，
    StrFilter.chnUnitChar = ["", "十", "百", "千"];
    return StrFilter;
}());
__reflect(StrFilter.prototype, "StrFilter");
