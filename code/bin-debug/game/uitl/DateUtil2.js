var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 更简单的通用时间转换工具
 * @author: lujiahao
 * @date: 2018-05-09 22:11:08
 */
var DateUtil2 = (function () {
    function DateUtil2() {
    }
    DateUtil2.formatDate = function (d, formatType) {
        if (formatType === void 0) { formatType = "yyyy/mm/dd hh:uu:ss"; }
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        var ms = d.getMilliseconds();
        if (formatType.indexOf("yyyy") != -1) {
            formatType = formatType.replace("yyyy", year.toString());
        }
        else {
            year = parseInt((year + "").substr(2, 2));
            var ty = year < 10 ? "0" + year : "" + year;
            formatType = formatType.replace("yy", ty.toString());
        }
        formatType = formatType.replace("mm", month < 10 ? "0" + month : "" + month);
        formatType = formatType.replace("dd", date < 10 ? "0" + date : "" + date);
        formatType = formatType.replace("hh", hour < 10 ? "0" + hour : "" + hour);
        formatType = formatType.replace("uu", minute < 10 ? "0" + minute : "" + minute);
        formatType = formatType.replace("ss", second < 10 ? "0" + second : "" + second);
        formatType = formatType.replace("ms", StringUtil.renewZero(ms + "", 3));
        return formatType;
    };
    /**
     * 格式化时刻（只用于格式化时刻，即某年某月某日的一个具体时刻，区分于一段时间）
     * <br> yyyy/yy 表示年（4位显示或2位显示）
     * <br> mm表示月
     * <br> dd表示天
     * <br> hh表示小时
     * <br> uu表示分钟
     * <br> ss表示秒
     * <br> ms表示毫秒
     * <br>
     * <br> 例：
     * <br> DateUtil.formatTime(0,"yyyy年mm月dd日hh时uu分ss秒") --> 1970年01月01日08时00分00秒
     * <br> DateUtil.formatTime(0,"yyyy/mm/dd hh:uu:ss") --> 1970/01/01 08:00:00
     * <br> DateUtil.formatTime(0,"hh:uu:ss") --> 08:00:00
     * <br>  DateUtil.formatTime(0,"dd天hh时uu分") --> 08天00时00分
     * <br> DateUtil.formatTime(0,"yyyy呵呵mm呵呵dd hh呵呵uu呵呵ss") --> 1970呵呵01呵呵01 08呵呵00呵呵00
     * @param time 毫秒数
     * @param formatType 自定义格式
     */
    DateUtil2.formatTime = function (time, formatType) {
        if (formatType === void 0) { formatType = "yyyy/mm/dd hh:uu:ss"; }
        var d = new Date();
        d.setTime(time);
        return this.formatDate(d, formatType);
    };
    /**
     * 格式化一个使用了多久的时间（是一段时间，区别于时刻）
     * @param pSeconds 秒
     * @param pFormatType 格式化格式
     * @param pNeedZero 个位数补零标志位
     * @return
     */
    DateUtil2.formatUsedTime = function (pSeconds, pFormatType, pNeedZero) {
        if (pFormatType === void 0) { pFormatType = "hh:uu:ss"; }
        if (pNeedZero === void 0) { pNeedZero = true; }
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
    return DateUtil2;
}());
__reflect(DateUtil2.prototype, "DateUtil2");
