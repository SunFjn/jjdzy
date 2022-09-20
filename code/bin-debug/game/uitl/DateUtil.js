var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DateUtil = (function () {
    function DateUtil() {
    }
    DateUtil.getSeverTime = function (value, offset) {
        var date = new Date(value);
        date.setHours(date.getHours() + offset);
        var hoursStr = date.getUTCHours() < 10 ? ('0' + date.getUTCHours()) : date.getUTCHours().toString();
        var minutesStr = date.getUTCMinutes() < 10 ? ('0' + date.getUTCMinutes()) : date.getUTCMinutes().toString();
        var secondsStr = date.getUTCSeconds() < 10 ? ('0' + date.getUTCSeconds()) : date.getUTCSeconds().toString();
        return hoursStr + ':' + minutesStr + ':' + secondsStr;
    };
    DateUtil.getSeverTime2 = function (value, offset) {
        var date = new Date(value);
        var hoursStr = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours().toString();
        var minutesStr = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes().toString();
        var secondsStr = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds().toString();
        return hoursStr + ':' + minutesStr + ':' + secondsStr;
    };
    DateUtil.getServerMS = function (value, offset) {
        var date = new Date(value);
        date.setHours(date.getHours() + offset);
        var minutesStr = date.getUTCMinutes() < 10 ? ('0' + date.getUTCMinutes()) : date.getUTCMinutes().toString();
        var secondsStr = date.getUTCSeconds() < 10 ? ('0' + date.getUTCSeconds()) : date.getUTCSeconds().toString();
        return minutesStr + ':' + secondsStr;
    };
    DateUtil.getServerHM = function (value, offset) {
        var date = new Date(value);
        date.setHours(date.getHours() + offset);
        var hoursStr = date.getUTCHours() < 10 ? ('0' + date.getUTCHours()) : date.getUTCHours().toString();
        var minutesStr = date.getUTCMinutes() < 10 ? ('0' + date.getUTCMinutes()) : date.getUTCMinutes().toString();
        return hoursStr + ':' + minutesStr;
    };
    DateUtil.decodeInt2String = function ($date) {
        var date = $date + '';
        var year = date.slice(0, 4);
        var month = date.slice(4, 6);
        var day = date.slice(6, 8);
        var time = date.slice(8, 10);
        return year + "-" + month + "-" + day + " " + time;
    };
    //取UTC时间
    DateUtil.getUTCDate = function (date) {
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date;
    };
    DateUtil.addYear = function (date, years) {
        if (years === void 0) { years = 0; }
        date.setMonth(date.getMonth() + years * 12);
        return date;
    };
    DateUtil.addMonth = function (date, months) {
        if (months === void 0) { months = 0; }
        date.setMonth(date.getMonth() + months);
        return date;
    };
    DateUtil.addDay = function (date, days) {
        if (days === void 0) { days = 0; }
        date.setDate(date.getDate() + days);
        return date;
    };
    DateUtil.addHours = function (date, hours) {
        if (hours === void 0) { hours = 0; }
        date.setHours(date.getHours() + hours);
        return date;
    };
    DateUtil.addMinutes = function (date, minutes) {
        if (minutes === void 0) { minutes = 0; }
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    };
    DateUtil.addSeconds = function (date, seconds) {
        if (seconds === void 0) { seconds = 0; }
        date.setSeconds(date.getSeconds() + seconds);
        return date;
    };
    DateUtil.format = function (date, formString) {
        if (formString === void 0) { formString = 'YYYY-MM-DD'; }
        var dateFormatter = new DateFormatter();
        dateFormatter.formatString = formString;
        return dateFormatter.format(date);
    };
    //比较时间差 返回毫秒数
    DateUtil.dateDiffer = function (startTime, endTime) {
        return startTime.getTime() - endTime.getTime();
    };
    DateUtil.getDateBySeconds = function (seconds) {
        /* var year:Number = 365*24*60*60*60;//1892160000;
        var month:Number =
        if(seconds%) */
        return '';
    };
    /**
     *
     * @param second
     * @param division  可以是　:  - 　　等符号；
     * @return
     *
     */
    DateUtil.getHMSBySecond = function (second, division) {
        if (division === void 0) { division = null; }
        if (division == null) {
            division = "时分秒";
        }
        var h = (second / 3600) >> 0;
        var m = (second % 3600 / 60) >> 0;
        var s = (second % 3600 % 60) >> 0;
        var result = "";
        if (h > 0) {
            result = h + division.charAt(0);
        }
        if (m > 0 || h > 0) {
            result = result + m + division.charAt(1);
        }
        result = result + s + division.charAt(2);
        return result;
    };
    /**
     * 00时00分
     * @param second
     * @param division
     * @return
     *
     */
    DateUtil.getHMBySecond1 = function (second, division) {
        if (division === void 0) { division = "时分"; }
        var s = second % 60;
        if (s > 0) {
            second = second - s + 60;
        }
        var h = Math.floor(second / 3600);
        var m = Math.floor(second % 3600 / 60);
        var result;
        result = h >= 10 ? h.toString() + division.charAt(0) : "0" + h.toString() + division.charAt(0);
        result += m >= 10 ? m.toString() + division.charAt(1) : "0" + m.toString() + division.charAt(1);
        return result;
    };
    /**获取时间 例如:01:50:03*/
    DateUtil.getHMSBySecond2 = function (second, division) {
        if (division === void 0) { division = "::"; }
        var h = Math.floor(second / 3600);
        var m = Math.floor(second % 3600 / 60);
        var s = second % 3600 % 60;
        var result;
        result = h >= 10 ? h + division.charAt(0) : "0" + h + division.charAt(0);
        result += m >= 10 ? m + division.charAt(0) : "0" + m + division.charAt(0);
        result += s >= 10 ? s : "0" + s;
        return result;
    };
    /**获取时间 例如:50:03*/
    DateUtil.getMSBySec3 = function (second, division) {
        if (division === void 0) { division = ":"; }
        var min = Math.floor(second / 60);
        var se = Math.ceil(second % 60);
        return DateUtil.addZero(min + "") + division + DateUtil.addZero(se + "");
    };
    /**例如：1天1时1分1秒 */
    DateUtil.getMSBySecond4 = function (second, division) {
        if (division === void 0) { division = null; }
        var result = "";
        var day = Math.floor(second / (3600 * 24));
        if (day > 0) {
            result = day + "天";
        }
        var h = second % (3600 * 24);
        if (h == 0) {
            return result;
        }
        var hour = Math.floor(h / 3600);
        if (hour > 0) {
            if (hour >= 10) {
                result += hour + "时";
            }
            else {
                result += "0" + hour + "时";
            }
        }
        var min = Math.floor(h % 3600);
        if (min == 0)
            return result;
        var minu = Math.floor(min / 60);
        if (minu > 0) {
            if (minu >= 10) {
                result += minu + "分";
            }
            else {
                result += "0" + minu + "分";
            }
        }
        var sec = Math.floor(min % 60);
        if (day > 0)
            return result;
        var secon = sec;
        if (secon >= 10) {
            result += secon + "秒";
        }
        else {
            result += "0" + secon + "秒";
        }
        return result;
    };
    /** 例如：1天1时1分*/
    DateUtil.getMSBySecond5 = function (second, division) {
        if (division === void 0) { division = null; }
        var result = "";
        var day = Math.floor(second / (3600 * 24));
        if (day > 0) {
            result = day + "天";
        }
        var h = second % (3600 * 24);
        if (h == 0) {
            return result;
        }
        var hour = Math.floor(h / 3600);
        if (hour > 0) {
            if (hour >= 10) {
                result += hour + "时";
            }
            else {
                result += "0" + hour + "时";
            }
        }
        var min = Math.floor(h % 3600);
        if (min == 0)
            return result;
        var minu = Math.floor(min / 60);
        if (minu > 0) {
            if (minu >= 10) {
                result += minu + "分";
            }
            else {
                result += "0" + minu + "分";
            }
        }
        var sec = Math.floor(min % 60);
        if (day > 0)
            return result;
        var secon = sec;
        // if (secon >= 10) {
        // 	result += secon + "秒";
        // } else {
        // 	result += "0" + secon + "秒";
        // }
        return result;
    };
    DateUtil.getHMBysecond = function (second, division) {
        if (division === void 0) { division = ":"; }
        var result = "";
        var time = Number(second) * 1000;
        var date = new Date(time);
        var m;
        result = this.addZero(String(date.getHours())) + division;
        m = String(date.getMinutes());
        if (m.length < 2) {
            m = "0" + m;
        }
        result += m;
        return result;
    };
    DateUtil.clone = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    //获取月份的天数
    DateUtil.getDaysByMonth = function (year, month) {
        var days = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //初始月份中的天数
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            //判断是否为润年 是:2=>29,否:2=>28
            //days.splice(1,1,29);	//替换days[1]中的值
            days[1] = 29;
        }
        if (month > 11)
            month = 11;
        if (month < 0)
            month = 0;
        return days[month];
    };
    DateUtil.getYearMonthDay = function (value, division) {
        if (division === void 0) { division = "--"; }
        var temStr;
        var data = new Date(value * 1000);
        temStr = data.getDate() < 10 ? '0' + data.getDate().toString() : data.getDate().toString();
        return data.getFullYear().toString() + division.charAt(0) + (data.getMonth() + 1).toString() + division.charAt(1) + temStr + (division.charAt(2) ? division.charAt(2) : "");
    };
    /**
     * 显示YYYY-MM-DD HH:MM
     * @param value
     * @param c1
     * @param c2
     * @param c3
     * @param c4
     * @return
     *
     */
    DateUtil.getYMDHM = function (value, c1, c2, c3, c4) {
        if (c1 === void 0) { c1 = "-"; }
        if (c2 === void 0) { c2 = "-"; }
        if (c3 === void 0) { c3 = " "; }
        if (c4 === void 0) { c4 = ":"; }
        var str;
        var data = new Date(value * 1000);
        str = data.getFullYear().toString(); //年
        str += c1 + (data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1).toString() : (data.getMonth() + 1).toString()); //月
        str += c2 + (data.getDate() < 10 ? "0" + data.getDate().toString() : data.getDate().toString()); //日
        str += c3 + (data.getHours() < 10 ? "0" + data.getHours().toString() : data.getHours().toString());
        str += c4 + (data.getMinutes() < 10 ? "0" + data.getMinutes().toString() : data.getMinutes().toString());
        return str;
    };
    /**
     * 显示MM-DD HH:MM
     * @param value
     * @param c1
     * @param c2
     * @param c3
     * @return
     *
     */
    DateUtil.getMDHM = function (value, c1, c2, c3, c4) {
        if (c1 === void 0) { c1 = "-"; }
        if (c2 === void 0) { c2 = " "; }
        if (c3 === void 0) { c3 = ":"; }
        if (c4 === void 0) { c4 = ""; }
        var str;
        var data = new Date(value * 1000);
        str = (data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1).toString() : (data.getMonth() + 1).toString()); //月
        str += c1 + (data.getDate() < 10 ? "0" + data.getDate().toString() : data.getDate().toString()); //日
        str += c2 + (data.getHours() < 10 ? "0" + data.getHours().toString() : data.getHours().toString());
        str += c3 + (data.getMinutes() < 10 ? "0" + data.getMinutes().toString() : data.getMinutes().toString());
        str += c4;
        return str;
    };
    /**
     * 显示MM-DD HH:MM
     * @param value
     * @param c1
     * @param c2
     * @param c3
     * @return
     *
     */
    DateUtil.getMDHM2 = function (value, c1, c2, c3, c4) {
        if (c1 === void 0) { c1 = "-"; }
        if (c2 === void 0) { c2 = " "; }
        if (c3 === void 0) { c3 = ":"; }
        if (c4 === void 0) { c4 = ""; }
        var str;
        var data = new Date(value * 1000);
        str = (data.getMonth() + 1).toString(); //月
        str += c1 + data.getDate().toString(); //日
        str += c2 + data.getHours().toString();
        str += c3 + data.getMinutes().toString();
        str += c4;
        return str;
    };
    /**
     * 显示YYYY-MM-DD HH:MM:SS
     * @param value
     * @param c1
     * @param c2
     * @param c3
     * @param c4
     * @return
     *
     */
    DateUtil.getYMDHMS = function (value, c1, c2, c3, c4) {
        if (c1 === void 0) { c1 = "-"; }
        if (c2 === void 0) { c2 = "-"; }
        if (c3 === void 0) { c3 = " "; }
        if (c4 === void 0) { c4 = ":"; }
        var str;
        var data = new Date(value * 1000);
        str = data.getFullYear().toString(); //年
        str += c1 + (data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1).toString() : (data.getMonth() + 1).toString()); //月
        str += c2 + (data.getDate() < 10 ? "0" + data.getDate().toString() : data.getDate().toString()); //日
        str += c3 + (data.getHours() < 10 ? "0" + data.getHours().toString() : data.getHours().toString());
        str += c4 + (data.getMinutes() < 10 ? "0" + data.getMinutes().toString() : data.getMinutes().toString());
        str += c4 + (data.getSeconds() < 10 ? "0" + data.getSeconds().toString() : data.getSeconds().toString());
        return str;
    };
    DateUtil.addZero = function (str) {
        if (str.length == 1) {
            str = "0" + str;
        }
        return str;
    };
    DateUtil.dateCompareFun = function (a, b) {
        if (a.getTime() > b.getTime()) {
            return 1;
        }
        if (a.getTime() < b.getTime()) {
            return -1;
        }
        return 0;
    };
    DateUtil.dateCompareFunDesc = function (a, b) {
        if (a.getTime() > b.getTime()) {
            return -1;
        }
        if (a.getTime() < b.getTime()) {
            return 1;
        }
        return 0;
    };
    DateUtil.getSubDate = function (a, b) {
        var newA = this.clearHourse(a);
        var newB = this.clearHourse(b);
        return Math.abs(Math.round((newA.getTime() - newB.getTime()) / (24 * 3600 * 1000)));
    };
    DateUtil.clearHourse = function (date) {
        var result = new Date(date.getTime());
        result.setHours(0);
        result.setMinutes(0);
        result.setSeconds(0);
        return result;
    };
    DateUtil.getDayHourStr = function (sec, format) {
        if (format === void 0) { format = null; }
        var ret;
        if (sec < 0) {
            sec = 0;
        }
        // if(format == null) {
        // 	format = "{0}天{1}小时";
        // }
        var d = sec / (3600 * 24);
        var h = (sec % (24 * 3600)) / 3600;
        ret = d + "天" + h + "小时";
        return ret;
    };
    /**
     * 格式化一个使用了多久的时间（是一段时间，区别于时刻）
     * @param pSeconds 秒
     * @param pFormatType 格式化格式
     * @param pNeedZero 个位数补零标志位
     * @return
     */
    DateUtil.formatUsedTime = function (pSeconds, pFormatType, pNeedZero) {
        if (pFormatType === void 0) { pFormatType = "hh:uu:ss"; }
        if (pNeedZero === void 0) { pNeedZero = true; }
        pSeconds = pSeconds < 0 ? 0 : pSeconds;
        var t_day = 0;
        var t_hour = 0;
        var t_minute = 0;
        var t_second = 0;
        var t_totalDayTime = 0;
        var t_totalHourTime = 0;
        var t_totalMinuteTime = 0;
        if (pFormatType == null) {
            pFormatType = "hh:uu:ss";
        }
        if (pFormatType.indexOf("dd") != -1) {
            t_day = Math.floor(pSeconds / 86400);
            t_totalDayTime = t_day * 86400;
        }
        if (pFormatType.indexOf("hh") != -1) {
            t_hour = Math.floor((pSeconds - t_totalDayTime) / 3600);
            t_totalHourTime = t_hour * 3600;
        }
        if (pFormatType.indexOf("uu") != -1) {
            t_minute = Math.floor(((pSeconds - t_totalDayTime - t_totalHourTime) / 60));
            t_totalMinuteTime = t_minute * 60;
        }
        if (pFormatType.indexOf("ss") != -1) {
            t_second = pSeconds - t_totalDayTime - t_totalHourTime - t_totalMinuteTime;
        }
        pFormatType = pFormatType.replace("dd", pNeedZero && t_day < 10 ? "0" + t_day : "" + t_day);
        pFormatType = pFormatType.replace("hh", pNeedZero && t_hour < 10 ? "0" + t_hour : "" + t_hour);
        pFormatType = pFormatType.replace("uu", pNeedZero && t_minute < 10 ? "0" + t_minute : "" + t_minute);
        pFormatType = pFormatType.replace("ss", pNeedZero && t_second < 10 ? "0" + t_second : "" + t_second);
        return pFormatType;
    };
    return DateUtil;
}());
__reflect(DateUtil.prototype, "DateUtil");
var DateFormatter = (function () {
    function DateFormatter() {
    }
    DateFormatter.prototype.DateFormatter = function () {
    };
    Object.defineProperty(DateFormatter.prototype, "formatString", {
        get: function () {
            return this._formatString;
        },
        set: function (value) {
            if (value)
                this._formatString = value;
        },
        enumerable: true,
        configurable: true
    });
    DateFormatter.prototype.format = function (value) {
        var str;
        //to do 日期格式
        return str;
    };
    return DateFormatter;
}());
__reflect(DateFormatter.prototype, "DateFormatter");
