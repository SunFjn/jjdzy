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
 * 三国战令模块管理器
 * @author: lujiahao
 * @date: 2019-09-19 14:11:10
 */
var ModelSGZL = (function (_super) {
    __extends(ModelSGZL, _super);
    function ModelSGZL() {
        var _this = _super.call(this) || this;
        _this._taskVoMap = {};
        _this._rewardVoMap = {};
        _this._shopVoMap = {};
        _this.initOpen = false;
        /** 是否进阶过 */
        _this.upgradeFlag = 0;
        /** 战令等级id */
        _this.levelId = 0;
        /** 当前战令经验 */
        _this.curExp = 0;
        _this.con0Count = 0;
        _this.con1Count = 1;
        _this._setupFlag = false;
        return _this;
    }
    ModelSGZL.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
        {
            var t_cfg = Config.sgzljl_017;
            for (var k in t_cfg) {
                var t_vo = new VoSGZLReward();
                t_vo.id = ~~k;
                this._rewardVoMap[t_vo.id] = t_vo;
            }
        }
        {
            var t_cfg = Config.sgzlrw_017;
            for (var k in t_cfg) {
                var t_vo = new VoSGZLTask();
                t_vo.taskId = ~~k;
                this._taskVoMap[t_vo.taskId] = t_vo;
            }
        }
        {
            var t_cfg = Config.sgzlshop_017;
            for (var k in t_cfg) {
                var t_vo = new VoSGZLShop();
                t_vo.id = ~~k;
                this._shopVoMap[t_vo.id] = t_vo;
            }
        }
    };
    //========================================= 协议相关 ========================================
    ModelSGZL.prototype.listenServ = function (m) {
        _super.prototype.listenServ.call(this, m);
        //注册GC方法
        m.regHand(8850, this.GC_WarOrderActive_openUI_8850, this);
        m.regHand(8852, this.GC_WarOrderActive_getWarOrderReward_8852, this);
        m.regHand(8854, this.GC_WarOrderActive_openTaskUI_8854, this);
        m.regHand(8856, this.GC_WarOrderActive_getReward_8856, this);
        m.regHand(8858, this.GC_WarOrderActive_openShopUI_8858, this);
        m.regHand(8860, this.GC_WarOrderActive_buy_8860, this);
    };
    /**8850 [I-[I-B]]-B-I-I 打开战令界面返回 [I:战令类型 0普通 1进阶[I:战令等级B:领取状态 0未领取 1可领取 2已领取]]战令数据sendDataB:进阶战令状态 0普通(未购买) 1进阶(已购买)buyStateI:战令等级levelI:战令经验exp*/
    ModelSGZL.prototype.GC_WarOrderActive_openUI_8850 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readInt();
            var len1 = data.readShort();
            for (var i_1 = 0; i_1 < len1; i_1++) {
                var arg2 = data.readInt();
                var arg3 = data.readByte();
                var t_rewardVo = self.getRewardVoById(arg2);
                if (t_rewardVo) {
                    if (t_rewardVo.updateState(arg1, arg3)) {
                        t_change = true;
                    }
                }
            }
        }
        var arg4 = data.readByte();
        var arg5 = data.readInt();
        var arg6 = data.readInt();
        if (arg4 != self.upgradeFlag) {
            self.upgradeFlag = arg4;
            t_change = true;
        }
        if (arg5 != self.levelId) {
            self.levelId = arg5;
            t_change = true;
        }
        if (arg6 != self.curExp) {
            self.curExp = arg6;
            t_change = true;
            // console.log("Reward查询经验==========", self.curExp);
        }
        if (!self.initOpen) {
            self.initOpen = true;
            self.reddotCheckAll();
        }
        if (t_change) {
            self.reddotCheckReward();
            GGlobal.control.notify(Enum_MsgType.SGZL_REWARD_UPDATE);
        }
    };
    /**
     * 发送领取战令奖励的请求
     * @param pGetType 领取类型 0单个领取 1一键领取
     * @param pType 战令类型 0普通 1进阶 一键领取时，该参数没意义
     * @param pId 指定的奖励id 一键领取时，该参数没意义
     */
    ModelSGZL.prototype.cmdSendGetReward = function (pGetType, pType, pId) {
        if (pType === void 0) { pType = 0; }
        if (pId === void 0) { pId = 0; }
        //8851 I-I-I 领取战令奖励 I:战令类型 0普通 1进阶typeI:战令等级levelI:领取方式 0普通领取 1一键领取getState
        if (pGetType == 1) {
            var t_value = GGlobal.reddot.checkCondition(UIConst.ACTHB_SGZL, 1);
            if (!t_value) {
                ViewCommonWarn.text("当前没有可领取的奖励");
                return;
            }
        }
        var bates = this.getBytes();
        bates.writeInt(pType);
        bates.writeInt(pId);
        bates.writeInt(pGetType);
        this.sendSocket(8851, bates);
    };
    /**8852 B-I-I-I 领取战令奖励返回 B:状态 0没有购买进阶战令不能领取 1该等级奖励不可领取 2没有可领取的奖励 3成功stateI:领取方式 0普通 1一键getStateI:战令类型typeI:战令等级level*/
    ModelSGZL.prototype.GC_WarOrderActive_getWarOrderReward_8852 = function (self, data) {
        var t_change = false;
        var t_result = data.readByte();
        var t_getType = data.readInt();
        var t_type = data.readInt();
        var t_levelId = data.readInt();
        if (t_result == 3) {
            if (t_getType == 1) {
                //一键领取
                var t_rewardList = self.getRewardVoList();
                for (var _i = 0, t_rewardList_1 = t_rewardList; _i < t_rewardList_1.length; _i++) {
                    var v = t_rewardList_1[_i];
                    if (v.state0 == Enum_SGZL.STATE_CAN_GET) {
                        v.state0 = Enum_SGZL.SATTE_DONE;
                        t_change = true;
                    }
                    if (v.state1 == Enum_SGZL.STATE_CAN_GET) {
                        v.state1 = Enum_SGZL.SATTE_DONE;
                        t_change = true;
                    }
                }
            }
            else {
                //单独领取
                var t_vo = self.getRewardVoById(t_levelId);
                if (t_vo && t_vo.updateState(t_type, Enum_SGZL.SATTE_DONE)) {
                    t_change = true;
                }
            }
        }
        if (t_change) {
            self.reddotCheckReward();
            GGlobal.control.notify(Enum_MsgType.SGZL_REWARD_UPDATE);
        }
    };
    /**8853  打开任务UI */
    ModelSGZL.prototype.cmdSendRequestTaskList = function () {
        var bates = this.getBytes();
        this.sendSocket(8853, bates);
    };
    /**8854 [I-I-[I-B]] 打开任务UI返回 [I:任务类型I:该类型任务的完成度[I:任务idB:任务状态]]任务数据taskData*/
    ModelSGZL.prototype.GC_WarOrderActive_openTaskUI_8854 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readInt(); //任务类型
            var arg2 = data.readInt(); //当前的任务类型完成计数
            var len1 = data.readShort();
            for (var i_2 = 0; i_2 < len1; i_2++) {
                var arg3 = data.readInt(); //任务id
                var arg4 = data.readByte(); //任务状态 0未完成 1可领取 2已领取
                var t_vo = self.getTaskVoByTaskId(arg3);
                if (t_vo && t_vo.update(arg2, arg4)) {
                    t_change = true;
                }
            }
        }
        if (t_change) {
            self.reddotCheckTask();
            GGlobal.control.notify(Enum_MsgType.SGZL_TASK_UPDATE);
        }
    };
    /**8855 I-I 领取任务奖励 I:任务类型typeI:任务idtaskId*/
    ModelSGZL.prototype.cmdSendGetTaskReward = function (pTaskId) {
        var t_vo = this.getTaskVoByTaskId(pTaskId);
        if (!t_vo)
            return;
        var bates = this.getBytes();
        bates.writeInt(t_vo.cfg.leixing);
        bates.writeInt(pTaskId);
        this.sendSocket(8855, bates);
    };
    /**8856 B-I-I-I-I 领取任务奖励返回 B:结果 0失败 1成功stateI:失败(1未完成任务 2已领取)，成功返回任务类型typeI:任务idtaskIdI:战令等级levelI:战令经验exp*/
    ModelSGZL.prototype.GC_WarOrderActive_getReward_8856 = function (self, data) {
        var t_change = false;
        var t_result = data.readByte();
        var t_taskType = data.readInt();
        var t_taskId = data.readInt();
        var t_levelId = data.readInt();
        var t_curExp = data.readInt();
        // console.log("领取后的经验=========", t_curExp);
        if (t_result == 1) {
            //成功
            var t_vo = self.getTaskVoByTaskId(t_taskId);
            if (t_vo && t_vo.state != Enum_SGZL.SATTE_DONE) {
                t_vo.state = Enum_SGZL.SATTE_DONE;
                t_change = true;
            }
            if (self.levelId != t_levelId) {
                self.levelId = t_levelId;
                t_change = true;
            }
            if (self.curExp != t_curExp) {
                self.curExp = t_curExp;
                t_change = true;
            }
        }
        if (t_change) {
            self.reddotCheckTask();
            GGlobal.modelEightLock.CG4571(UIConst.ACTHB_SGZL); //重新请求更新奖励列表数据
            GGlobal.control.notify(Enum_MsgType.SGZL_REWARD_UPDATE);
            GGlobal.control.notify(Enum_MsgType.SGZL_TASK_UPDATE);
        }
    };
    /**8857  打开商店页面 */
    ModelSGZL.prototype.cmdSendRequestShop = function () {
        var bates = this.getBytes();
        this.sendSocket(8857, bates);
    };
    /**8858 [I-I]-I-I 打开商店页面返回 [I:配置表idI:已购买数量]商店列表shopListI:背包中的白银令prop1I:背包中的黄金令prop2*/
    ModelSGZL.prototype.GC_WarOrderActive_openShopUI_8858 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readInt(); //商店id
            var arg2 = data.readInt(); //已购买数量
            var t_vo = self.getShopVoById(arg1);
            if (t_vo && t_vo.update(arg2)) {
                t_change = true;
            }
        }
        var arg3 = data.readInt();
        var arg4 = data.readInt();
        if (self.con0Count != arg3) {
            self.con0Count = arg3;
            t_change = true;
        }
        if (self.con1Count != arg4) {
            self.con1Count = arg4;
            t_change = true;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.SGZL_SHOP_UPDATE);
        }
    };
    /**8859 I 购买商品 I:配置表idid*/
    ModelSGZL.prototype.cmdSendBuy = function (pId) {
        var t_vo = this.getShopVoById(pId);
        if (!t_vo)
            return;
        if (!t_vo.checkCanBuy())
            return;
        var bates = this.getBytes();
        bates.writeInt(pId);
        this.sendSocket(8859, bates);
    };
    /**8860 B-I 购买商品返回 B:状态 0商品不存在 1成功 2道具不足 3商品已卖完stateI:购买的配置表idid*/
    ModelSGZL.prototype.GC_WarOrderActive_buy_8860 = function (self, data) {
        var t_change = false;
        var t_result = data.readByte();
        var t_shopId = data.readInt();
        switch (t_result) {
            case 1:
                var t_vo = self.getShopVoById(t_shopId);
                if (t_vo) {
                    t_vo.buyCount += 1;
                    t_change = true;
                }
                break;
            case 2:
                t_vo = self.getShopVoById(t_shopId);
                if (t_vo) {
                    ViewCommonWarn.text("缺少道具：" + HtmlUtil.fontNoSize(t_vo.consumeItem.name, Color.getColorStr(t_vo.consumeItem.quality)));
                }
                break;
            case 3:
                ViewCommonWarn.text("商品已卖完");
                break;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.SGZL_SHOP_UPDATE);
        }
    };
    ModelSGZL.prototype.getTaskVoList = function () {
        if (this._taskVoList === undefined) {
            this._taskVoList = [];
            for (var k in this._taskVoMap) {
                this._taskVoList.push(this._taskVoMap[k]);
            }
        }
        return this._taskVoList;
    };
    ModelSGZL.prototype.getTypeVoListMap = function () {
        if (this._typeVoListMap === undefined) {
            var t_allList = this.getTaskVoList();
            this._typeVoListMap = {};
            for (var _i = 0, t_allList_1 = t_allList; _i < t_allList_1.length; _i++) {
                var v = t_allList_1[_i];
                var t_type = v.cfg.leixing;
                var t_voList = this._typeVoListMap[t_type];
                if (!t_voList) {
                    this._typeVoListMap[t_type] = t_voList = [];
                }
                t_voList.push(v);
            }
        }
        return this._typeVoListMap;
    };
    ModelSGZL.prototype.getRewardVoList = function () {
        if (this._rewardVoList === undefined) {
            this._rewardVoList = [];
            for (var k in this._rewardVoMap) {
                var t_id = ~~k;
                if (t_id == 0)
                    continue;
                this._rewardVoList.push(this._rewardVoMap[k]);
            }
        }
        return this._rewardVoList;
    };
    ModelSGZL.prototype.getShopVoList = function () {
        if (this._shopVoList === undefined) {
            this._shopVoList = [];
            for (var k in this._shopVoMap) {
                this._shopVoList.push(this._shopVoMap[k]);
            }
        }
        return this._shopVoList;
    };
    ModelSGZL.prototype.getTaskVoByTaskId = function (pTaskId) {
        return this._taskVoMap[pTaskId];
    };
    ModelSGZL.prototype.getRewardVoById = function (pId) {
        return this._rewardVoMap[pId];
    };
    ModelSGZL.prototype.getShopVoById = function (pId) {
        return this._shopVoMap[pId];
    };
    //===================================== private method =====================================
    ModelSGZL.prototype.reddotCheckAll = function () {
        var t_value1 = GGlobal.reddot.checkCondition(UIConst.ACTHB_SGZL, 1);
        var t_value2 = GGlobal.reddot.checkCondition(UIConst.ACTHB_SGZL, 2);
        var t_all = false;
        if (t_value1 || t_value2 || !this.initOpen) {
            t_all = true;
        }
        GGlobal.reddot.setCondition(UIConst.ACTHB_SGZL, 0, t_all);
        GGlobal.control.notify(UIConst.ACTHB_SGZL);
        GGlobal.reddot.notify(UIConst.ACTHB_SGZL);
    };
    ModelSGZL.prototype.reddotCheckReward = function () {
        var t_value = false;
        var t_voList = this.getRewardVoList();
        for (var _i = 0, t_voList_1 = t_voList; _i < t_voList_1.length; _i++) {
            var v = t_voList_1[_i];
            if (v.state0 == Enum_SGZL.STATE_CAN_GET || v.state1 == Enum_SGZL.STATE_CAN_GET) {
                t_value = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.ACTHB_SGZL, 1, t_value);
        this.reddotCheckAll();
    };
    ModelSGZL.prototype.reddotCheckTask = function () {
        var t_value = false;
        var t_voList = this.getTaskVoList();
        for (var _i = 0, t_voList_2 = t_voList; _i < t_voList_2.length; _i++) {
            var v = t_voList_2[_i];
            if (v.state == Enum_SGZL.STATE_CAN_GET) {
                t_value = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.ACTHB_SGZL, 2, t_value);
        this.reddotCheckAll();
    };
    ModelSGZL.prototype.reddotCheckShop = function () {
    };
    return ModelSGZL;
}(BaseModel));
__reflect(ModelSGZL.prototype, "ModelSGZL");
