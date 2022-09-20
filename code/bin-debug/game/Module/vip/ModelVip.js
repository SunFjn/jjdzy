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
var ModelVip = (function (_super) {
    __extends(ModelVip, _super);
    function ModelVip() {
        var _this = _super.call(this) || this;
        _this.vip = 0;
        _this.exp = 0;
        _this.headState = 0;
        _this._maxVip = 0;
        _this._icons = [4205, 500401, 500402, 500403];
        //特权卡
        _this.tq_dta = [];
        //============特权卡 END
        //==================vip礼包
        _this.vipGiftData = [];
        return _this;
    }
    ModelVip.prototype.setVip = function (lv) {
        var v = Model_player.voMine;
        v.viplv = lv;
        this.vip = lv;
        GGlobal.control.notify(Enum_MsgType.VIP_CHANGE);
    };
    ModelVip.prototype.hasBuyTotalTq = function () {
        var i = 0;
        var s = this;
        for (i; i < 3; i++) {
            if (s.tq_dta[i] && s.tq_dta[i][0]) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    };
    ModelVip.prototype.getMaxVip = function () {
        if (this._maxVip < 1) {
            var cfg = Config.VIP_710;
            for (var i in cfg) {
                this._maxVip++;
            }
        }
        return this._maxVip - 1;
    };
    /**
     * 当前是否是某种卡的用户
     * 1 黄金 2铂金 3至尊
    */
    ModelVip.prototype.getTeQuan = function (t) {
        var i = 0;
        var s = this;
        for (i; i < s.tq_dta.length; i++) {
            if (s.tq_dta[i][0] == t) {
                return true;
            }
        }
        return false;
    };
    ModelVip.prototype.setNotice = function () {
        var sf = this;
        var d = GGlobal.modelvip.tq_dta;
        for (var i = 0; i < 3; i++) {
            var idx = i + 1;
            var arr = [idx, -1, 0];
            if (d) {
                var j = 0;
                for (j; j < d.length; j++) {
                    if (d[j][0] == idx) {
                        arr = d[j];
                        break;
                    }
                }
            }
            GGlobal.reddot.setCondition(this._icons[idx], 0, arr[1] == 0);
        }
    };
    ModelVip.prototype.checkGift = function () {
        var red = GGlobal.reddot;
        var ret = this.vipGiftData.length < this.vip + 1;
        red.setCondition(UIConst.VIPGIFT, 0, ret);
        red.notifyMsg(UIConst.VIP);
    };
    //==================vip礼包 END
    //传入VIP等级获取配置
    ModelVip.prototype.getCfgByVip = function (lv) {
        var idx = lv + 1;
        if (Config.VIP_710[idx])
            return Config.VIP_710[idx];
        return null;
    };
    ModelVip.prototype.listenServ = function (s) {
        var a = this;
        this.socket = s;
        s.regHand(2062, a.GC_OPENUI_2062, a);
        s.regHand(2064, a.GC_LINGQU_2064, a);
        s.regHand(2172, a.GC_TQ_2172, a);
        s.regHand(2174, a.GC_LTQ_2174, a);
        s.regHand(2176, a.GC_LTQ_2176, a);
        s.regHand(2066, a.GC_VIPGIFT_2066, a);
    };
    ModelVip.prototype.CG_OPENUI_2061 = function () {
        this.sendSocket(2061, this.getBytes());
    };
    /**
     * 2062 B-I-[B]-[B]
     *vip界面数据 B:vip等级vipLevelI:vip经验vipExp[B:已领取奖励的vip等级]已领取vip奖励的数据getAwardData[B:已购买的vip礼包]礼包数据giftData
    */
    ModelVip.prototype.GC_OPENUI_2062 = function (s, b) {
        s.setVip(b.readByte());
        s.exp = b.readInt();
        var len = b.readShort();
        s.dta = [];
        for (var i = 0; i < len; i++)
            s.dta.push(b.readByte());
        var len1 = b.readShort();
        s.vipGiftData = [];
        for (var i = 0; i < len1; i++)
            s.vipGiftData.push(b.readByte());
        s.checkGift();
        GGlobal.control.notify(Enum_MsgType.VIP_OPEN);
    };
    /**
     * 2063 B
     * 领取vip奖励 B:vip等级
    */
    ModelVip.prototype.CG_LINGQU_2063 = function (i) {
        var b = this.getBytes();
        b.writeByte(i);
        this.sendSocket(2063, b);
    };
    /**
     * 2064 	B-B
     * 领取vip奖励结果 B:0：失败，1：成功B:失败：错误码（1:已领取），成功：对应奖励的vipLevel
    */
    ModelVip.prototype.GC_LINGQU_2064 = function (s, b) {
        var r = b.readByte();
        if (r == 1) {
            var lv = b.readByte();
            s.dta.push(lv);
            GGlobal.control.notify(Enum_MsgType.VIP_LQ);
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    /**
     * 打开特权卡界面
    */
    ModelVip.prototype.CG_TQ_2171 = function () {
        this.sendSocket(2171, this.getBytes());
    };
    /**2172 [B-B-I]-B
     * 权卡信息返回 [B:特权卡idB:每日领取状态（0：未领取，1：已领取）I:剩余时间]特权卡每日奖励状态数据 （0未领取 1可领取 2已领取）
    */
    ModelVip.prototype.GC_TQ_2172 = function (s, b) {
        s.tq_dta = [];
        var len = b.readShort();
        for (var i = 0; i < len; i++) {
            s.tq_dta.push([b.readByte(), b.readByte(), b.readInt() * 1000 + egret.getTimer()]);
        }
        s.headState = b.readByte();
        s.setNotice();
        GGlobal.control.notify(Enum_MsgType.TQ_INFO);
    };
    /**
     * 领取每日奖励 B:特权卡id
    */
    ModelVip.prototype.CG_LTQ_2173 = function (i) {
        var b = this.getBytes();
        b.writeByte(i);
        this.sendSocket(2173, b);
    };
    /**2174 	B-B
     *领取每日奖励结果 B:0：失败，1：成功B:特权卡id
    */
    ModelVip.prototype.GC_LTQ_2174 = function (s, b) {
        var r = b.readByte();
        if (r == 1) {
            var id = b.readByte();
            var i = 0;
            for (i; i < s.tq_dta.length; i++) {
                if (s.tq_dta[i][0] == id) {
                    s.tq_dta[i][1] = 1;
                    break;
                }
            }
            s.setNotice();
            GGlobal.control.notify(Enum_MsgType.TQ_LQ);
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    /**
     * 领取吕布头像
    */
    ModelVip.prototype.CG_LTQ_2175 = function () {
        var b = this.getBytes();
        this.sendSocket(2175, b);
    };
    /**特权卡 领取吕布头像*/
    ModelVip.prototype.GC_LTQ_2176 = function (s, b) {
        var ret = b.readByte();
        if (ret == 1) {
            s.headState = 2;
            GGlobal.control.notify(Enum_MsgType.TQ_LQ);
            ViewCommonWarn.text("领取成功");
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    ModelVip.prototype.CG_VIPGIFT_2065 = function (i) {
        var b = this.getBytes();
        b.writeInt(i);
        this.sendSocket(2065, b);
    };
    /**领取VIP礼包*/
    ModelVip.prototype.GC_VIPGIFT_2066 = function (s, b) {
        var ret = b.readByte();
        var idx = b.readInt();
        if (ret == 0) {
            if (idx == 1) {
                ViewCommonWarn.text("VIP等级不足");
            }
            else if (idx == 2) {
                ModelChongZhi.guideToRecharge();
            }
        }
        else if (ret == 1) {
            s.vipGiftData.push(idx);
            s.checkGift();
            GGlobal.control.notify(UIConst.VIP);
            ViewCommonWarn.text("领取成功");
        }
    };
    return ModelVip;
}(BaseModel));
__reflect(ModelVip.prototype, "ModelVip");
