var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var EasePortCameraProxy = (function (_super) {
    __extends(EasePortCameraProxy, _super);
    function EasePortCameraProxy() {
        var _this = _super.call(this) || this;
        _this.left0 = -16;
        _this.right0 = 16;
        _this.top0 = -16;
        _this.bottom0 = 16;
        _this.left = -32;
        _this.right = 32;
        _this.top = -32;
        _this.bottom = 32;
        _this.easeArg = 0.0015;
        return _this;
    }
    EasePortCameraProxy.prototype.reset = function () {
        this.left0 = -16;
        this.right0 = 16;
        this.top0 = -16;
        this.bottom0 = 16;
        this.left = -32;
        this.right = 32;
        this.top = -32;
        this.bottom = 32;
    };
    EasePortCameraProxy.prototype.zero = function () {
        this.left0 = 0;
        this.right0 = 0;
        this.top0 = 0;
        this.bottom0 = 0;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
    };
    EasePortCameraProxy.prototype.update = function (delta) {
        var arg = this.easeArg * 30;
        if (arg > 1)
            arg = 1;
        var dx = this.focusx - this.currentx;
        var dy = this.focusy - this.currenty;
        var testx = this.currentx + dx * 0;
        var testy = this.currenty + dy * 0;
        if (testx <= this.focusx + this.right0 && testx >= this.focusx + this.left0) {
            this.hasChange = false;
        }
        else if (testx > this.focusx + this.right) {
            this.currentx = this.focusx + this.right;
            this.hasChange = true;
        }
        else if (testx < this.focusx + this.left) {
            this.currentx = this.focusx + this.left;
            this.hasChange = true;
        }
        else {
            this.currentx = testx;
            this.hasChange = true;
        }
        if (testy <= this.focusy + this.bottom0 && testy >= this.focusy + this.top0) {
        }
        else if (testy > this.focusy + this.bottom) {
            this.currenty = this.focusy + this.bottom;
            this.hasChange = true;
        }
        else if (testy < this.focusy + this.top) {
            this.currenty = this.focusy + this.top;
            this.hasChange = true;
        }
        else {
            this.currenty = testy;
            this.hasChange = true;
        }
    };
    return EasePortCameraProxy;
}(CameraProxy));
__reflect(EasePortCameraProxy.prototype, "EasePortCameraProxy");
