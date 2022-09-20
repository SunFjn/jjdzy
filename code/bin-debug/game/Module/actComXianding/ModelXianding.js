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
 * 限定武将模块管理
 * @author: lujiahao
 * @date: 2019-09-12 11:28:31
 */
var ModelXianding = (function (_super) {
    __extends(ModelXianding, _super);
    function ModelXianding() {
        var _this = _super.call(this) || this;
        _this._voMap = {};
        _this._rewardVoMap = {};
        _this._groupTypeVoListMap = {};
        /** 活跃度积分 */
        _this.curScore = 0;
        /** 活跃度最大值 */
        _this.maxScore = 0;
        _this._groupTypeList = [
            Enum_Xianding.GROUP_DAIY,
            Enum_Xianding.GROUP_ACT,
            Enum_Xianding.GROUP_HELP,
            Enum_Xianding.GROUP_CONSUME,
        ];
        _this._qsRewardListMap = {};
        return _this;
    }
    ModelXianding.prototype.setup = function () {
        var t_cfg = Config.xdwj_757;
        for (var k in t_cfg) {
            var t_vo = new VoXiandingTask();
            t_vo.id = ~~k;
            this._voMap[t_vo.id] = t_vo;
        }
        var t_rewardCfg = Config.xdwjhy_757;
        for (var k in t_rewardCfg) {
            var t_rewardVo = new VoXiandingReward();
            t_rewardVo.id = ~~k;
            this._rewardVoMap[t_rewardVo.id] = t_rewardVo;
            this.maxScore = t_rewardVo.cfg.hy > this.maxScore ? t_rewardVo.cfg.hy : this.maxScore;
        }
    };
    //========================================= 协议相关 ========================================
    ModelXianding.prototype.listenServ = function (m) {
        _super.prototype.listenServ.call(this, m);
        m.regHand(8720, this.GC_WuJiangGoal_openUI_8720, this);
        m.regHand(8722, this.GC_WuJiangGoal_getReward_8722, this);
        m.regHand(8724, this.GC_WuJiangGoal_getActReward_8724, this);
    };
    /**8720 [I-[B-I-[I-B]]]-I-[I-B] 打开界面返回 [I:任务组[B:任务类型I:当前类型完成值[I:任务id(该值和任务状态为空时代表玩家没达到开启条件)B:任务状态0不可领 1可领取 2已领取]任务领取数据]任务类型完成数据]任务分组数据rwzTaskDataI:活跃度ActivityNum[I:宝箱idB:宝箱领取状态0未领取 1可领取 2已领取]宝箱数据rewardboxs*/
    ModelXianding.prototype.GC_WuJiangGoal_openUI_8720 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readInt(); //任务组类型
            var len1 = data.readShort();
            for (var i_1 = 0; i_1 < len1; i_1++) {
                var arg2 = data.readByte(); //任务类型
                var arg3 = data.readInt(); //当前的任务类型完成计数
                var len2_1 = data.readShort();
                for (var i_2 = 0; i_2 < len2_1; i_2++) {
                    var arg4 = data.readInt(); //任务id
                    var arg5 = data.readByte(); //任务状态 0:未完成 1:可领取 2：已领取
                    var t_vo = self.getTaskVoById(arg4);
                    if (t_vo && t_vo.update(true, arg3, arg5)) {
                        t_change = true;
                    }
                }
            }
        }
        var arg6 = data.readInt(); //活跃度
        if (self.curScore != arg6) {
            self.curScore = arg6;
            t_change = true;
        }
        var len2 = data.readShort();
        for (var i = 0; i < len2; i++) {
            var arg7 = data.readInt(); //宝箱id
            var arg8 = data.readByte(); //宝箱状态 0不可领 1可领 2已领
            var t_rewardVo = self.getRewardVoById(arg7);
            if (t_rewardVo && t_rewardVo.update(arg8)) {
                t_change = true;
            }
        }
        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.XIANDING_UPDATE);
        }
    };
    /**
     * 8721 B-I 领取任务奖励
     * @param pTaskId 任务idtaskId
     */
    ModelXianding.prototype.cmdSendGetTaskReward = function (pTaskId) {
        var t_vo = this.getTaskVoById(pTaskId);
        if (!t_vo)
            return;
        var bates = this.getBytes();
        bates.writeByte(t_vo.cfg.rwlx);
        bates.writeInt(pTaskId);
        this.sendSocket(8721, bates);
    };
    /**8722 B-B-I-I 领取奖励返回 B:结果0成功 1失败stateB:失败(1没完成任务 2已领取) 成功：任务类型typeI:任务idtaskIdI:活跃度ActivityNum*/
    ModelXianding.prototype.GC_WuJiangGoal_getReward_8722 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte(); //结果 0失败 1成功
        var arg2 = data.readByte();
        var arg3 = data.readInt(); //任务id
        var arg4 = data.readInt(); //活跃度总值
        if (arg1 == 1) {
            var t_vo = self.getTaskVoById(arg3);
            if (t_vo) {
                if (t_vo.state != Enum_Xianding.TASK_STATE_DONE) {
                    t_vo.state = Enum_Xianding.TASK_STATE_DONE;
                    t_change = true;
                }
            }
            if (self.curScore != arg4) {
                self.curScore = arg4;
                t_change = true;
                var t_rewardVoList = self.getRewardVoListByQs(self.getCurQs());
                for (var _i = 0, t_rewardVoList_1 = t_rewardVoList; _i < t_rewardVoList_1.length; _i++) {
                    var v = t_rewardVoList_1[_i];
                    if (v.state == Enum_Xianding.TASK_STATE_DONE)
                        continue;
                    if (self.curScore >= v.cfg.hy) {
                        if (v.update(Enum_Xianding.TASK_STATE_CAN_GET))
                            t_change = true;
                    }
                    else {
                        if (v.update(Enum_Xianding.TASK_STATE_NONE))
                            t_change = true;
                    }
                }
            }
        }
        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.XIANDING_UPDATE);
        }
    };
    /**8723 B 领取活跃宝箱奖励 B:对应期数的宝箱id(区分期数)boxid*/
    ModelXianding.prototype.cmdSendGetScoreReward = function (pBoxId) {
        var t_rewardVo = this.getRewardVoById(pBoxId);
        if (t_rewardVo && t_rewardVo.state == Enum_Xianding.TASK_STATE_CAN_GET) {
            var bates = this.getBytes();
            bates.writeByte(pBoxId);
            this.sendSocket(8723, bates);
        }
    };
    /**8724 B-B-B 领取活跃宝箱奖励返回 B:状态0失败 1成功stateB:宝箱idboxidB:状态0未领取 1可领取 2已领取boxState*/
    ModelXianding.prototype.GC_WuJiangGoal_getActReward_8724 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        var arg2 = data.readByte();
        var arg3 = data.readByte();
        if (arg1 == 1) {
            var t_vo = self.getRewardVoById(arg2);
            if (t_vo && t_vo.update(arg3)) {
                t_change = true;
            }
        }
        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.XIANDING_REWARD_UPDATE);
        }
    };
    //=========================================== API ==========================================
    /**
     * 通过任务组类型获取任务数据列表
     * @param pGroupType 任务组类型
     */
    ModelXianding.prototype.getTaskVoListByGroupType = function (pGroupType) {
        var t_voList = this._groupTypeVoListMap[pGroupType];
        if (!t_voList) {
            this._groupTypeVoListMap[pGroupType] = t_voList = [];
            for (var k in this._voMap) {
                var t_vo = this._voMap[k];
                if (t_vo.cfg.rwz == pGroupType) {
                    t_voList.push(t_vo);
                }
            }
        }
        return t_voList;
    };
    /** 获取当前期数 */
    ModelXianding.prototype.getCurQs = function () {
        var t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_XIANDING);
        if (t_actVo)
            return t_actVo.qs;
        else
            return 1;
    };
    ModelXianding.prototype.getTaskVoById = function (pId) {
        return this._voMap[pId];
    };
    ModelXianding.prototype.getRewardVoById = function (pId) {
        return this._rewardVoMap[pId];
    };
    ModelXianding.prototype.getRewardVoListByQs = function (pQs) {
        var t_list = this._qsRewardListMap[pQs];
        if (t_list === undefined) {
            this._qsRewardListMap[pQs] = t_list = [];
            for (var k in this._rewardVoMap) {
                var t_vo = this._rewardVoMap[k];
                if (t_vo.cfg.qs == pQs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    /** 红点检查 */
    ModelXianding.prototype.reddotCheck = function () {
        var t_allRed = false; //总红点
        //标签页红点
        for (var _i = 0, _a = this._groupTypeList; _i < _a.length; _i++) {
            var v = _a[_i];
            var t_value = false;
            var t_taskVoList = this.getTaskVoListByGroupType(v);
            for (var _b = 0, t_taskVoList_1 = t_taskVoList; _b < t_taskVoList_1.length; _b++) {
                var t_vo = t_taskVoList_1[_b];
                if (t_vo.isOpen && t_vo.state == Enum_Xianding.TASK_STATE_CAN_GET) {
                    t_value = true;
                    break;
                }
            }
            if (t_value)
                t_allRed = true;
            GGlobal.reddot.setCondition(UIConst.ACTCOM_XIANDING, v, t_value);
        }
        //活跃度红点
        var t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_XIANDING);
        if (t_actVo && t_actVo.status == 1) {
            var t_value = false;
            var t_rewardVoList = this.getRewardVoListByQs(t_actVo.qs);
            for (var _c = 0, t_rewardVoList_2 = t_rewardVoList; _c < t_rewardVoList_2.length; _c++) {
                var v = t_rewardVoList_2[_c];
                if (v.state == Enum_Xianding.TASK_STATE_CAN_GET) {
                    t_value = true;
                    break;
                }
            }
            if (t_value)
                t_allRed = true;
            GGlobal.reddot.setCondition(UIConst.ACTCOM_XIANDING, 99, t_value);
        }
        GGlobal.reddot.setCondition(UIConst.ACTCOM_XIANDING, 0, t_allRed);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    return ModelXianding;
}(BaseModel));
__reflect(ModelXianding.prototype, "ModelXianding");
