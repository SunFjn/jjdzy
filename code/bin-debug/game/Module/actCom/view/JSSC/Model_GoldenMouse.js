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
/**
 * Model_GoldenMouse
 * 金鼠送财
 */
var Model_GoldenMouse = (function (_super) {
    __extends(Model_GoldenMouse, _super);
    function Model_GoldenMouse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chongzhiNum = 0;
        _this.buyNum = 0;
        _this.numMax = 0;
        return _this;
    }
    //协议处理
    Model_GoldenMouse.prototype.listenServ = function (mgr) {
        var self = this;
        self.socket = mgr;
        //注册GC方法
        mgr.regHand(11580, self.GC_GoldenMouse_openUi_11580, self);
        mgr.regHand(11582, self.GC_GoldenMouse_buy_11582, self);
    };
    /**11580 I-I-I GC 金鼠送财ui I:充值数量rechargeNumI:已经购买次数hasBuyNumI:当前总购买次数buyNumMaxI:以获取总元宝数*/
    Model_GoldenMouse.prototype.GC_GoldenMouse_openUi_11580 = function (self, data) {
        self.chongzhiNum = data.readInt();
        self.buyNum = data.readInt();
        self.numMax = data.readInt();
        var arg1 = data.readInt();
        GGlobal.control.notify(UIConst.ACTCOM_JSSC);
    };
    /**11581  CG购买投资 */
    Model_GoldenMouse.prototype.CG_GoldenMouse_buy_11581 = function () {
        var bates = this.getBytes();
        this.sendSocket(11581, bates);
    };
    /**11582 B-I GC 购买投资返回 B:0成功 1元宝不足 2次数不够restI:已经购买次数hasBuyNum:获取元宝数*/
    Model_GoldenMouse.prototype.GC_GoldenMouse_buy_11582 = function (self, data) {
        var arg1 = data.readByte();
        if (arg1 == 0) {
            self.buyNum = data.readInt();
            var money = data.readInt();
            var cfg1 = Config.jssc_774[self.buyNum + 1];
            if (!cfg1) {
                cfg1 = Config.jssc_774[self.buyNum];
            }
            var costItem = ConfigHelp.makeItemListArr(JSON.parse(cfg1.xh))[0];
            GGlobal.reddot.setCondition(UIConst.ACTCOM_JSSC, 0, self.numMax - self.buyNum > 0 && Model_player.voMine.yuanbao >= costItem.count);
            GGlobal.reddot.notifyMsg(UIConst.ACTCOM_JSSC);
            GGlobal.control.notify(UIConst.ACTCOM_JSSC_EFF, money);
            GGlobal.control.notify(UIConst.ACTCOM_JSSC);
        }
    };
    return Model_GoldenMouse;
}(BaseModel));
__reflect(Model_GoldenMouse.prototype, "Model_GoldenMouse");
