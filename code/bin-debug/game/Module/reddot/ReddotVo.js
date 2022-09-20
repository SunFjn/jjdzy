var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2018-05-02 10:38:08
 */
var ReddotVo = (function () {
    function ReddotVo() {
        this.value = 0;
        /** 绑定的系统id（用于判断是否开启） */
        this.systemId = 0;
        this.parentVoList = [];
        this.childrenVoList = [];
        this._disMap = {};
        this._isLock = false;
        this._tempValue = 0;
    }
    //=========================================== API ==========================================
    ReddotVo.prototype.setValue = function (pValue, pForce) {
        if (pForce === void 0) { pForce = false; }
        if (this._isLock) {
            if (!pValue) {
                //检查子红点状态
                for (var _i = 0, _a = this.childrenVoList; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v.value)
                        return;
                }
            }
            this._tempValue = pValue;
            return;
        }
        if (this.value == pValue)
            return;
        if (pValue) {
            this.value = pValue;
            //设置父红点状态
            for (var _b = 0, _c = this.parentVoList; _b < _c.length; _b++) {
                var v = _c[_b];
                v.setValue(1);
            }
        }
        else {
            if (!pForce) {
                //检查子红点状态
                for (var _d = 0, _e = this.childrenVoList; _d < _e.length; _d++) {
                    var v = _e[_d];
                    if (v.value)
                        return;
                }
            }
            this.value = pValue;
            //设置父红点状态
            for (var _f = 0, _g = this.parentVoList; _f < _g.length; _f++) {
                var v = _g[_f];
                v.setValue(0);
            }
        }
        this.showOrHideReddot();
        if (this.index == 0 && this.type > 0) {
            //尾数为0则发送系统id
            GGlobal.reddot.notify(this.type);
        }
        else {
            GGlobal.reddot.notify(this.key);
        }
    };
    Object.defineProperty(ReddotVo.prototype, "type", {
        get: function () {
            if (this._type === undefined) {
                this._type = ~~this.key.split("|")[0];
            }
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReddotVo.prototype, "index", {
        get: function () {
            if (this._index === undefined) {
                if (this.key.indexOf("|") > -1)
                    this._index = ~~this.key.split("|")[1];
                else
                    this._index = 0;
            }
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    ReddotVo.prototype.setLock = function (pFlag) {
        if (this._isLock == pFlag)
            return;
        if (pFlag) {
            //TODO 需要保存当前的状态值
            this._tempValue = this.value;
            //隐藏当前红点
            this.setValue(0, true);
            this._isLock = pFlag;
        }
        else {
            this._isLock = pFlag;
            //TODO 需要恢复之前保存的状态值
            this.setValue(this._tempValue);
            this._tempValue = 0;
        }
    };
    ReddotVo.prototype.addDis = function (pDis) {
        if (!pDis || !pDis.displayObject)
            return;
        var t_do = this._disMap[pDis.displayObject.hashCode];
        if (!t_do) {
            t_do = new ReddotDisObject();
            t_do.dis = pDis;
            this._disMap[pDis.displayObject.hashCode] = t_do;
        }
        //刚注册的显示对象需要检查红点是否已经显示了
        var t_flag = this.value
            && GGlobal.reddot.checkCondition(this.type, this.index)
            && ModuleManager.isOpen(this.systemId);
        if (t_flag)
            t_do.showOrHideRedot(true);
        else
            t_do.showOrHideRedot(false);
    };
    ReddotVo.prototype.removeDis = function (pDis) {
        if (!pDis || !pDis.displayObject)
            return;
        var t_do = this._disMap[pDis.displayObject.hashCode];
        if (!t_do)
            return;
        delete this._disMap[pDis.displayObject.hashCode];
        t_do.destroy();
    };
    //===================================== private method =====================================
    ReddotVo.prototype.showOrHideReddot = function () {
        var t_flag = this.value > 0 ? true : false;
        var t_condition = GGlobal.reddot.checkCondition(this.type, this.index);
        var t_system = ModuleManager.isOpen(this.systemId);
        for (var k in this._disMap) {
            var t_do = this._disMap[k];
            if (t_do) {
                if (t_do.dis && t_do.dis.displayObject)
                    t_do.showOrHideRedot(t_flag && t_condition && t_system);
                else {
                    delete this._disMap[k];
                    t_do.destroy();
                }
            }
        }
    };
    return ReddotVo;
}());
__reflect(ReddotVo.prototype, "ReddotVo");
var ReddotDisObject = (function () {
    function ReddotDisObject() {
        this.dis = null;
    }
    ReddotDisObject.prototype.showOrHideRedot = function (pFlag) {
        if (pFlag)
            this.dis.visible = true;
        else
            this.dis.visible = false;
    };
    ReddotDisObject.prototype.destroy = function () {
        this.showOrHideRedot(false);
        this.dis = null;
    };
    return ReddotDisObject;
}());
__reflect(ReddotDisObject.prototype, "ReddotDisObject");
