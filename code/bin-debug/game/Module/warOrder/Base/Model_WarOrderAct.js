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
var Model_WarOrderAct = (function (_super) {
    __extends(Model_WarOrderAct, _super);
    function Model_WarOrderAct() {
        var _this = _super.call(this) || this;
        _this._voWarOrder = {};
        // public actVo: Vo_Activity;
        _this._taskDayMap = {};
        _this._taskWeekMap = {};
        _this._rewardVoMap = {};
        // public initOpen = false;
        // public con0Count = 0;
        // public con1Count = 1;
        _this._setupFlag = false;
        //=========================================== API ==========================================
        _this._taskDayListQsMap = {};
        _this._typeDayListQsMap = {};
        _this._taskWeekListQsMap = {};
        _this._typeWeekListQsMap = {};
        _this._rewardVoListMap = {};
        _this._maxBuy = {};
        //最大等级
        _this._maxLv = {};
        return _this;
    }
    Model_WarOrderAct.prototype.getWarOrder = function (hdid) {
        var t = this;
        var vo = t._voWarOrder[hdid];
        if (vo == null) {
            vo = new VoWarOrder();
            t._voWarOrder[hdid] = vo;
        }
        return vo;
    };
    Model_WarOrderAct.prototype.setActVo = function (act) {
        var t = this;
        var vo = t.getWarOrder(act.id);
        vo.hAct = act;
    };
    Model_WarOrderAct.prototype.listenServ = function (mgr) {
        var self = this;
        self.socket = mgr;
        mgr.regHand(12250, self.GC12250, self);
        mgr.regHand(12252, self.GC12252, self);
        mgr.regHand(12254, self.GC12254, self);
        mgr.regHand(12256, self.GC12256, self);
        mgr.regHand(12258, self.GC12258, self);
        mgr.regHand(12260, self.GC12260, self);
        mgr.regHand(12262, self.GC12262, self);
    };
    /**打开战令界面返回*/
    Model_WarOrderAct.prototype.GC12250 = function (self, cmd) {
        var t_change = false;
        var len = cmd.readShort();
        var arr1 = [];
        for (var i = 0; i < len; i++) {
            var type = cmd.readInt();
            var size = cmd.readShort();
            var arr2 = [];
            for (var j = 0; j < size; j++) {
                var arg2 = cmd.readInt();
                var arg3 = cmd.readByte();
                arr2[j] = [arg2, arg3];
            }
            arr1[i] = [type, arr2];
        }
        var upgradeFlag = cmd.readByte();
        var levelId = cmd.readInt();
        var curExp = cmd.readInt();
        var buyNum = cmd.readInt();
        var hdId = cmd.readInt();
        var voWarO = self.getWarOrder(hdId);
        if (!voWarO.hAct) {
            return;
        }
        if (voWarO.update({ upgradeFlag: upgradeFlag, levelId: levelId, curExp: curExp, buyNum: buyNum })) {
            t_change = true;
        }
        for (var i = 0; i < arr1.length; i++) {
            var type = arr1[i][0];
            var arr2 = arr1[i][1];
            for (var j = 0; j < arr2.length; j++) {
                var arg2 = arr2[j][0];
                var arg3 = arr2[j][1];
                var t_rewardVo = self.getRewardVoById(arg2, voWarO.hAct);
                if (t_rewardVo) {
                    if (t_rewardVo.updateState(type, arg3)) {
                        t_change = true;
                    }
                }
            }
        }
        if (t_change) {
            self.reddotCheckReward(voWarO.hAct);
            GGlobal.control.notify(Enum_MsgType.WARORDERL_OPENUI, hdId);
        }
    };
    /**领取战令奖励*/
    Model_WarOrderAct.prototype.CG12251 = function (type, level, getState, sid) {
        var self = this;
        var ba = self.getBytes();
        ba.writeInt(type);
        ba.writeInt(level);
        ba.writeInt(getState);
        ba.writeInt(sid);
        self.sendSocket(12251, ba);
    };
    /**领取战令奖励返回*/
    Model_WarOrderAct.prototype.GC12252 = function (self, cmd) {
        var t_change = false;
        var t_result = cmd.readByte();
        var t_getType = cmd.readInt();
        var t_type = cmd.readInt();
        var t_levelId = cmd.readInt();
        var t_hdId = cmd.readInt();
        if (t_result == 3) {
            var voWarO = self.getWarOrder(t_hdId);
            if (t_getType == 1) {
                //一键领取
                var t_rewardList = self.getRewardVoList(voWarO.hAct);
                for (var _i = 0, t_rewardList_1 = t_rewardList; _i < t_rewardList_1.length; _i++) {
                    var v = t_rewardList_1[_i];
                    if (v.state0 == Model_WarOrderAct.STATE_CAN_GET) {
                        v.state0 = Model_WarOrderAct.SATTE_DONE;
                        t_change = true;
                    }
                    if (v.state1 == Model_WarOrderAct.STATE_CAN_GET) {
                        v.state1 = Model_WarOrderAct.SATTE_DONE;
                        t_change = true;
                    }
                }
            }
            else {
                //单独领取
                var t_vo = self.getRewardVoById(t_levelId, voWarO.hAct);
                if (t_vo && t_vo.updateState(t_type, Model_WarOrderAct.SATTE_DONE)) {
                    t_change = true;
                }
            }
            if (t_change) {
                self.reddotCheckReward(voWarO.hAct);
                GGlobal.control.notify(Enum_MsgType.WarOrder_REWARD_UPDATE);
            }
        }
    };
    /**打开周任务UI*/
    Model_WarOrderAct.prototype.CG12253 = function (sid) {
        var self = this;
        var ba = self.getBytes();
        ba.writeInt(sid);
        self.sendSocket(12253, ba);
    };
    /**打开周任务UI返回*/
    Model_WarOrderAct.prototype.GC12254 = function (self, cmd) {
        var t_change = false;
        var len = cmd.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = cmd.readInt(); //任务类型
            var arg2 = cmd.readInt(); //当前的任务类型完成计数
            var size = cmd.readShort();
            for (var j = 0; j < size; j++) {
                var arg3 = cmd.readInt(); //任务id
                var arg4 = cmd.readByte(); //任务状态 0未完成 1可领取 2已领取
                var t_vo = self.getTaskWeekByTaskId(arg3);
                if (t_vo && t_vo.update(arg2, arg4)) {
                    t_change = true;
                }
            }
        }
        var t_hdId = cmd.readInt();
        var voWarO = self.getWarOrder(t_hdId);
        if (t_change) {
            self.reddotCheckTaskWeek(voWarO.hAct);
            GGlobal.control.notify(Enum_MsgType.WarOrder_TASK_UPDATE);
        }
    };
    /**领取周任务奖励*/
    Model_WarOrderAct.prototype.CG12255 = function (type, taskId, getState, sid) {
        var self = this;
        var ba = self.getBytes();
        ba.writeInt(type);
        ba.writeInt(taskId);
        ba.writeInt(getState);
        ba.writeInt(sid);
        self.sendSocket(12255, ba);
    };
    /**领取周任务奖励返回*/
    Model_WarOrderAct.prototype.GC12256 = function (self, cmd) {
        var t_change = false;
        var t_result = cmd.readByte();
        var t_taskType = cmd.readInt();
        var t_taskId = cmd.readInt();
        var t_levelId = cmd.readInt();
        var t_curExp = cmd.readInt();
        var t_type = cmd.readInt();
        var t_hdId = cmd.readInt();
        if (t_result == 1) {
            //成功
            var t_vo = self.getTaskWeekByTaskId(t_taskId);
            if (t_vo && t_vo.state != Model_WarOrderAct.SATTE_DONE) {
                t_change = true;
            }
            if (t_type == 1) {
                t_change = true;
            }
            var voWarO = self.getWarOrder(t_hdId);
            if (voWarO.levelId != t_levelId) {
                t_change = true;
            }
            if (voWarO.curExp != t_curExp) {
                t_change = true;
            }
            if (t_change) {
                GGlobal.modelWarOrder.CG12253(t_hdId);
                self.getOpenUIData(t_hdId); //重新请求更新奖励列表数据
            }
        }
        else {
            ViewCommonWarn.text("暂无奖励可领");
        }
    };
    /**打开每日任务UI*/
    Model_WarOrderAct.prototype.CG12257 = function (sid) {
        var self = this;
        var ba = self.getBytes();
        ba.writeInt(sid);
        self.sendSocket(12257, ba);
    };
    /**打开每日任务UI返回*/
    Model_WarOrderAct.prototype.GC12258 = function (self, cmd) {
        var t_change = false;
        var len = cmd.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = cmd.readInt(); //任务类型
            var arg2 = cmd.readInt(); //当前的任务类型完成计数
            var size = cmd.readShort();
            for (var j = 0; j < size; j++) {
                var arg3 = cmd.readInt(); //任务id
                var arg4 = cmd.readByte(); //任务状态 0未完成 1可领取 2已领取
                var t_vo = self.getTaskDayByTaskId(arg3);
                if (t_vo && t_vo.update(arg2, arg4)) {
                    t_change = true;
                }
            }
        }
        var t_hdId = cmd.readInt();
        var voWarO = self.getWarOrder(t_hdId);
        if (t_change) {
            self.reddotCheckTaskDay(voWarO.hAct);
            GGlobal.control.notify(Enum_MsgType.WarOrder_TASK_UPDATE);
        }
    };
    /**领取每日任务奖励*/
    Model_WarOrderAct.prototype.CG12259 = function (type, taskId, getState, sid) {
        var self = this;
        var ba = self.getBytes();
        ba.writeInt(type);
        ba.writeInt(taskId);
        ba.writeInt(getState);
        ba.writeInt(sid);
        self.sendSocket(12259, ba);
    };
    /**领取每日任务奖励返回*/
    Model_WarOrderAct.prototype.GC12260 = function (self, cmd) {
        var t_change = false;
        var t_result = cmd.readByte();
        var t_taskType = cmd.readInt();
        var t_taskId = cmd.readInt();
        var t_levelId = cmd.readInt();
        var t_curExp = cmd.readInt();
        var t_type = cmd.readInt();
        var t_hdId = cmd.readInt();
        if (t_result == 1) {
            //成功
            var t_vo = self.getTaskDayByTaskId(t_taskId);
            if (t_vo && t_vo.state != Model_WarOrderAct.SATTE_DONE) {
                t_change = true;
            }
            if (t_type == 1) {
                t_change = true;
            }
            var voWarO = self.getWarOrder(t_hdId);
            if (voWarO.levelId != t_levelId) {
                t_change = true;
            }
            if (voWarO.curExp != t_curExp) {
                t_change = true;
            }
            if (t_change) {
                GGlobal.modelWarOrder.CG12257(t_hdId);
                self.getOpenUIData(t_hdId); //重新请求更新奖励列表数据
            }
        }
        else {
            ViewCommonWarn.text("暂无奖励可领");
        }
    };
    /**购买等级*/
    Model_WarOrderAct.prototype.CG12261 = function (sid) {
        var self = this;
        var ba = self.getBytes();
        ba.writeInt(sid);
        self.sendSocket(12261, ba);
    };
    /**购买等级返回*/
    Model_WarOrderAct.prototype.GC12262 = function (self, cmd) {
        var state = cmd.readByte();
        var level = cmd.readInt();
        var buyNum = cmd.readInt();
        var hdid = cmd.readInt();
        if (state == 0) {
            var t_change = false;
            var voWarO = self.getWarOrder(hdid);
            if (voWarO.levelId != level) {
                t_change = true;
            }
            if (voWarO.buyNum != buyNum) {
                t_change = true;
            }
            if (t_change) {
                GGlobal.modelWarOrder.CG12257(hdid);
                GGlobal.modelWarOrder.CG12253(hdid);
                self.getOpenUIData(hdid); //重新请求更新奖励列表数据
            }
            ViewCommonWarn.text("购买成功，等级+1");
        }
        else {
            ViewCommonWarn.text(["已达到最大购买次数", "砖石不足"][state - 1]);
        }
    };
    Model_WarOrderAct.prototype.getOpenUIData = function (pData) {
        var cfgXT = Config.xitong_001[pData];
        if (cfgXT.or == 1) {
            GGlobal.modelActivity.CG_OPENACT(pData);
        }
        else {
            GGlobal.modelEightLock.CG4571(pData);
        }
    };
    Model_WarOrderAct.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
        {
            var t_cfg = Config.kssj1_338;
            for (var k in t_cfg) {
                var t_vo = new VoWarOrderReward();
                t_vo.id = ~~k;
                this._rewardVoMap[t_vo.id] = t_vo;
            }
        }
        {
            for (var k in Config.xslday1_338) {
                var t_vo = new VoWarOrderTask();
                t_vo.taskId = ~~k;
                t_vo.cfg = Config.xslday1_338[k];
                this._taskDayMap[t_vo.taskId] = t_vo;
            }
        }
        {
            for (var k in Config.xslweek1_338) {
                var t_vo = new VoWarOrderTask();
                t_vo.taskId = ~~k;
                t_vo.cfg = Config.xslweek1_338[k];
                this._taskWeekMap[t_vo.taskId] = t_vo;
            }
        }
    };
    Model_WarOrderAct.prototype.getTaskDayList = function (qs) {
        var t = this;
        var t_list = t._taskDayListQsMap[qs];
        if (t_list === undefined) {
            t._taskDayListQsMap[qs] = t_list = [];
            for (var k in t._taskDayMap) {
                var t_vo = t._taskDayMap[k];
                if (t_vo && t_vo.cfg.qs == qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    Model_WarOrderAct.prototype.getTypeDayListMap = function (actVo) {
        var t = this;
        var t_qs = actVo.qs;
        var t_typeVoListMap = t._typeDayListQsMap[t_qs];
        if (t_typeVoListMap === undefined) {
            t._typeDayListQsMap[t_qs] = t_typeVoListMap = {};
            var t_allList = t.getTaskDayList(t_qs);
            for (var _i = 0, t_allList_1 = t_allList; _i < t_allList_1.length; _i++) {
                var v = t_allList_1[_i];
                var t_type = v.type;
                var t_voList = t_typeVoListMap[t_type];
                if (!t_voList) {
                    t_typeVoListMap[t_type] = t_voList = [];
                }
                t_voList.push(v);
            }
        }
        return t_typeVoListMap;
    };
    Model_WarOrderAct.prototype.getTaskWeekList = function (qs) {
        var t = this;
        var t_list = t._taskWeekListQsMap[qs];
        if (t_list === undefined) {
            t._taskWeekListQsMap[qs] = t_list = [];
            for (var k in t._taskWeekMap) {
                var t_vo = t._taskWeekMap[k];
                if (t_vo && t_vo.cfg.qs == qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    Model_WarOrderAct.prototype.getTypeWeekListMap = function (actVo) {
        var t = this;
        if (!actVo)
            return;
        var t_qs = actVo.qs;
        var t_typeVoListMap = t._typeWeekListQsMap[t_qs];
        if (t_typeVoListMap === undefined) {
            t._typeWeekListQsMap[t_qs] = t_typeVoListMap = {};
            var t_allList = t.getTaskWeekList(t_qs);
            for (var _i = 0, t_allList_2 = t_allList; _i < t_allList_2.length; _i++) {
                var v = t_allList_2[_i];
                var t_type = v.type;
                var t_voList = t_typeVoListMap[t_type];
                if (!t_voList) {
                    t_typeVoListMap[t_type] = t_voList = [];
                }
                t_voList.push(v);
            }
        }
        return t_typeVoListMap;
    };
    Model_WarOrderAct.prototype.getRewardVoList = function (actVo) {
        var t = this;
        if (!actVo)
            return;
        var t_qs = actVo.qs;
        var t_list = t._rewardVoListMap[t_qs];
        if (t_list === undefined) {
            t._rewardVoListMap[t_qs] = t_list = [];
            for (var k in t._rewardVoMap) {
                var t_vo = t._rewardVoMap[k];
                if (t_vo && t_vo.cfg.lv != 0 && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    Model_WarOrderAct.prototype.getTaskDayByTaskId = function (pTaskId) {
        return this._taskDayMap[pTaskId];
    };
    Model_WarOrderAct.prototype.getTaskWeekByTaskId = function (pTaskId) {
        return this._taskWeekMap[pTaskId];
    };
    Model_WarOrderAct.prototype.getRewardVoById = function (pId, actVo) {
        var t = this;
        if (!actVo)
            return;
        var t_qs = actVo.qs;
        var t_id = t_qs * 1000 + pId;
        return t._rewardVoMap[t_id];
    };
    Model_WarOrderAct.prototype.getBuyCtMax = function (qs) {
        var t = this;
        if (!t._maxBuy[qs]) {
            t._maxBuy[qs] = 0;
            for (var key in Config.kssjbuy1_338) {
                var val = Config.kssjbuy1_338[key];
                if (val.qs == qs) {
                    t._maxBuy[qs]++;
                }
            }
        }
        return t._maxBuy[qs];
    };
    Model_WarOrderAct.prototype.getLvMax = function (qs) {
        var t = this;
        if (!t._maxLv[qs]) {
            var level = 0;
            while (true) {
                var key = qs * 1000 + level;
                if (!Config.kssj1_338[key]) {
                    t._maxLv[qs] = level - 1;
                    return level - 1;
                }
                level++;
            }
        }
        return t._maxLv[qs];
    };
    //===================================== private method =====================================
    Model_WarOrderAct.prototype.reddotCheckAll = function (actVo) {
        if (!actVo)
            return;
        var t = this;
        var groupId = actVo.groupId;
        var t_value1 = ReddotMgr.ins().getValue(groupId + "_1");
        var t_value2 = ReddotMgr.ins().getValue(groupId + "_2");
        var t_value3 = ReddotMgr.ins().getValue(groupId + "_3");
        var t_all = 0;
        if (t_value1 || t_value2 || t_value3) {
            t_all = 1;
        }
        ReddotMgr.ins().setValue(actVo.groupId + "", t_all);
        var sf = GGlobal.reddot;
        sf.setCondition(actVo.groupId, 0, t_all > 0 ? true : false);
        sf.notify(actVo.groupId, actVo.groupId);
    };
    Model_WarOrderAct.prototype.reddotCheckReward = function (actVo) {
        if (!actVo)
            return;
        var t = this;
        var t_value = 0;
        var t_voList = t.getRewardVoList(actVo);
        for (var _i = 0, t_voList_1 = t_voList; _i < t_voList_1.length; _i++) {
            var v = t_voList_1[_i];
            if (v.state0 == Model_WarOrderAct.STATE_CAN_GET || v.state1 == Model_WarOrderAct.STATE_CAN_GET) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(actVo.groupId + "_1", t_value);
        t.reddotCheckAll(actVo);
    };
    Model_WarOrderAct.prototype.reddotCheckTaskDay = function (actVo) {
        if (!actVo)
            return;
        var t = this;
        var t_value = 0;
        var t_voList = t.getTaskDayList(actVo.qs);
        for (var _i = 0, t_voList_2 = t_voList; _i < t_voList_2.length; _i++) {
            var v = t_voList_2[_i];
            if (v.state == Model_WarOrderAct.STATE_CAN_GET) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(actVo.groupId + "_2", t_value);
        t.reddotCheckAll(actVo);
    };
    Model_WarOrderAct.prototype.reddotCheckTaskWeek = function (actVo) {
        if (!actVo)
            return;
        var t = this;
        var t_value = 0;
        var t_voList = t.getTaskWeekList(actVo.qs);
        for (var _i = 0, t_voList_3 = t_voList; _i < t_voList_3.length; _i++) {
            var v = t_voList_3[_i];
            if (v.state == Model_WarOrderAct.STATE_CAN_GET) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(actVo.groupId + "_3", t_value);
        t.reddotCheckAll(actVo);
    };
    /** 状态 不可领 */
    Model_WarOrderAct.STATE_NONE = 0;
    /** 状态 可以领取 */
    Model_WarOrderAct.STATE_CAN_GET = 1;
    /** 状态 已领取 */
    Model_WarOrderAct.SATTE_DONE = 2;
    return Model_WarOrderAct;
}(BaseModel));
__reflect(Model_WarOrderAct.prototype, "Model_WarOrderAct");
