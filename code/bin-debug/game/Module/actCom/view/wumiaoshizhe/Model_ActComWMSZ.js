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
var Model_ActComWMSZ = (function (_super) {
    __extends(Model_ActComWMSZ, _super);
    function Model_ActComWMSZ() {
        var _this = _super.call(this) || this;
        _this.rankArr = [];
        _this.myRank = 0;
        _this.myIntegral = 0;
        _this.targetArr = [];
        return _this;
    }
    /**12201 打开目标奖励界面   */
    Model_ActComWMSZ.prototype.CG_OPEN_TARGETAWARD_UI = function () {
        var ba = new BaseBytes();
        this.sendSocket(12201, ba);
    };
    /**12203 领取目标奖励 I:要领取的奖励id   */
    Model_ActComWMSZ.prototype.CG_GET_TARGETAWARD = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(12203, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_ActComWMSZ.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        wsm.regHand(12200, a.GC_OPEN_UI, a);
        wsm.regHand(12202, a.GC_OPEN_TARGETAWARD_UI, a);
        wsm.regHand(12204, a.GC_GET_TARGETAWARD, a);
    };
    /**12200 打开界面 [S:排名U:玩家名I:抽奖次数]排行榜数据S:我的排名 0未进排行榜 I:我的抽奖次数*/
    Model_ActComWMSZ.prototype.GC_OPEN_UI = function (s, data) {
        s.rankArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new WMSZVO();
            v.readRankMsg(data);
            if (v.integral >= Config.xtcs_004[8423].num) {
                s.rankArr.push(v);
            }
        }
        s.myRank = data.readUnsignedShort();
        s.myIntegral = data.readInt();
        GGlobal.control.notify(UIConst.WMSZ);
    };
    /**12202 打开目标奖励界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表*/
    Model_ActComWMSZ.prototype.GC_OPEN_TARGETAWARD_UI = function (s, data) {
        s.targetArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new WMSZVO();
            v.readMsg(data);
            s.targetArr.push(v);
        }
        GGlobal.control.notify(UIConst.WMSZ_INTEGRAL);
    };
    /**12204 领取目标奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励id*/
    Model_ActComWMSZ.prototype.GC_GET_TARGETAWARD = function (s, data) {
        var res = data.readByte();
        var id = data.readInt();
        if (res == 1) {
            var len = s.targetArr.length;
            for (var i = 0; i < len; i++) {
                var v = s.targetArr[i];
                if (v.id == id) {
                    v.status = 2;
                    break;
                }
            }
            s.reddotCheck();
            GGlobal.control.notify(UIConst.WMSZ_INTEGRAL);
        }
    };
    /**
     * 检查红点
     */
    Model_ActComWMSZ.prototype.reddotCheck = function () {
        var bol = false;
        var sf = GGlobal.reddot;
        if (this.targetArr) {
            var len = this.targetArr.length;
            for (var i = 0; i < len; i++) {
                var v = this.targetArr[i];
                if (v.status == 1) {
                    bol = true;
                    break;
                }
            }
        }
        sf.setCondition(UIConst.WMSZ, 0, bol);
        sf.notifyMsg(UIConst.WMSZ);
    };
    return Model_ActComWMSZ;
}(BaseModel));
__reflect(Model_ActComWMSZ.prototype, "Model_ActComWMSZ");
