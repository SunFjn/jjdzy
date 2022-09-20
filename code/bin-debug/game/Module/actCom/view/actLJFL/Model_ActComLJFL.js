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
var Model_ActComLJFL = (function (_super) {
    __extends(Model_ActComLJFL, _super);
    function Model_ActComLJFL() {
        return _super.call(this) || this;
    }
    /**领取奖励 I:要领取的奖励id*/
    Model_ActComLJFL.prototype.CG_GET_10751 = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(10751, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_ActComLJFL.prototype.listenServ = function (wsm) {
        var s = this;
        s.socket = wsm;
        wsm.regHand(10750, s.GC_OPENUI_10750, s);
        wsm.regHand(10752, s.GC_GET_10752, s);
    };
    //打开累计返利界面返回 [I:充值IDI:累计返利B:0.条件不符 1.可领取 2.已领取]
    Model_ActComLJFL.prototype.GC_OPENUI_10750 = function (s, data) {
        var qs = data.readInt();
        var len = data.readShort();
        s.datArr = [];
        var cfgQs = Model_ActComLJFL.getCfg(qs);
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var lj = data.readInt();
            var st = data.readByte();
            var cfg = cfgQs[id];
            var v = { id: id, lj: lj, st: st, cfg: cfg };
            s.datArr.push(v);
        }
        s.checkRed();
        s.notify(Model_ActComLJFL.OPENUI);
    };
    //领取累计返利奖励返回 B:1.成功 2参数错误 3.领取条件不足 4.已领取I:充值ID
    Model_ActComLJFL.prototype.GC_GET_10752 = function (s, data) {
        var res = data.readByte();
        var id = data.readInt();
        if (res == 1) {
            for (var i = 0; i < s.datArr.length; i++) {
                if (s.datArr[i].id == id) {
                    s.datArr[i].st = 2;
                    break;
                }
            }
            s.checkRed();
            s.notify(Model_ActComLJFL.OPENUI);
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    Model_ActComLJFL.prototype.checkRed = function () {
        var s = this;
        var red = false;
        // for (let i = 0; i < s.datArr.length; i++) {
        // 	if (s.datArr[i].st == 1) {
        // 		red = true;
        // 		break;
        // 	}
        // }
        var sf = GGlobal.reddot;
        sf.setCondition(UIConst.ACTCOM_LJFL, 0, red);
        sf.notifyMsg(UIConst.ACTCOM_LJFL);
    };
    Model_ActComLJFL.getCfg = function (qs) {
        if (!Model_ActComLJFL.CFG) {
            Model_ActComLJFL.CFG = {};
            for (var k in Config.ljfl_772) {
                var v = Config.ljfl_772[k];
                if (Model_ActComLJFL.CFG[v.qs] == null) {
                    Model_ActComLJFL.CFG[v.qs] = {};
                }
                Model_ActComLJFL.CFG[v.qs][v.id] = v;
            }
        }
        return Model_ActComLJFL.CFG[qs];
    };
    Model_ActComLJFL.OPENUI = "openui";
    return Model_ActComLJFL;
}(BaseModel));
__reflect(Model_ActComLJFL.prototype, "Model_ActComLJFL");
