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
 * 三国战令（动态活动）模块管理器
 * @author: lujiahao
 * @date: 2019-11-14 15:57:53
 */
var ModelSGZL2 = (function (_super) {
    __extends(ModelSGZL2, _super);
    function ModelSGZL2() {
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
        //=========================================== API ==========================================
        _this._taskVoListQsMap = {};
        _this._typeVoListQsMap = {};
        _this._rewardVoListMap = {};
        _this._shopVoListQsMap = {};
        return _this;
    }
    ModelSGZL2.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
        {
            var t_cfg = Config.sgzljl_332;
            for (var k in t_cfg) {
                var t_vo = new VoSGZL2Reward();
                t_vo.id = ~~k;
                this._rewardVoMap[t_vo.id] = t_vo;
            }
        }
        {
            var t_cfg = Config.sgzlrw_332;
            for (var k in t_cfg) {
                var t_vo = new VoSGZL2Task();
                t_vo.taskId = ~~k;
                this._taskVoMap[t_vo.taskId] = t_vo;
            }
        }
        {
            var t_cfg = Config.sgzlshop_332;
            for (var k in t_cfg) {
                var t_vo = new VoSGZL2Shop();
                t_vo.id = ~~k;
                this._shopVoMap[t_vo.id] = t_vo;
            }
        }
    };
    //========================================= 协议相关 ========================================
    ModelSGZL2.prototype.listenServ = function (mgr) {
        _super.prototype.listenServ.call(this, mgr);
        //注册GC方法
        mgr.regHand(10400, this.GC_WarOrderAct_openUI_10400, this);
        mgr.regHand(10402, this.GC_WarOrderAct_getWarOrderReward_10402, this);
        mgr.regHand(10404, this.GC_WarOrderAct_openTaskUI_10404, this);
        mgr.regHand(10406, this.GC_WarOrderAct_getReward_10406, this);
        mgr.regHand(10408, this.GC_WarOrderAct_openShopUI_10408, this);
        mgr.regHand(10410, this.GC_WarOrderAct_buy_10410, this);
    };
    /**10400 [I-[I-B]]-B-I-I 打开战令界面返回 [I:战令类型 0普通 1进阶[I:战令等级B:领取状态 0未领取 1可领取 2已领取]]战令数据sendDataB:进阶战令状态 0普通(未购买) 1进阶(已购买)buyStateI:战令等级levelI:战令经验exp*/
    ModelSGZL2.prototype.GC_WarOrderAct_openUI_10400 = function (self, data) {
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
            GGlobal.control.notify(Enum_MsgType.SGZL2_REWARD_UPDATE);
        }
    };
    /**
     * 发送领取战令奖励的请求
     * @param pGetType 领取类型 0单个领取 1一键领取
     * @param pType 战令类型 0普通 1进阶 一键领取时，该参数没意义
     * @param pId 指定的奖励id 一键领取时，该参数没意义
     */
    ModelSGZL2.prototype.cmdSendGetReward = function (pGetType, pType, pId) {
        if (pType === void 0) { pType = 0; }
        if (pId === void 0) { pId = 0; }
        /**10401 I-I-I 领取战令奖励 I:战令类型 0普通 1进阶typeI:战令等级levelI:领取方式 0普通领取 1一键领取getState*/
        var t = this;
        var bates = this.getBytes();
        bates.writeInt(pType);
        bates.writeInt(pId);
        bates.writeInt(pGetType);
        this.sendSocket(10401, bates);
    };
    /**10402 B-I-I-I 领取战令奖励返回 B:状态 0没有购买进阶战令不能领取 1该等级奖励不可领取 2没有可领取的奖励 3成功stateI:领取方式 0普通 1一键getStateI:战令类型typeI:战令等级level*/
    ModelSGZL2.prototype.GC_WarOrderAct_getWarOrderReward_10402 = function (self, data) {
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
            GGlobal.control.notify(Enum_MsgType.SGZL2_REWARD_UPDATE);
        }
    };
    /**10403  打开任务UI */
    ModelSGZL2.prototype.cmdSendRequestTaskList = function () {
        var bates = this.getBytes();
        this.sendSocket(10403, bates);
    };
    /**10404 [I-I-[I-B]] 打开任务UI返回 [I:任务类型I:该类型任务的完成度[I:任务idB:任务状态]]任务数据taskData*/
    ModelSGZL2.prototype.GC_WarOrderAct_openTaskUI_10404 = function (self, data) {
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
            GGlobal.control.notify(Enum_MsgType.SGZL2_TASK_UPDATE);
        }
    };
    /**10405 I-I 领取任务奖励 I:任务类型typeI:任务idtaskId*/
    ModelSGZL2.prototype.cmdSendGetTaskReward = function (pTaskId) {
        var t_vo = this.getTaskVoByTaskId(pTaskId);
        if (!t_vo)
            return;
        var bates = this.getBytes();
        bates.writeInt(t_vo.cfg.leixing);
        bates.writeInt(pTaskId);
        this.sendSocket(10405, bates);
    };
    /**10406 B-I-I-I-I 领取任务奖励返回 B:结果 0失败 1成功stateI:失败(1未完成任务 2已领取)，成功返回任务类型typeI:任务idtaskIdI:战令等级levelI:战令经验exp*/
    ModelSGZL2.prototype.GC_WarOrderAct_getReward_10406 = function (self, data) {
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
            GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SGZL2); //重新请求更新奖励列表数据
            GGlobal.control.notify(Enum_MsgType.SGZL2_REWARD_UPDATE);
            GGlobal.control.notify(Enum_MsgType.SGZL2_TASK_UPDATE);
        }
    };
    /**10407  打开商店页面 */
    ModelSGZL2.prototype.cmdSendRequestShop = function () {
        var bates = this.getBytes();
        this.sendSocket(10407, bates);
    };
    /**10408 [I-I]-I-I 打开商店页面 [I:配置表idI:已购买数量]商店列表shopListI:背包中的白银令prop1I:背包中的黄金令prop2*/
    ModelSGZL2.prototype.GC_WarOrderAct_openShopUI_10408 = function (self, data) {
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
            GGlobal.control.notify(Enum_MsgType.SGZL2_SHOP_UPDATE);
        }
    };
    /**10409 I 购买商品 I:配置表idid*/
    ModelSGZL2.prototype.cmdSendBuy = function (pId) {
        var t_vo = this.getShopVoById(pId);
        if (!t_vo)
            return;
        if (!t_vo.checkCanBuy())
            return;
        var bates = this.getBytes();
        bates.writeInt(pId);
        this.sendSocket(10409, bates);
    };
    /**10410 B-I 购买商品 B:状态 0商品不存在 1成功 2道具不足 3商品已卖完stateI:购买的配置表idid*/
    ModelSGZL2.prototype.GC_WarOrderAct_buy_10410 = function (self, data) {
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
            GGlobal.control.notify(Enum_MsgType.SGZL2_SHOP_UPDATE);
        }
    };
    ModelSGZL2.prototype.getTaskVoList = function () {
        var t = this;
        var t_qs = t.getCurQs();
        var t_list = t._taskVoListQsMap[t_qs];
        if (t_list === undefined) {
            t._taskVoListQsMap[t_qs] = t_list = [];
            for (var k in t._taskVoMap) {
                var t_vo = t._taskVoMap[k];
                if (t_vo && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    ModelSGZL2.prototype.getTypeVoListMap = function () {
        var t = this;
        var t_qs = t.getCurQs();
        var t_typeVoListMap = t._typeVoListQsMap[t_qs];
        if (t_typeVoListMap === undefined) {
            t._typeVoListQsMap[t_qs] = t_typeVoListMap = {};
            var t_allList = t.getTaskVoList();
            for (var _i = 0, t_allList_1 = t_allList; _i < t_allList_1.length; _i++) {
                var v = t_allList_1[_i];
                var t_type = v.cfg.leixing;
                var t_voList = t_typeVoListMap[t_type];
                if (!t_voList) {
                    t_typeVoListMap[t_type] = t_voList = [];
                }
                t_voList.push(v);
            }
        }
        return t_typeVoListMap;
    };
    ModelSGZL2.prototype.getRewardVoList = function () {
        var t = this;
        var t_qs = t.getCurQs();
        var t_list = t._rewardVoListMap[t_qs];
        if (t_list === undefined) {
            t._rewardVoListMap[t_qs] = t_list = [];
            for (var k in t._rewardVoMap) {
                var t_vo = t._rewardVoMap[k];
                if (t_vo && t_vo.cfg.dengji != 0 && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    ModelSGZL2.prototype.getShopVoList = function () {
        var t = this;
        var t_qs = t.getCurQs();
        var t_list = t._shopVoListQsMap[t_qs];
        if (t_list === undefined) {
            t._shopVoListQsMap[t_qs] = t_list = [];
            for (var k in t._shopVoMap) {
                var t_vo = t._shopVoMap[k];
                if (t_vo && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    ModelSGZL2.prototype.getTaskVoByTaskId = function (pTaskId) {
        return this._taskVoMap[pTaskId];
    };
    ModelSGZL2.prototype.getRewardVoById = function (pId) {
        var t_qs = this.getCurQs();
        var t_id = t_qs * 1000 + pId + 1;
        return this._rewardVoMap[t_id];
    };
    ModelSGZL2.prototype.getShopVoById = function (pId) {
        return this._shopVoMap[pId];
    };
    /** 获取当前活动期数 */
    ModelSGZL2.prototype.getCurQs = function () {
        var t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SGZL2);
        if (t_actVo)
            return t_actVo.qs;
        else
            return 1;
    };
    //===================================== private method =====================================
    ModelSGZL2.prototype.reddotCheckAll = function () {
        var t_value1 = GGlobal.reddot.checkCondition(UIConst.ACTCOM_SGZL2, 1);
        var t_value2 = GGlobal.reddot.checkCondition(UIConst.ACTCOM_SGZL2, 2);
        var t_all = false;
        if (t_value1 || t_value2 || !this.initOpen) {
            t_all = true;
        }
        GGlobal.reddot.setCondition(UIConst.ACTCOM_SGZL2, 0, t_all);
        GGlobal.control.notify(UIConst.ACTCOM_SGZL2);
        GGlobal.reddot.notify(UIConst.ACTCOM_SGZL2);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    ModelSGZL2.prototype.reddotCheckReward = function () {
        var t_value = false;
        var t_voList = this.getRewardVoList();
        for (var _i = 0, t_voList_1 = t_voList; _i < t_voList_1.length; _i++) {
            var v = t_voList_1[_i];
            if (v.state0 == Enum_SGZL.STATE_CAN_GET || v.state1 == Enum_SGZL.STATE_CAN_GET) {
                t_value = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.ACTCOM_SGZL2, 1, t_value);
        this.reddotCheckAll();
    };
    ModelSGZL2.prototype.reddotCheckTask = function () {
        var t_value = false;
        var t_voList = this.getTaskVoList();
        for (var _i = 0, t_voList_2 = t_voList; _i < t_voList_2.length; _i++) {
            var v = t_voList_2[_i];
            if (v.state == Enum_SGZL.STATE_CAN_GET) {
                t_value = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.ACTCOM_SGZL2, 2, t_value);
        this.reddotCheckAll();
    };
    ModelSGZL2.prototype.reddotCheckShop = function () {
    };
    return ModelSGZL2;
}(BaseModel));
__reflect(ModelSGZL2.prototype, "ModelSGZL2");
