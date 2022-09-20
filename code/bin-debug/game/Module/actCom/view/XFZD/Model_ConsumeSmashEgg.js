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
 * Model_ConsumeSmashEgg
 * 消费砸蛋
 */
var Model_ConsumeSmashEgg = (function (_super) {
    __extends(Model_ConsumeSmashEgg, _super);
    function Model_ConsumeSmashEgg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemIDArr = [];
        _this.eggData = [];
        _this.surNum = 0;
        _this.costMoney = 0;
        _this.drawNum = 0;
        _this.playIndex = -1;
        return _this;
    }
    Model_ConsumeSmashEgg.prototype.checkNotice = function () {
        var self = this;
        var index = 0;
        var ret = false;
        for (var i = 0; i < 3; i++) {
            if (self.eggData[i][0] > 0) {
                index++;
            }
        }
        if (index >= 3 || self.surNum > 0) {
            ret = true;
        }
        return ret;
    };
    //协议处理
    Model_ConsumeSmashEgg.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(9502, this.GC_ConsumeSmashEgg_openUI_9502, this);
        mgr.regHand(9504, this.GC_ConsumeSmashEgg_smashEgg_9504, this);
    };
    /**9502 打开消费砸蛋返回 [I:已领取大奖id][B:道具类型 I:道具Id I:数量]S:剩余次数S:已砸次数I:当前消费元宝*/
    Model_ConsumeSmashEgg.prototype.GC_ConsumeSmashEgg_openUI_9502 = function (self, data) {
        self.itemIDArr = [];
        self.eggData = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var itemID = data.readInt();
            self.itemIDArr.push(itemID);
        }
        var len1 = data.readShort();
        for (var i = 0; i < len1; i++) {
            var itemArr = [data.readByte(), data.readInt(), data.readInt()];
            self.eggData.push(itemArr);
        }
        self.surNum = data.readShort();
        self.drawNum = data.readShort();
        self.costMoney = data.readInt();
        GGlobal.reddot.setCondition(UIConst.ACTCOM_XFZD, 0, self.checkNotice());
        GGlobal.control.notify(UIConst.ACTCOM_XFZD);
        GGlobal.reddot.notifyMsg(UIConst.ACTCOM_XFZD);
    };
    /**9503 B 砸蛋 B:砸蛋索引(0、1、2)index*/
    Model_ConsumeSmashEgg.prototype.CG_ConsumeSmashEgg_smashEgg_9503 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(9503, bates);
    };
    /**9504 砸蛋返回 B:状态：1.成功 2.该蛋已砸 3.没有剩余次数 4.参数错误 5.背包已满[I:已领取大奖id][B:0.未砸 1.已砸 B:道具类型 I:道具Id I:数量]S:剩余次数S:已砸次数I:当前消费元宝*/
    Model_ConsumeSmashEgg.prototype.GC_ConsumeSmashEgg_smashEgg_9504 = function (self, data) {
        var result = data.readByte();
        switch (result) {
            case 1:
                self.itemIDArr = [];
                self.eggData = [];
                var len = data.readShort();
                for (var i = 0; i < len; i++) {
                    var itemID = data.readInt();
                    self.itemIDArr.push(itemID);
                }
                var len1 = data.readShort();
                for (var i = 0; i < len1; i++) {
                    var itemArr = [data.readByte(), data.readInt(), data.readInt()];
                    self.eggData.push(itemArr);
                }
                self.surNum = data.readShort();
                self.drawNum = data.readShort();
                self.costMoney = data.readInt();
                GGlobal.reddot.setCondition(UIConst.ACTCOM_XFZD, 0, self.checkNotice());
                GGlobal.control.notify(Enum_MsgType.ACTCOM_XFZD_SHOWEFF);
                GGlobal.control.notify(UIConst.ACTCOM_XFZD);
                GGlobal.reddot.notifyMsg(UIConst.ACTCOM_XFZD);
                break;
        }
    };
    return Model_ConsumeSmashEgg;
}(BaseModel));
__reflect(Model_ConsumeSmashEgg.prototype, "Model_ConsumeSmashEgg");
