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
/**
 * 数量选择组件
 * @author: lujiahao
 * @date: 2019-11-29 11:05:11
 */
var NumberCom = (function (_super) {
    __extends(NumberCom, _super);
    function NumberCom() {
        var _this = _super.call(this) || this;
        _this._value = 0;
        _this._maxValue = Number.MAX_VALUE;
        _this._minValue = 0;
        _this._speed = 1;
        _this._color = 0;
        _this._disEvent = true;
        return _this;
    }
    NumberCom.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "NumberCom"));
    };
    NumberCom.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t._color = Color.WHITEINT;
        t.tfCount.color = t._color;
        t.tfCount.text = t._value + "";
        t.registerEvent(true);
    };
    Object.defineProperty(NumberCom.prototype, "value", {
        //=========================================== API ==========================================
        get: function () {
            return this._value;
        },
        set: function (pValue) {
            var t = this;
            if (pValue < t._minValue)
                pValue = t._minValue;
            if (pValue > t._maxValue)
                pValue = t._maxValue;
            if (t._value == pValue)
                return;
            t._value = pValue;
            t.tfCount.text = pValue + "";
            //发送改变事件
            if (t._disEvent)
                t.dispatchEvent(new egret.Event(egret.Event.CHANGE));
        },
        enumerable: true,
        configurable: true
    });
    /** 强制设置值，不抛出事件 */
    NumberCom.prototype.setValue = function (value) {
        var t = this;
        t._disEvent = false;
        t.value = value;
        t._disEvent = true;
    };
    Object.defineProperty(NumberCom.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            var t = this;
            t._color = value;
            t.tfCount.color = t._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberCom.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (value) {
            this._speed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberCom.prototype, "maxValue", {
        get: function () {
            return this._maxValue;
        },
        set: function (value) {
            var t = this;
            if (value < t._minValue)
                return;
            t._maxValue = value;
            if (t.value > value)
                t.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberCom.prototype, "minValue", {
        get: function () {
            return this._minValue;
        },
        set: function (value) {
            var t = this;
            if (value > t._maxValue)
                return;
            t._minValue = value;
            if (t.value < value)
                t.value = value;
        },
        enumerable: true,
        configurable: true
    });
    NumberCom.prototype.dispose = function () {
        var t = this;
        SimpleTimer.ins().removeTimer(t.timeToStartFast, t);
        SimpleTimer.ins().removeTimer(t.onTimeCallback, t);
        t.registerEvent(false);
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    NumberCom.prototype.timeToStartFast = function (pType) {
        SimpleTimer.ins().addTimer(this.onTimeCallback, this, 50, 0, [pType], true);
    };
    NumberCom.prototype.onTimeCallback = function (pType) {
        var t = this;
        if (pType == 0) {
            t.value -= t._speed * 4;
            if (t.value <= t.minValue)
                SimpleTimer.ins().removeTimer(t.onTimeCallback, t);
        }
        else {
            t.value += t._speed * 4;
            if (t.value >= t.maxValue)
                SimpleTimer.ins().removeTimer(t.onTimeCallback, t);
        }
    };
    NumberCom.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnAdd, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnReduce, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnAdd, egret.TouchEvent.TOUCH_BEGIN, t.onTouchBegin, t);
        EventUtil.register(pFlag, t.btnAdd, egret.TouchEvent.TOUCH_END, t.onTouchEnd, t);
        EventUtil.register(pFlag, t.btnReduce, egret.TouchEvent.TOUCH_BEGIN, t.onTouchBegin, t);
        EventUtil.register(pFlag, t.btnReduce, egret.TouchEvent.TOUCH_END, t.onTouchEnd, t);
        EventUtil.register(pFlag, t.tfCount, egret.Event.CHANGE, t.onTextChange, t);
        EventUtil.register(pFlag, t.tfCount, egret.FocusEvent.FOCUS_OUT, t.onFocusOut, t);
        EventUtil.register(pFlag, t.btnMin, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnMax, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    NumberCom.prototype.onFocusOut = function (e) {
        this.tfCount.text = this._value + "";
    };
    NumberCom.prototype.onTextChange = function (e) {
        this.value = ~~this.tfCount.text;
    };
    NumberCom.prototype.onTouchBegin = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case this.btnAdd:
                SimpleTimer.ins().addTimer(this.timeToStartFast, this, 300, 1, [1]);
                break;
            case this.btnReduce:
                SimpleTimer.ins().addTimer(this.timeToStartFast, this, 300, 1, [0]);
                break;
        }
    };
    NumberCom.prototype.onTouchEnd = function (e) {
        switch (e.currentTarget) {
            case this.btnAdd:
                SimpleTimer.ins().removeTimer(this.timeToStartFast, this);
                SimpleTimer.ins().removeTimer(this.onTimeCallback, this);
                break;
            case this.btnReduce:
                SimpleTimer.ins().removeTimer(this.onTimeCallback, this);
                SimpleTimer.ins().removeTimer(this.timeToStartFast, this);
                break;
        }
    };
    NumberCom.prototype.onBtnClick = function (e) {
        switch (e.currentTarget) {
            case this.btnAdd:
                this.value += this._speed;
                break;
            case this.btnReduce:
                this.value -= this._speed;
                break;
            case this.btnMin:
                this.value -= 10;
                break;
            case this.btnMax:
                this.value += 10;
                break;
        }
    };
    //>>>>end
    NumberCom.URL = "ui://jvxpx9emko8c3gq";
    return NumberCom;
}(fairygui.GComponent));
__reflect(NumberCom.prototype, "NumberCom");
