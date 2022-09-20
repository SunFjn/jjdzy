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
var Model_LimitGift = (function (_super) {
    __extends(Model_LimitGift, _super);
    function Model_LimitGift() {
        var _this = _super.call(this) || this;
        _this.giftArr = [];
        return _this;
    }
    /**领取奖励 I:表的id  */
    Model_LimitGift.prototype.CG_GETAWARD_10451 = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(10451, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_LimitGift.prototype.listenServ = function (wsm) {
        var s = this;
        s.socket = wsm;
        wsm.regHand(10450, s.GC_OPENUI_10450, s);
        wsm.regHand(10452, s.GC_GETAWARD_10452, s);
    };
    //限时礼包返回 [I:礼包类型I:结束时间[I:表的idB:状态 0未领取 1可领取 2已领取]]礼包数据
    Model_LimitGift.prototype.GC_OPENUI_10450 = function (s, data) {
        var len = data.readShort();
        s.giftArr = [];
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var openV = -1;
        for (var i = 0; i < len; i++) {
            var v = new VoLimitGift();
            v.readMsg(data);
            if (v.endTime - servTime > 0) {
                s.giftArr.push(v);
            }
            if (openV == -1 && v.endTime - servTime > (2 * 60 * 60 - 60)) {
                openV = v.type;
            }
        }
        s.giftArr.sort(function (a, b) { return a.type - b.type; });
        s.notify(Model_LimitGift.OPENUI);
        s.checkRed();
        if (s.giftArr.length > 0) {
            GGlobal.mainUICtr.addIcon(UIConst.LIMIT_GIFT, GGlobal.reddot.checkCondition(UIConst.LIMIT_GIFT, 0));
        }
        else {
            GGlobal.mainUICtr.removeIcon(UIConst.LIMIT_GIFT);
        }
        if (openV != -1 && GGlobal.sceneType == SceneCtrl.GUANQIA) {
            if (!true)
                GGlobal.layerMgr.open(UIConst.LIMIT_GIFT, openV);
        }
    };
    //领取奖励返回 B:状态 0成功 1配置表没有该id 2未达到条件 3未充值 4已领取I:表的id
    Model_LimitGift.prototype.GC_GETAWARD_10452 = function (s, data) {
        var res = data.readByte();
        var id = data.readInt();
        if (res == 0) {
            for (var i = 0; i < s.giftArr.length; i++) {
                var v = s.giftArr[i];
                var has = false;
                for (var j = 0; j < v.awaArr.length; j++) {
                    if (v.awaArr[j].id == id) {
                        v.awaArr[j].st = 2;
                        has = true;
                        break;
                    }
                }
                if (has)
                    break;
            }
            s.notify(Model_LimitGift.GETAWARD);
            s.checkRed();
        }
        else {
            ViewCommonWarn.text(["配置表没有该id", "未达到条件", "未充值", "已领取"][res - 1]);
        }
    };
    Model_LimitGift.prototype.checkRed = function () {
        var s = this;
        var red = s.isRed();
        GGlobal.reddot.setCondition(UIConst.LIMIT_GIFT, 0, red);
        var icon = GGlobal.mainUICtr.getIcon(UIConst.LIMIT_GIFT);
        if (icon)
            icon.checkNotice = red;
    };
    Model_LimitGift.prototype.isRed = function () {
        var s = this;
        for (var i = 0; i < s.giftArr.length; i++) {
            var arr = s.giftArr[i].awaArr;
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].st == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    Model_LimitGift.OPENUI = 'openui';
    Model_LimitGift.GETAWARD = 'getaward';
    return Model_LimitGift;
}(BaseModel));
__reflect(Model_LimitGift.prototype, "Model_LimitGift");
