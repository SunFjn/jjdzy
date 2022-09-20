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
var Model_ZhiGou = (function (_super) {
    __extends(Model_ZhiGou, _super);
    function Model_ZhiGou() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_ZhiGou.checkNotice = function () {
        for (var i = 0; i < Model_ZhiGou.rewardArr.length; i++) {
            for (var j = 0; j < Model_ZhiGou.rewardArr[i].length; j++) {
                if (Model_ZhiGou.rewardArr[i][j][1] == 1) {
                    return true;
                }
            }
        }
        for (var j = 0; j < Model_ZhiGou.rewarStatedArr.length; j++) {
            var vo = Model_ZhiGou.rewarStatedArr[j];
            if (vo.state == 1) {
                return true;
            }
        }
        return false;
    };
    /**3701	打开界面 */
    Model_ZhiGou.prototype.CG_ZHIGOU_OPEN_UI = function () {
        var ba = new BaseBytes();
        this.sendSocket(3701, ba);
    };
    /**3703	领取奖励 B:领取的天数id，第一天就为1B:领取的档次，为每日直购表id */
    Model_ZhiGou.prototype.CG_ZHIGOU_DRAWREWARD = function (day, type) {
        var ba = new BaseBytes();
        ba.writeByte(day);
        ba.writeByte(type);
        this.sendSocket(3703, ba);
    };
    /**3707	领取目标奖励 I:目标表id */
    Model_ZhiGou.prototype.CG_3707 = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(3707, ba);
    };
    /**3721	领取奖励 B:领取的天数id，第一天就为1B:领取的档次，为每日直购表id */
    Model_ZhiGou.prototype.CG_ZHIGOU_DRAWREWARD_ACTIVITY = function (day, type) {
        var ba = new BaseBytes();
        ba.writeByte(day);
        ba.writeByte(type);
        this.sendSocket(3721, ba);
    };
    /**3725 领取目标奖励 I:目标表id */
    Model_ZhiGou.prototype.CG_3725 = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(3725, ba);
    };
    /**7001	领取奖励 I:每日直购表id */
    Model_ZhiGou.prototype.CG_ZHIGOU_DRAWREWARD_828 = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(7001, ba);
    };
    /**7005	领取目标奖励 I:目标表id */
    Model_ZhiGou.prototype.CG_7005 = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(7005, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_ZhiGou.prototype.listenServ = function (wsm) {
        var s = this;
        s.socket = wsm;
        wsm.regHand(3702, s.GC_ZHIGOU_OPEN_UI, s);
        wsm.regHand(3704, s.GC_ZHIGOU_DRAWREWARD, s);
        wsm.regHand(3722, s.GC_ZHIGOU_DRAWREWARD, s);
        wsm.regHand(3720, s.GC_ZHIGOU_OPEN_UI, s);
        wsm.regHand(3706, s.GC_ZHIGOU_DATA_CHANGE, s);
        wsm.regHand(3724, s.GC_ZHIGOU_DATA_CHANGE, s);
        wsm.regHand(7000, s.GC_ZHIGOU_OPEN_UI_828, s);
        wsm.regHand(7002, s.GC_ZHIGOU_DRAWREWARD_828, s);
        wsm.regHand(7004, s.GC_ZHIGOU_DATA_CHANGE_828, s);
        wsm.regHand(3708, s.GC_TARGET_AWARD, s);
        wsm.regHand(3726, s.GC_TARGET_AWARD, s);
        wsm.regHand(7006, s.GC_TARGET_AWARD, s);
    };
    /**3706	通知前端奖励可领取 B:每日直购表id */
    Model_ZhiGou.prototype.GC_ZHIGOU_DATA_CHANGE = function (self, data) {
        var order = data.readByte();
        var index = 0;
        for (var i = 0; i < Model_ZhiGou.rewardArr.length; i++) {
            for (var j = 0; j < Model_ZhiGou.rewardArr[i].length; j++) {
                if (Model_ZhiGou.rewardArr[i][j][0] == order) {
                    Model_ZhiGou.rewardArr[i][j][1] = 1;
                    index++;
                    break;
                }
            }
            if (index > 0)
                break;
        }
        GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
    };
    /**3704	领取奖励返回 B:领取状态，1:领取成功，2:未购买无法领取，3，重复领取，4:参数错误B:领取的档次，为每日直购表id */
    Model_ZhiGou.prototype.GC_ZHIGOU_DRAWREWARD = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var order = data.readByte();
            var index = 0;
            for (var i = 0; i < Model_ZhiGou.rewardArr.length; i++) {
                for (var j = 0; j < Model_ZhiGou.rewardArr[i].length; j++) {
                    if (Model_ZhiGou.rewardArr[i][j][0] == order) {
                        Model_ZhiGou.rewardArr[i][j][1] = 2;
                        index++;
                        break;
                    }
                }
                if (index > 0)
                    break;
            }
            GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
        }
    };
    /**3702	打开界面返回 [[B:每日直购表idB:0:未购买，1:已购买但未领取，2:已领取]奖励档次列表，第一层为天数，第二层为奖励状态]奖励列表I:开服第几天 [I:每日直购表idI:奖励状态，0:未达到，1:可领取，2:已领取]目标奖励列表I:目标次数I:结束时间*/
    Model_ZhiGou.prototype.GC_ZHIGOU_OPEN_UI = function (self, data) {
        Model_ZhiGou.rewardArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var arr = [];
            for (var j = 0, len1 = data.readShort(); j < len1; j++) {
                var order = data.readByte();
                var state = data.readByte();
                arr.push([order, state]);
            }
            Model_ZhiGou.rewardArr.push(arr);
        }
        Model_ZhiGou.curDay = data.readInt();
        Model_ZhiGou.rewarStatedArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var vo = new ZhiGouVO();
            vo.readMsg(data);
            Model_ZhiGou.rewarStatedArr.push(vo);
        }
        Model_ZhiGou.count = data.readInt();
        Model_ZhiGou.endTime = data.readInt();
        GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
    };
    /**7000	打开ui返回 [[I:每日直购表idB:0:未购买，1:已购买但未领取，2:已领取]奖励档次列表，第一层为天数，第二层为奖励状态]奖励列表I:开服第几天 */
    Model_ZhiGou.prototype.GC_ZHIGOU_OPEN_UI_828 = function (self, data) {
        Model_ZhiGou.rewardArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var arr = [];
            for (var j = 0, len1 = data.readShort(); j < len1; j++) {
                var order = data.readInt();
                var state = data.readByte();
                arr.push([order, state]);
            }
            Model_ZhiGou.rewardArr.push(arr);
        }
        Model_ZhiGou.curDay = data.readInt();
        Model_ZhiGou.rewarStatedArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var vo = new ZhiGouVO();
            vo.readMsg(data);
            Model_ZhiGou.rewarStatedArr.push(vo);
        }
        Model_ZhiGou.count = data.readInt();
        Model_ZhiGou.endTime = data.readInt();
        GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
    };
    /**7002	领取奖励返回 B:领取状态，1:领取成功，2:未购买无法领取，3，重复领取，4:参数错误I:领取的档次，为每日直购表id */
    Model_ZhiGou.prototype.GC_ZHIGOU_DRAWREWARD_828 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var order = data.readInt();
            var index = 0;
            for (var i = 0; i < Model_ZhiGou.rewardArr.length; i++) {
                for (var j = 0; j < Model_ZhiGou.rewardArr[i].length; j++) {
                    if (Model_ZhiGou.rewardArr[i][j][0] == order) {
                        Model_ZhiGou.rewardArr[i][j][1] = 2;
                        index++;
                        break;
                    }
                }
                if (index > 0)
                    break;
            }
            GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
        }
    };
    /**7004	通知前端奖励可领取 I:每日直购id */
    Model_ZhiGou.prototype.GC_ZHIGOU_DATA_CHANGE_828 = function (self, data) {
        var order = data.readInt();
        var index = 0;
        for (var i = 0; i < Model_ZhiGou.rewardArr.length; i++) {
            for (var j = 0; j < Model_ZhiGou.rewardArr[i].length; j++) {
                if (Model_ZhiGou.rewardArr[i][j][0] == order) {
                    Model_ZhiGou.rewardArr[i][j][1] = 1;
                    index++;
                    break;
                }
            }
            if (index > 0)
                break;
        }
        GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
    };
    /**3708 领取目标奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:目标表id */
    Model_ZhiGou.prototype.GC_TARGET_AWARD = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            var len = Model_ZhiGou.rewarStatedArr.length;
            for (var i = 0; i < len; i++) {
                var vo = Model_ZhiGou.rewarStatedArr[i];
                if (vo.id == id) {
                    vo.state = 2;
                }
            }
            GGlobal.control.notify(Enum_MsgType.ZHIGOU_UPDATE);
        }
    };
    /**直购8-28系统为等级以及开服天数共同控制开启
    ** 开服第8天开启,持续7天(配置系统开启表)
    */
    Model_ZhiGou.prototype.checkAndOpenIcon = function () {
        var bool = ModelEightLock.hasActInZhiGou();
        var zhigouRedDot = GGlobal.reddot.checkCondition(UIConst.ZHI_GOU828, 0);
        if (bool) {
            if (!GGlobal.mainUICtr.getIcon(UIConst.ZHI_GOU828)) {
                GGlobal.mainUICtr.addIcon(UIConst.ZHI_GOU828, zhigouRedDot);
            }
            else {
                GGlobal.mainUICtr.setIconNotice(UIConst.ZHI_GOU828, zhigouRedDot);
            }
        }
        else {
            if (GGlobal.mainUICtr.getIcon(UIConst.ZHI_GOU828)) {
                GGlobal.mainUICtr.removeIcon(UIConst.ZHI_GOU828);
            }
        }
    };
    Model_ZhiGou.curDay = 0;
    Model_ZhiGou.rewardArr = [];
    Model_ZhiGou.rewarStatedArr = []; //奖励状态
    Model_ZhiGou.count = 0; //目标次数
    Model_ZhiGou.endTime = 0; //活动结束时间
    return Model_ZhiGou;
}(BaseModel));
__reflect(Model_ZhiGou.prototype, "Model_ZhiGou");
