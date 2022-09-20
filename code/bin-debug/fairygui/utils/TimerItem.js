var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var TimerItem = (function () {
        function TimerItem() {
            this.delay = 0;
            this.counter = 0;
            this.repeat = 0;
        }
        TimerItem.prototype.advance = function (elapsed) {
            if (elapsed === void 0) { elapsed = 0; }
            this.counter += elapsed;
            if (this.counter >= this.delay) {
                this.counter -= this.delay;
                if (this.counter > this.delay)
                    this.counter = this.delay;
                if (this.repeat > 0) {
                    this.repeat--;
                    if (this.repeat == 0)
                        this.end = true;
                }
                return true;
            }
            else
                return false;
        };
        TimerItem.prototype.reset = function () {
            this.callback = null;
            this.thisObj = null;
            this.param = null;
        };
        return TimerItem;
    }());
    fairygui.TimerItem = TimerItem;
    __reflect(TimerItem.prototype, "fairygui.TimerItem");
})(fairygui || (fairygui = {}));
