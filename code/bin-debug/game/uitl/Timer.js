var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** 时间管理 */
var Timer = (function () {
    /** 时间管理 */
    function Timer() {
        this.tasks = [];
        this.$temp = [];
        this.$pool = [];
    }
    Object.defineProperty(Timer, "instance", {
        get: function () {
            if (!Timer._instance) {
                Timer._instance = new Timer();
            }
            return Timer._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**增加时间监听
     * fun 回调函数
     * thisObj 回调函数的this
     * time 间隔时间 毫秒
     * startTime 开始回调时间
     * excuteImm 是否立即执行的
     * coverBefor 是否覆盖之前
    */
    Timer.prototype.listen = function (func, thisObj, time, startTime, excuteImm) {
        if (time === void 0) { time = 0; }
        if (startTime === void 0) { startTime = 0; }
        if (excuteImm === void 0) { excuteImm = true; }
        this.create(func, thisObj, time, startTime, excuteImm, true, true);
    };
    Timer.listen = function (func, thisObj, time, startTime, excuteImm) {
        if (time === void 0) { time = 0; }
        if (startTime === void 0) { startTime = 0; }
        if (excuteImm === void 0) { excuteImm = true; }
        Timer.instance.create(func, thisObj, time, startTime, excuteImm, true, true);
    };
    Timer.prototype.create = function (func, thisObj, interval, startTime, excuteImm, repeat, coverBefore) {
        if (startTime === void 0) { startTime = 0; }
        if (excuteImm === void 0) { excuteImm = true; }
        if (repeat === void 0) { repeat = true; }
        if (coverBefore === void 0) { coverBefore = true; }
        var timerInfo = this.getTimer(func, thisObj);
        if (timerInfo && coverBefore) {
            timerInfo.func = func;
            timerInfo.thisObj = thisObj;
            timerInfo.interval = interval;
            if (!startTime) {
                timerInfo.curTime = egret.getTimer();
            }
            else {
                timerInfo.curTime = startTime;
            }
            timerInfo.excuteImm = excuteImm;
            timerInfo.repeat = repeat;
            timerInfo.coverBefore = coverBefore;
        }
        else {
            var timerInfo = this.$pool.pop() || new TimerInfo();
            timerInfo.func = func;
            timerInfo.thisObj = thisObj;
            timerInfo.interval = interval;
            if (!startTime) {
                timerInfo.curTime = egret.getTimer();
            }
            else {
                timerInfo.curTime = startTime;
            }
            timerInfo.excuteImm = excuteImm;
            timerInfo.repeat = repeat;
            timerInfo.coverBefore = coverBefore;
            this.tasks.push(timerInfo);
        }
    };
    Timer.prototype.callLater = function (func, interval, thisObj, startTime, excuteImm, repeat, coverBefore) {
        if (startTime === void 0) { startTime = 0; }
        if (excuteImm === void 0) { excuteImm = false; }
        if (repeat === void 0) { repeat = false; }
        if (coverBefore === void 0) { coverBefore = false; }
        this.create(func, thisObj, interval, startTime, excuteImm, repeat, coverBefore);
    };
    /**删除监听 */
    Timer.prototype.remove = function (func, thisObj) {
        var arr = this.tasks;
        var len = arr.length;
        for (var i = len - 1; i >= 0; i--) {
            var task = arr[i];
            if (thisObj) {
                if (task.func == func && task.thisObj == thisObj) {
                    task.clear();
                    break;
                }
            }
            else if (task.func == func) {
                task.clear();
                break;
            }
        }
    };
    Timer.remove = function (func, thisObj) {
        Timer.instance.remove(func, thisObj);
    };
    Timer.prototype.getTimer = function (func, thisObj) {
        var arr = this.tasks;
        for (var len = arr.length, i = len - 1; i >= 0; i--) {
            var task = arr[i];
            if (thisObj) {
                if (task.func == func && task.thisObj == thisObj) {
                    return task;
                }
            }
            else if (task.func == func) {
                return task;
            }
        }
    };
    /**是否有监听 */
    Timer.prototype.has = function (func, thisObj) {
        var arr = this.tasks;
        for (var i = 0; i < arr.length; i++) {
            var task = arr[i];
            if (thisObj) {
                if (task.func == func && task.thisObj == thisObj) {
                    return true;
                }
            }
            else {
                if (task.func == func) {
                    return true;
                }
            }
        }
        return false;
    };
    Timer.prototype.run = function () {
        var self = this;
        var now = egret.getTimer();
        var arr = this.tasks;
        var nullCounter = 0;
        for (var i = 0, len = arr.length; i < len; i++) {
            var task = self.tasks[i];
            if (task.func == null) {
                nullCounter++;
            }
            else {
                if (task.excuteImm) {
                    task.excuteImm = false;
                    task.func.length > 0 ? task.func.call(task.thisObj, now) : task.func.call(task.thisObj);
                    if (!task.repeat) {
                        task.clear();
                        nullCounter++;
                    }
                    else {
                        task.curTime = now;
                    }
                }
                else {
                    var costTime = now - task.curTime;
                    if (costTime >= task.interval) {
                        task.func.length > 0 ? task.func.call(task.thisObj, now) : task.func.call(task.thisObj);
                        if (!task.repeat) {
                            task.clear();
                            nullCounter++;
                        }
                        else {
                            task.curTime = now;
                        }
                    }
                }
            }
        }
        if (nullCounter >= 3) {
            self.cleanNull();
        }
    };
    Timer.prototype.cleanNull = function () {
        var self = this;
        var arr = self.tasks;
        for (var i = 0, len = arr.length; i < len; i++) {
            var timer = arr[i];
            if (timer.func != null)
                self.$temp.push(timer);
            else
                self.recover(timer);
        }
        self.tasks = self.$temp;
        self.$temp = arr;
        self.$temp.length = 0;
    };
    Timer.prototype.recover = function (timer) {
        timer.clear();
        this.$pool.push(timer);
    };
    Timer.interval = function (key, type) {
        if (type === void 0) { type = 0; }
        if (type == 0) {
            this.dateDic[key] = new Date(egret.getTimer());
        }
        else {
            var ti = 0;
            if (this.dateDic[key])
                ti = this.dateDic[key];
            true && console.log(key + ":" + (egret.getTimer() - ti));
        }
    };
    Timer.dateDic = {};
    return Timer;
}());
__reflect(Timer.prototype, "Timer");
var TimerInfo = (function () {
    function TimerInfo() {
    }
    TimerInfo.prototype.clear = function () {
        var self = this;
        self.func = null;
        self.thisObj = null;
        self.curTime = 0;
        self.interval = 0;
        self.excuteImm = false;
        self.repeat = false;
        self.coverBefore = false;
    };
    return TimerInfo;
}());
__reflect(TimerInfo.prototype, "TimerInfo");
