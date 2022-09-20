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
var Model_LoginYouJiang = (function (_super) {
    __extends(Model_LoginYouJiang, _super);
    function Model_LoginYouJiang() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loginDay = 0;
        return _this;
    }
    //协议处理
    Model_LoginYouJiang.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(9160, this.GC_OPENUI_9160, this);
        mgr.regHand(9162, this.GC_GETREWARD_9162, this);
    };
    /**9160 B-[I-B] 返回界面信息 B:已登录天数loginTimes[I:奖励项idB:领取状态（0：不可领取，1：可领取，2：已领取）]奖励领取状态rewardData*/
    Model_LoginYouJiang.prototype.GC_OPENUI_9160 = function (self, data) {
        self.rewardData = {};
        self.loginDay = data.readByte();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var state = data.readByte();
            self.rewardData[id] = state;
        }
        GGlobal.control.notify(UIConst.ACTCOM_LOGINREWARD);
    };
    /**9161 I 领取奖励 I:奖励项idid*/
    Model_LoginYouJiang.prototype.CG_GETREWARD_9161 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(9161, bates);
    };
    /**9162 B-I 领取奖励结果 B:结果：0：失败，1：成功rtnCodeI:失败：（1：未满足条件，2：已领取），成功：奖励项idid*/
    Model_LoginYouJiang.prototype.GC_GETREWARD_9162 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            self.rewardData[id] = 2;
            GGlobal.control.notify(UIConst.ACTCOM_LOGINREWARD);
        }
    };
    return Model_LoginYouJiang;
}(BaseModel));
__reflect(Model_LoginYouJiang.prototype, "Model_LoginYouJiang");
