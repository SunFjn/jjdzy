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
 * Model_SearchAnimals
 * 仙山寻兽
 */
var Model_SearchAnimals = (function (_super) {
    __extends(Model_SearchAnimals, _super);
    function Model_SearchAnimals() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemID = 410099;
        _this.rewardData = {};
        _this.jifen = 0;
        return _this;
    }
    Model_SearchAnimals.prototype.checkNotcie = function () {
        var self = this;
        var count = Model_Bag.getItemCount(self.itemID);
        var ret = count > 0;
        if (!ret) {
            for (var key in self.rewardData) {
                if (self.rewardData[key] > 0) {
                    ret = true;
                    break;
                }
            }
        }
        return ret;
    };
    //协议处理
    Model_SearchAnimals.prototype.listenServ = function (mgr) {
        var self = this;
        self.socket = mgr;
        //注册GC方法
        mgr.regHand(8762, self.GC_SearchAnimals_openUI_8762, self);
        mgr.regHand(8764, self.GC_SearchAnimals_search_8764, self);
        mgr.regHand(8766, self.GC_SearchAnimals_getAward_8766, self);
        mgr.regHand(8768, self.GC_XIANSHAN_XUNSHOU_RESET, self);
    };
    /**8762 [I-I-I-I-B]-[I-B]-I 打开仙山寻兽界面信息返回 [I:寻兽ID  I:道具类型  I:道具ID  I:数量  B:状态：0.未开  1.已开启]
     * 寻兽信息searchInfo[I:积分ID  B:状态：-1.已领取  0.未达到积分奖励  >0.数量红点]积分奖励信息rewardInfoI:积分score*/
    Model_SearchAnimals.prototype.GC_SearchAnimals_openUI_8762 = function (self, data) {
        Model_SearchAnimals.hasData = true;
        self.xunShouData = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var vo = ConfigHelp.parseItemBa(data);
            self.xunShouData[id] = vo;
        }
        var len1 = data.readShort();
        for (var i = 0; i < len1; i++) {
            var jifenID = data.readInt();
            var state = data.readByte();
            self.rewardData[jifenID] = state;
        }
        self.jifen = data.readInt();
        GGlobal.control.notify(UIConst.XIANSHAN_XUNSHOU);
    };
    /**8763 I 寻兽 I:寻兽ID，0.为一键寻兽id*/
    Model_SearchAnimals.prototype.CG_SearchAnimals_search_8763 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(8763, bates);
    };
    /**8764 寻兽返回 B:状态：1.成功 2.元宝不足 3.参数错误 4.该位置已寻过 5.背包已满 [I:寻兽ID B:道具类型I:道具IDI:道具数量]
     * [I:积分ID B:积分奖励状态：-1.已领取 0.未达到积分奖励 >0.数量红点]I:积分*/
    Model_SearchAnimals.prototype.GC_SearchAnimals_search_8764 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            ViewCommonWarn.text("寻兽成功");
            var len = data.readShort();
            var arr = [];
            for (var i = 0; i < len; i++) {
                var id = data.readInt();
                var vo = ConfigHelp.parseItemBa(data);
                self.xunShouData[id] = vo;
                arr.push(id);
            }
            var len1 = data.readShort();
            for (var i = 0; i < len1; i++) {
                var jifenID = data.readInt();
                var state = data.readByte();
                self.rewardData[jifenID] = state;
            }
            self.jifen = data.readInt();
            GGlobal.control.notify(UIConst.XIANSHAN_XUNSHOU);
            GGlobal.control.notify(Enum_MsgType.XIANSHAN_XUNSHOU_SHOWEFF, arr);
        }
    };
    /**8765 I 领取积分奖励 I:积分IDid*/
    Model_SearchAnimals.prototype.CG_SearchAnimals_getAward_8765 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(8765, bates);
    };
    /**8766 领取积分奖励返回 B:状态：1.成功 2.积分未达成 3.参数错误 4.已领取 5.背包已满I:领取积分ID B:奖励倍数(数量红点)*/
    Model_SearchAnimals.prototype.GC_SearchAnimals_getAward_8766 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var jifenID = data.readInt();
            var state = data.readByte();
            self.rewardData[jifenID] = state;
            GGlobal.control.notify(UIConst.XIANSHAN_XUNSHOU);
            GGlobal.control.notify(Enum_MsgType.XIANSHAN_XUNSHOU_REWARD);
        }
    };
    /**8761  打开仙山寻兽界面 */
    Model_SearchAnimals.prototype.CG_SearchAnimals_openUI_8761 = function () {
        var bates = this.getBytes();
        this.sendSocket(8761, bates);
    };
    /**8767	重置 */
    Model_SearchAnimals.prototype.CG_XIANSHAN_XUNSHOU_RESET = function () {
        var bates = this.getBytes();
        this.sendSocket(8767, bates);
    };
    /**8768	重置返回 B:状态：1.成功 2.未全部寻完不能重置 */
    Model_SearchAnimals.prototype.GC_XIANSHAN_XUNSHOU_RESET = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            self.xunShouData = {};
            GGlobal.control.notify(UIConst.XIANSHAN_XUNSHOU);
        }
    };
    Model_SearchAnimals.hasData = false;
    return Model_SearchAnimals;
}(BaseModel));
__reflect(Model_SearchAnimals.prototype, "Model_SearchAnimals");
