var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MsgCenter = (function () {
    function MsgCenter() {
        this.msgMap = {};
        this.invalidMap = {};
        this.invalid = 0;
    }
    /**
     * @msg 派发的消息
     * @arg 派发的参数
    */
    MsgCenter.prototype.notify = function (msg, arg) {
        if (arg === void 0) { arg = null; }
        var list = [];
        list = list.concat(this.msgMap[msg]);
        if (list.length > 0) {
            for (var i = list.length - 1; i >= 0; i--) {
                var listenerInfo = list[i];
                if (listenerInfo) {
                    listenerInfo[0] = arg;
                    listenerInfo[1].apply(listenerInfo[2], listenerInfo);
                }
            }
        }
    };
    /** 移除监听
     * @msg 消息
     * @listener 回调
    */
    MsgCenter.prototype.remove = function (msg, listener, thisObj) {
        if (thisObj === void 0) { thisObj = null; }
        var list = this.msgMap[msg];
        if (list) {
            var index = this.getIndex(listener, list, thisObj);
            if (index != -1) {
                list[index] = null;
                this.invalidMap[msg] = true;
                if (!this.invalid) {
                    egret.callLater(MsgCenter.cleannull, this);
                }
                this.invalid++;
            }
        }
    };
    /** 添加
     * @msg 消息
     * @listener 回调
     * @thisObj this
    */
    MsgCenter.prototype.listen = function (msg, listener, thisObj) {
        if (thisObj === void 0) { thisObj = null; }
        var list = this.msgMap[msg];
        if (!list) {
            list = this.msgMap[msg] = [];
        }
        var index = this.getIndex(listener, list, thisObj);
        if (index >= 0) {
            return;
        }
        if (true) {
            list.unshift([null, listener, thisObj]);
        }
    };
    /**
     * 注册和反注册的便捷方法
     * @param pFlag
     * @param pMsg 消息类型
     * @param pListener 回调
     * @param pThisObj 回调主体
     */
    MsgCenter.prototype.register = function (pFlag, pMsg, pListener, pThisObj) {
        if (pFlag)
            this.listen(pMsg, pListener, pThisObj);
        else
            this.remove(pMsg, pListener, pThisObj);
    };
    MsgCenter.cleannull = function () {
        var self = this;
        var arrayutil = ArrayUitl;
        if (self.invalid) {
            self.invalid = 0;
            for (var k in self.invalidMap) {
                var invalidList = self.msgMap[k];
                arrayutil.cleannull(invalidList);
                delete self.invalidMap[k];
            }
        }
    };
    /** 添加
     * @msg 消息
     * @listener 回调
     * @thisObj this
    */
    MsgCenter.prototype.listenonce = function (msg, listener, thisObj) {
        if (thisObj === void 0) { thisObj = null; }
        var msgCenter = this;
        msgCenter.listen(msg, function func(arg) {
            msgCenter.remove(msg, func, msgCenter);
            listener.apply(thisObj, arg);
        }, msgCenter);
    };
    MsgCenter.prototype.getIndex = function (listener, list, thisObj) {
        for (var i = list.length - 1; i >= 0; i--) {
            var term = list[i];
            if (term && listener == term[1] && (!thisObj || (term[2] == thisObj))) {
                return i;
            }
        }
        return -1;
    };
    return MsgCenter;
}());
__reflect(MsgCenter.prototype, "MsgCenter");
