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
var ModelJBP = (function (_super) {
    __extends(ModelJBP, _super);
    function ModelJBP() {
        return _super.call(this) || this;
    }
    ModelJBP.prototype.setRedState = function () {
        var r = false;
        var s = this;
        var packDta = s.packDta;
        var mvip = Model_player.voMine.viplv;
        s.red = [false, false, false, false];
        for (var i = 1; i < 5; i++) {
            if (packDta.indexOf(i) > -1) {
                continue;
            }
            var cfg = Config.jbpbuy_718[i];
            var vip = cfg.VIP;
            if (mvip >= vip) {
                s.red[i - 1] = true;
            }
        }
        if (s.packDta.length == 0)
            return false;
        for (var i = 0; i < s.packDta.length; i++) {
            var type = s.packDta[i];
            var index = type - 1;
            var arr = s.actDta[index];
            for (var j = 0; j < arr.length; j++) {
                if (arr[j][0] == 1) {
                    s.red[index] = true;
                    break;
                }
            }
            arr.sort(function (a, b) {
                return a[1] < b[1] ? -1 : 1;
            });
        }
    };
    ModelJBP.prototype.checkMain = function () {
        if (!this.red)
            return false;
        for (var i in this.red) {
            if (this.red[i] == true)
                return true;
        }
        return false;
    };
    ModelJBP.prototype.listenServ = function (mgr) {
        var s = this;
        s.socket = mgr;
        mgr.regHand(2082, s.GC_OPEN, s);
        mgr.regHand(2084, s.GC_BUY, s);
        mgr.regHand(2086, s.GC_GET, s);
    };
    ModelJBP.prototype.CG_OPEN = function () {
        this.sendSocket(2081, this.getBytes());
    };
    /**2082 [B]-[B-[B]]-I-I-I-L-I
     * 打开界面返回 [B:购买的礼包id]购买礼包列表[[B:登录返利奖励状态0未达成1可领取2已领取]登录返利奖励状态列表[B:闯关返利奖励状态]
     * 闯关返利奖励状态列表[B:等级返利奖励状态]等级返利奖励状态列表[B:成长返利奖励状态]成长返利奖励状态列表]奖励状态列表I:累计登录天数I:关卡I:等级L:战力I:vip等级
    */
    ModelJBP.prototype.GC_OPEN = function (s, d) {
        s.packDta = [];
        s.actDta = [];
        s.mapDta = {};
        var len1 = d.readShort();
        for (var i = 0; i < len1; i++) {
            s.packDta.push(d.readByte());
        }
        var len = d.readShort();
        for (var i = 0; i < len; i++) {
            var t = [];
            var tp = d.readByte();
            var len1_1 = d.readShort();
            s.mapDta[tp] = [];
            for (var i_1 = 0; i_1 < len1_1; i_1++) {
                var st = d.readByte();
                var sortIndex = i_1;
                if (st == 2)
                    sortIndex = i_1 + st * 100;
                else if (st == 1)
                    sortIndex = i_1 - st * 100;
                var a1 = [st, sortIndex, i_1];
                t.push(a1);
                s.mapDta[tp][i_1 + 1] = a1;
            }
            s.actDta.push(t);
        }
        s.day = d.readInt();
        s.setRedState();
        GGlobal.control.notify(Enum_MsgType.JUBAOPENG);
    };
    //购买礼包 B:礼包类型
    ModelJBP.prototype.CG_BUY = function (b) {
        var ba = this.getBytes();
        ba.writeByte(b);
        this.sendSocket(2083, ba);
    };
    /**2084 B-B
     * 购买礼包返回 B:状态，0：礼包不存在，1：成功，2：vip等级不满足，3：元宝不足，4：不能重复购买B:购买的礼包类型
    */
    ModelJBP.prototype.GC_BUY = function (s, d) {
        var r = d.readByte();
        if (r == 1) {
            var id = d.readByte();
            s.packDta.push(id);
            s.setRedState();
            GGlobal.control.notify(Enum_MsgType.JUBAOPENG);
        }
        else {
            var txt = void 0;
            if (r == 0)
                txt = "礼包不存在";
            else if (r == 2)
                txt = "vip等级不满足";
            else if (r == 3)
                txt = "元宝不足";
            else if (r == 4)
                txt = "不能重复购买";
        }
    };
    //领取奖励 I:奖励id，为配置表奖励id
    ModelJBP.prototype.CG_GET = function (i) {
        var ba = this.getBytes();
        ba.writeInt(i);
        this.sendSocket(2085, ba);
    };
    /**2086 B-I
     * 领取奖励返回 B:状态，0：奖励不存在，1：成功，2：未达到条件，3：不可重复领取，4：礼包未购买，不能领取I:领取的奖励id
    */
    ModelJBP.prototype.GC_GET = function (s, d) {
        var r = d.readByte();
        if (r == 1) {
            var id = d.readInt();
            var type = (id / 1000) >> 0;
            var index = id % 1000;
            s.mapDta[type][index][0] = 2;
            s.mapDta[type][index][1] = index + 200;
            s.setRedState();
            GGlobal.control.notify(Enum_MsgType.JUBAOPENG);
        }
        else {
            var txt;
            if (r == 0)
                txt = "奖励不存在";
            else if (r == 2)
                txt = "未达到条件";
            else if (r == 3)
                txt = "不可重复领取";
            else if (r == 4)
                txt = "礼包未购买，不能领取";
            ViewCommonWarn.text(txt);
        }
    };
    return ModelJBP;
}(BaseModel));
__reflect(ModelJBP.prototype, "ModelJBP");
