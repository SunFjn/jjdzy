var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var GTimers = (function () {
        function GTimers() {
            this._enumI = 0;
            this._enumCount = 0;
            this._lastTime = 0;
            this._items = new Array();
            this._itemPool = new Array();
            this._lastTime = egret.getTimer();
            GTimers.time = this._lastTime;
            egret.startTick(this.__timer, this);
        }
        GTimers.prototype.getItem = function () {
            if (this._itemPool.length)
                return this._itemPool.pop();
            else
                return new fairygui.TimerItem();
        };
        GTimers.prototype.findItem = function (callback, thisObj) {
            var len = this._items.length;
            for (var i = 0; i < len; i++) {
                var item = this._items[i];
                if (item.callback == callback && item.thisObj == thisObj)
                    return item;
            }
            return null;
        };
        GTimers.prototype.add = function (delayInMiniseconds, repeat, callback, thisObj, callbackParam) {
            if (callbackParam === void 0) { callbackParam = null; }
            var item = this.findItem(callback, thisObj);
            if (!item) {
                item = this.getItem();
                item.callback = callback;
                item.hasParam = callback.length == 1;
                item.thisObj = thisObj;
                this._items.push(item);
            }
            item.delay = delayInMiniseconds;
            item.counter = 0;
            item.repeat = repeat;
            item.param = callbackParam;
            item.end = false;
        };
        GTimers.prototype.callLater = function (callback, thisObj, callbackParam) {
            if (callbackParam === void 0) { callbackParam = null; }
            this.add(1, 1, callback, thisObj, callbackParam);
        };
        GTimers.prototype.callDelay = function (delay, callback, thisObj, callbackParam) {
            if (callbackParam === void 0) { callbackParam = null; }
            this.add(delay, 1, callback, thisObj, callbackParam);
        };
        GTimers.prototype.callBy24Fps = function (callback, thisObj, callbackParam) {
            if (callbackParam === void 0) { callbackParam = null; }
            this.add(GTimers.FPS24, 0, callback, thisObj, callbackParam);
        };
        GTimers.prototype.exists = function (callback, thisObj) {
            var item = this.findItem(callback, thisObj);
            return item != null;
        };
        GTimers.prototype.remove = function (callback, thisObj) {
            var item = this.findItem(callback, thisObj);
            if (item) {
                var i = this._items.indexOf(item);
                this._items.splice(i, 1);
                if (i < this._enumI)
                    this._enumI--;
                this._enumCount--;
                item.reset();
                this._itemPool.push(item);
            }
        };
        GTimers.prototype.__timer = function (timeStamp) {
            GTimers.time = timeStamp;
            GTimers.deltaTime = timeStamp - this._lastTime;
            this._lastTime = timeStamp;
            this._enumI = 0;
            this._enumCount = this._items.length;
            while (this._enumI < this._enumCount) {
                var item = this._items[this._enumI];
                this._enumI++;
                if (item.advance(GTimers.deltaTime)) {
                    if (item.end) {
                        this._enumI--;
                        this._enumCount--;
                        this._items.splice(this._enumI, 1);
                    }
                    if (item.hasParam)
                        item.callback.call(item.thisObj, item.param);
                    else
                        item.callback.call(item.thisObj);
                    if (item.end) {
                        item.reset();
                        this._itemPool.push(item);
                    }
                }
            }
            return false;
        };
        GTimers.deltaTime = 0;
        GTimers.time = 0;
        GTimers.inst = new GTimers();
        GTimers.FPS24 = 1000 / 24;
        return GTimers;
    }());
    fairygui.GTimers = GTimers;
    __reflect(GTimers.prototype, "fairygui.GTimers");
})(fairygui || (fairygui = {}));
