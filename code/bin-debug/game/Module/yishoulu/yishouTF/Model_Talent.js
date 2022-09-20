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
 * Model_Talent
 * 修炼天赋
 */
var Model_Talent = (function (_super) {
    __extends(Model_Talent, _super);
    function Model_Talent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemID = 410401;
        _this.showData = [];
        _this.targetData = {};
        _this.xiulianNum = 0;
        _this.skipTween = false;
        return _this;
    }
    Model_Talent.prototype.checkNotice = function () {
        var self = this;
        var ret = false;
        var count = Model_Bag.getItemCount(self.itemID);
        ret = count > 0;
        if (!ret) {
            for (var key in self.targetData) {
                if (self.targetData[key] > 0) {
                    ret = true;
                    break;
                }
            }
        }
        return ret;
    };
    //协议处理
    Model_Talent.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(9372, this.GC_Talent_openUI_9372, this);
        mgr.regHand(9374, this.GC_Talent_xiuLian_9374, this);
        mgr.regHand(9376, this.GC_Talent_getAward_9376, this);
    };
    /**9371  打开修炼天赋界面 */
    Model_Talent.prototype.CG_Talent_openUI_9371 = function () {
        var bates = this.getBytes();
        this.sendSocket(9371, bates);
    };
    /**9372 [B-I-I]-[I-I]-I 打开修炼天赋界面返回 [B:道具类型I:道具IDI:数量]展示道具showItemList[I:目标奖励IDI:奖励状态：-1.已领取 0.条件不符 >0.次数]targetRewardListI:修炼次数num*/
    Model_Talent.prototype.GC_Talent_openUI_9372 = function (self, data) {
        self.showData = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var vo = ConfigHelp.parseItemBa(data);
            self.showData.push(vo);
        }
        var len1 = data.readShort();
        for (var i = 0; i < len1; i++) {
            var id = data.readInt();
            var state = data.readInt();
            self.targetData[id] = state;
        }
        self.xiulianNum = data.readInt();
        GGlobal.control.notify(UIConst.XIULIAN_TF);
    };
    /**9373 B 修炼 B:修炼类型：1.修炼1次  2.修炼10次type*/
    Model_Talent.prototype.CG_Talent_xiuLian_9373 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(9373, bates);
    };
    /**9374 B-[B-I-I]-[I-I]-I-[B-I-I] 修炼返回 B:状态：1.成功 2.元宝不足  3.背包已满state[B:道具类型I:道具IDI:数量B:是否是大奖]awardList
     * [I:目标奖励IDI:状态：-1.已领取  0.条件不符  >0.次数]targetRewardListI:修炼次数num[B:道具类型I:道具IDI:数量]展示道具：
     * 有重置时返回数据，否则无数据showItemList*/
    Model_Talent.prototype.GC_Talent_xiuLian_9374 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var len = data.readShort();
            var dropArr = [];
            for (var i = 0; i < len; i++) {
                var item = ConfigHelp.parseItemBa(data);
                var isBig = data.readByte();
                item.extra = isBig ? 5 : 0;
                dropArr.push(item);
            }
            var len1 = data.readShort();
            for (var i = 0; i < len1; i++) {
                var id = data.readInt();
                var state = data.readInt();
                self.targetData[id] = state;
            }
            self.xiulianNum = data.readInt();
            var len2 = data.readShort();
            if (len2 > 0) {
                self.showData = [];
            }
            for (var i = 0; i < len2; i++) {
                var vo = ConfigHelp.parseItemBa(data);
                self.showData.push(vo);
            }
            GGlobal.control.notify(Enum_MsgType.XIULIAN_TF_SHOWEFF, dropArr);
            GGlobal.control.notify(UIConst.XIULIAN_TF);
        }
    };
    /**9375 I 领取目标奖励 I:目标奖励IDid*/
    Model_Talent.prototype.CG_Talent_getAward_9375 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(9375, bates);
    };
    /**9376 B-I-I 领取目标奖励返回 B:状态：1.成功 2.条件不符 3.背包已满 4.参数错误 5.已领取stateI:目标奖励ID idI:目标奖励状态：-1.已领取 0.条件不符 >0.奖励次数flag*/
    Model_Talent.prototype.GC_Talent_getAward_9376 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            var state = data.readInt();
            self.targetData[id] = state;
            GGlobal.control.notify(Enum_MsgType.XIULIAN_TF_REWARD);
            GGlobal.control.notify(UIConst.XIULIAN_TF);
        }
    };
    return Model_Talent;
}(BaseModel));
__reflect(Model_Talent.prototype, "Model_Talent");
