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
var Model_ActQFXF = (function (_super) {
    __extends(Model_ActQFXF, _super);
    function Model_ActQFXF() {
        var _this = _super.call(this) || this;
        //全服消费
        _this.qfxf = 0;
        //个人消费
        _this.grxf = 0;
        _this.qfxfArr = [];
        return _this;
    }
    /**领取奖励 I:要领取的奖励id*/
    Model_ActQFXF.prototype.CG_GET_REWARD = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(10421, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_ActQFXF.prototype.listenServ = function (wsm) {
        var s = this;
        s.socket = wsm;
        wsm.regHand(10420, s.GC_OPENUI_10420, s);
        wsm.regHand(10422, s.GC_GETREWARD_10422, s);
    };
    //打开界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表L:全服消费I:个人消费
    Model_ActQFXF.prototype.GC_OPENUI_10420 = function (s, data) {
        var len = data.readShort();
        s.qfxfArr = [];
        var qfObj = {};
        var idx = 0;
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var st = data.readByte();
            var cfg = Config.qfxf_768[id];
            var v = { id: id, st: st, cfg: cfg };
            if (qfObj[cfg.qf] == null) {
                qfObj[cfg.qf] = cfg.qf;
                s.qfxfArr[idx] = [];
                idx++;
            }
            s.qfxfArr[idx - 1].push(v);
        }
        s.qfxf = data.readLong();
        s.grxf = data.readInt();
        s.checkRed();
        s.notify(Model_ActQFXF.OPENUI);
    };
    //领取奖励结果 B:领取状态，0:没有该奖励，1:成功，2:未达到条件I:领取的奖励id
    Model_ActQFXF.prototype.GC_GETREWARD_10422 = function (s, data) {
        var res = data.readByte();
        var id = data.readInt();
        if (res == 1) {
            for (var i = 0; i < s.qfxfArr.length; i++) {
                for (var j = 0; j < s.qfxfArr[i].length; j++) {
                    if (s.qfxfArr[i][j].id == id) {
                        s.qfxfArr[i][j].st = 2;
                        break;
                    }
                }
            }
            s.checkRed();
            s.notify(Model_ActQFXF.OPENUI);
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    Model_ActQFXF.prototype.checkRed = function () {
        var s = this;
        var red = false;
        for (var i = 0; i < s.qfxfArr.length; i++) {
            for (var j = 0; j < s.qfxfArr[i].length; j++) {
                if (s.qfxfArr[i][j].st == 1) {
                    red = true;
                    break;
                }
            }
        }
        var sf = GGlobal.reddot;
        sf.setCondition(UIConst.ACTCOM_QFXF, 0, red);
        sf.notifyMsg(UIConst.ACTCOM_QFXF);
    };
    Model_ActQFXF.OPENUI = "openui";
    return Model_ActQFXF;
}(BaseModel));
__reflect(Model_ActQFXF.prototype, "Model_ActQFXF");
