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
var Model_GroupB814 = (function (_super) {
    __extends(Model_GroupB814, _super);
    function Model_GroupB814() {
        var _this = _super.call(this) || this;
        _this.buyArr = [];
        _this.buyNum = 0;
        _this.charge = 0;
        return _this;
    }
    Model_GroupB814.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        wsm.regHand(7450, a.GC_INIT, a);
        wsm.regHand(7452, a.GC_REWARD_CHARGE, a);
        wsm.regHand(7454, a.GC_FRIST_RENUM, a);
    };
    /**获取奖励 */
    Model_GroupB814.prototype.CG_GET_REWARD = function (index) {
        var ba = new BaseBytes();
        ba.writeInt(index);
        this.sendSocket(7451, ba);
    };
    /**
     * 初始化系统数据 I:今日充值I:今日全服首冲数[I:选号B:奖励领取状态]
    */
    Model_GroupB814.prototype.GC_INIT = function (s, d) {
        s.charge = d.readInt();
        s.buyNum = d.readInt();
        var len = d.readShort();
        s.buyArr = [];
        for (var a = 0; a < len; a++) {
            var v = new Vo_HuoDong();
            v.readMsgInt(d);
            s.buyArr.push(v);
        }
        s.buyArr.sort(function (a, b) { return a.id - b.id; });
        GGlobal.control.notify(Enum_MsgType.GROUP_BUY_UI);
    };
    /**
     * 奖励发生变化 I:奖励序号B:奖励状态
    */
    Model_GroupB814.prototype.GC_REWARD_CHARGE = function (s, d) {
        var id = d.readInt();
        var status = d.readByte();
        s.charge = d.readInt();
        var len = s.buyArr.length;
        var change = false;
        if (id > 0) {
            for (var a = 0; a < len; a++) {
                var v = s.buyArr[a];
                if (v.id == id) {
                    v.status = status;
                    change = true;
                    break;
                }
            }
        }
        for (var a = 0; a < len; a++) {
            var v = s.buyArr[a];
            var cfg = Config.sctg3_730[v.id];
            if (v.status == 0 && s.buyNum >= cfg.renshu && s.charge >= cfg.jine) {
                v.status = 1;
                change = true;
            }
        }
        if (change) {
            GGlobal.control.notify(Enum_MsgType.GROUP_BUY_UI);
        }
        else {
            GGlobal.control.notify(Enum_MsgType.GROUP_BUY_CHARGE);
        }
    };
    /**
     * 今日首冲人数 I:今日首冲人数变化
    */
    Model_GroupB814.prototype.GC_FRIST_RENUM = function (s, d) {
        s.buyNum = d.readInt();
        var len = s.buyArr.length;
        var change = false;
        for (var a = 0; a < len; a++) {
            var v = s.buyArr[a];
            var cfg = Config.sctg3_730[v.id];
            if (v.status == 0 && s.buyNum >= cfg.renshu && s.charge >= cfg.jine) {
                v.status = 1;
                change = true;
            }
        }
        if (change) {
            GGlobal.control.notify(Enum_MsgType.GROUP_BUY_UI);
        }
        else {
            GGlobal.control.notify(Enum_MsgType.GROUP_BUY_NUM);
        }
    };
    return Model_GroupB814;
}(BaseModel));
__reflect(Model_GroupB814.prototype, "Model_GroupB814");
