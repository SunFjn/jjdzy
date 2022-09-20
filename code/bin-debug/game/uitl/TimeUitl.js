var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimeUitl = (function () {
    function TimeUitl() {
    }
    TimeUitl.isIn7Days = function () {
        return Model_GlobalMsg.kaifuDay <= 7;
    };
    /**
     * 判断是否开服第N天
     * return	true:在开服N天内
     */
    TimeUitl.isKaiFuTime = function (day) {
        var kaifuZeroTime = TimeUitl.getKaiFuZeroTime(); //开服当天0点
        var serverTime = Model_GlobalMsg.getServerTime();
        var severDay = day * 24 * 60 * 60;
        var timeX = severDay - (serverTime - kaifuZeroTime) / 1000;
        if (timeX < 0) {
            return false;
        }
        return true;
    };
    /**
    * 判断是否开服第N天
    * return	true:在开服N天内
    */
    TimeUitl.isKaiFuInDay = function (day) {
        if (day <= 0)
            return true;
        return TimeUitl.isKaiFuTime(day - 1);
    };
    /**
     * 判断是否开服1-N天（补充判断开服前几天就开服入口，判断）
     * return	true:在开服N天内   false:开服前几天开服入口/开服N天后
     */
    TimeUitl.isKaiFuTimeOnly = function (day) {
        var kaifuZeroTime = TimeUitl.getKaiFuZeroTime(); //开服当天0点
        var serverTime = Model_GlobalMsg.getServerTime();
        if (serverTime < kaifuZeroTime) {
            return false;
        }
        var someDay = day * 24 * 60 * 60;
        var timeX = someDay - (serverTime - kaifuZeroTime) / 1000;
        if (timeX < 0) {
            return false;
        }
        return true;
    };
    /**
     * 开服当天0点  单位:毫秒
     */
    TimeUitl.getKaiFuZeroTime = function () {
        var today = new Date(Model_GlobalMsg.kaiFuTime * 1000);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        var time = today.getTime();
        return time;
    };
    /**
     * 传入时间当天的0点
     * time 	时间，单位毫秒
     * return   单位毫秒
     */
    TimeUitl.getZeroTime = function (time) {
        var today = new Date(time);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        var time = today.getTime();
        return time;
    };
    /**
     * 传入时间当天的23点59分59秒
     * time 	时间，单位毫秒
     * return   单位毫秒
     */
    TimeUitl.getZeroTime23h59m59s = function (time) {
        var today = new Date(time);
        today.setHours(23);
        today.setMinutes(59);
        today.setSeconds(59);
        today.setMilliseconds(999);
        var time = today.getTime();
        return time;
    };
    /**
     * 传入时间当天的N点N分N秒
     * time 	时间，单位毫秒
     * return   单位毫秒
     */
    TimeUitl.getTimeByHoursMin = function (time, hours, minutes, seconds) {
        if (hours === void 0) { hours = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        var today = new Date(time);
        today.setHours(hours);
        today.setMinutes(minutes);
        today.setSeconds(seconds);
        today.setMilliseconds(0);
        var time = today.getTime();
        return time;
    };
    /**
     * 计算剩余时间，输出：n天n小时n分
     * 	timeBig/timeLittle 	时间，单位毫秒  例子：timeBig明天，timeLittle今天
     * 	format	参考默认值，默认值输出 n天n小时n分n秒
     */
    TimeUitl.getRemainingTime = function (timeBig, timeLittle, format) {
        if (format === void 0) { format = { day: "天", hour: "小时", minute: "分", second: "秒" }; }
        var timeX = (timeBig - timeLittle) / 1000;
        var day = Math.floor(timeX / (24 * 60 * 60)); //向下取整
        var hour = Math.floor(timeX % (24 * 60 * 60) / (60 * 60));
        var minute = Math.floor(timeX % (24 * 60 * 60) % (60 * 60) / 60);
        var second = Math.floor(timeX % (24 * 60 * 60) % (60 * 60) % 60);
        var timeData = "";
        var t;
        if (format.day) {
            t = day;
            t = t < 10 ? "0" + t : t;
            timeData = timeData + t + format.day;
        }
        if (format.hour) {
            t = hour;
            t = t < 10 ? "0" + t : t;
            timeData = timeData + t + format.hour;
        }
        if (format.minute) {
            t = minute;
            t = t < 10 ? "0" + t : t;
            timeData = timeData + t + format.minute;
        }
        if (format.second) {
            t = second;
            t = t < 10 ? "0" + t : t;
            timeData = timeData + t + format.second;
        }
        return timeData;
    };
    /**
     * 传入时间当天的0点
     * time 	时间，单位毫秒 一般传入服务器的当前时间
     * return   单位毫秒
     */
    TimeUitl.getTime = function (time, h, m, s, ms) {
        if (m === void 0) { m = 0; }
        if (s === void 0) { s = 0; }
        if (ms === void 0) { ms = 0; }
        var today = new Date(time);
        today.setHours(h);
        today.setMinutes(m);
        today.setSeconds(s);
        today.setMilliseconds(ms);
        var time = today.getTime();
        return time;
    };
    TimeUitl.cool = function (key, oneTime) {
        var ret = true;
        var now = egret.getTimer();
        if (this.coolRecorder[key]) {
            ret = (now - this.coolRecorder[key]) >= oneTime;
        }
        if (ret)
            this.coolRecorder[key] = now;
        return ret;
    };
    /**开服七天 */
    TimeUitl.day7 = 7;
    /**1天  单位秒*/
    TimeUitl.ONE_DAY_MILLISE = 24 * 60 * 60 * 1000;
    /**
     * 传入唯一的key
     * 返回是否可以执行并且覆盖CD
    */
    TimeUitl.coolRecorder = {};
    return TimeUitl;
}());
__reflect(TimeUitl.prototype, "TimeUitl");
