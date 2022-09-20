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
var Model_SJXS = (function (_super) {
    __extends(Model_SJXS, _super);
    function Model_SJXS() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.endTime = 0;
        _this.drawNum = 0;
        _this.myRank = 0;
        return _this;
    }
    Model_SJXS.prototype.getRankData = function () {
        var self = this;
        if (!self.rankData) {
            self.rankData = {};
            for (var key in Config.godrank_288) {
                var cfg = Config.godrank_288[key];
                if (!self.rankData[cfg.qs])
                    self.rankData[cfg.qs] = [];
                self.rankData[cfg.qs].push(cfg);
            }
            for (var key in self.rankData) {
                self.rankData[key].sort(function (a, b) {
                    return a.id - b.id;
                });
            }
        }
    };
    Model_SJXS.prototype.checkNotice = function () {
        var self = this;
        if (self.targertData) {
            for (var i = 0; i < self.targertData.length; i++) {
                if (self.targertData[i].state == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    //协议处理
    Model_SJXS.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(9550, this.GC_GodGenThisLife_inform_9550, this);
        mgr.regHand(9552, this.GC_GodGenThisLife_turn_9552, this);
        mgr.regHand(9554, this.GC_GodGenThisLife_openRankUI_9554, this);
        mgr.regHand(9556, this.GC_GodGenThisLife_openTargetAwardUI_9556, this);
        mgr.regHand(9558, this.GC_GodGenThisLife_getTargetAward_9558, this);
    };
    /**9550 I 通知 I:结束时间endTimeI:抽奖次数*/
    Model_SJXS.prototype.GC_GodGenThisLife_inform_9550 = function (self, data) {
        self.endTime = data.readInt();
        self.drawNum = data.readInt();
        GGlobal.control.notify(UIConst.SHENJIANG_XIANSHI);
    };
    /**9551 B 抽奖 B:次数1：1次，2：10次type*/
    Model_SJXS.prototype.CG_GodGenThisLife_turn_9551 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(9551, bates);
    };
    /**9552 B-[B-I-I-B] 抽奖返回 B:状态：1：成功，2：元宝不足state[B:道具类型I:道具IdI:道具数量B:是否大奖，0：不是，1：是]抽奖结果resultListI:抽奖次数*/
    Model_SJXS.prototype.GC_GodGenThisLife_turn_9552 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var rewardArr = [];
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var vo = ConfigHelp.parseItemBa(data);
                var isBig = data.readByte();
                vo.extra = isBig == 1 ? 5 : 0;
                rewardArr.push(vo);
            }
            self.drawNum = data.readInt();
            if (self.targertData) {
                for (var i = 0; i < self.targertData.length; i++) {
                    var cfg = Config.godmb_288[self.targertData[i].id];
                    if (self.targertData[i].state == 0 && self.drawNum >= cfg.time) {
                        self.targertData[i].state = 1;
                    }
                }
            }
            GGlobal.reddot.setCondition(UIConst.SHENJIANG_XIANSHI, 0, self.checkNotice());
            GGlobal.reddot.notifyMsg(UIConst.SHENJIANG_XIANSHI);
            GGlobal.control.notify(Enum_MsgType.SJXS_REWARD, rewardArr);
        }
    };
    /**9553  打开排行榜 */
    Model_SJXS.prototype.CG_GodGenThisLife_openRankUI_9553 = function () {
        var bates = this.getBytes();
        this.sendSocket(9553, bates);
    };
    /**9554 [S-U-I]-S-I 打开排行榜返回 [S:排名U:玩家名I:抽奖次数]排行榜数据rankListS:我的排名  0未进排行榜 myRankI:我的抽奖次数myTimes*/
    Model_SJXS.prototype.GC_GodGenThisLife_openRankUI_9554 = function (self, data) {
        self.rankDic = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var rank = data.readShort();
            var name_1 = data.readUTF();
            var num = data.readInt();
            self.rankDic[rank] = { name: name_1, num: num };
        }
        self.myRank = data.readShort();
        self.drawNum = data.readInt();
        GGlobal.control.notify(UIConst.SHENJIANG_XIANSHI_RANK);
    };
    /**9555  打开目标奖励界面 */
    Model_SJXS.prototype.CG_GodGenThisLife_openTargetAwardUI_9555 = function () {
        var bates = this.getBytes();
        this.sendSocket(9555, bates);
    };
    /**9556 [I-B] 打开目标奖励界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表awardList*/
    Model_SJXS.prototype.GC_GodGenThisLife_openTargetAwardUI_9556 = function (self, data) {
        self.targertData = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var cfgID = data.readInt();
            var state = data.readByte();
            self.targertData.push({ id: cfgID, state: state });
        }
        self.targertData.sort(self.sortReward);
        GGlobal.reddot.setCondition(UIConst.SHENJIANG_XIANSHI, 0, self.checkNotice());
        GGlobal.reddot.notifyMsg(UIConst.SHENJIANG_XIANSHI);
        GGlobal.control.notify(UIConst.SHENJIANG_XIANSHI);
    };
    Model_SJXS.prototype.sortReward = function (a, b) {
        var idA = a.id;
        var idB = b.id;
        if (a.state == 1)
            idA = a.id - 1000;
        if (b.state == 1)
            idB = b.id - 1000;
        if (a.state == 0)
            idA = a.id - 100;
        if (b.state == 0)
            idB = b.id - 100;
        return idA - idB;
    };
    /**9557 I 领取目标奖励 I:要领取的奖励idawardId*/
    Model_SJXS.prototype.CG_GodGenThisLife_getTargetAward_9557 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(9557, bates);
    };
    /**9558 B-I 领取目标奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取stateI:领取的奖励idawardId*/
    Model_SJXS.prototype.GC_GodGenThisLife_getTargetAward_9558 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var cfgID = data.readInt();
            for (var i = 0; i < self.targertData.length; i++) {
                if (self.targertData[i].id == cfgID) {
                    self.targertData[i].state = 2;
                    break;
                }
            }
            self.targertData.sort(self.sortReward);
            GGlobal.control.notify(UIConst.SHENJIANG_XIANSHI);
        }
    };
    return Model_SJXS;
}(BaseModel));
__reflect(Model_SJXS.prototype, "Model_SJXS");
