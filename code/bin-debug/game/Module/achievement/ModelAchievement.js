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
 * 成就数据管理器
 * @author: lujiahao
 * @date: 2019-11-06 14:37:22
 */
var ModelAchievement = (function (_super) {
    __extends(ModelAchievement, _super);
    function ModelAchievement() {
        var _this = _super.call(this) || this;
        _this._taskVoMap = {};
        _this._masterVoMap = {};
        _this._taskVoChainMap = {};
        _this._typeChainMap = {};
        /** 成就等级 */
        _this.level = 0;
        /** 成就点数 */
        _this.score = 0;
        _this._setupFlag = false;
        return _this;
    }
    ModelAchievement.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
        {
            var t_cfg = Config.cj_746;
            for (var k in t_cfg) {
                var t_id = ~~k;
                var t_vo = this._taskVoMap[t_id];
                if (!t_vo) {
                    var t_tempId = t_id;
                    do {
                        t_vo = new VoTaskAchievement();
                        t_vo.id = t_tempId;
                        this._taskVoMap[t_tempId] = t_vo;
                        var t_chainId = ~~(t_tempId / 1000);
                        var t_list = this._taskVoChainMap[t_chainId];
                        if (!t_list) {
                            this._taskVoChainMap[t_chainId] = t_list = [];
                            var t_type = t_vo.cfg.cjfl;
                            var t_typeList = this._typeChainMap[t_type];
                            if (!t_typeList) {
                                this._typeChainMap[t_type] = t_typeList = [];
                            }
                            t_typeList.push(t_list);
                        }
                        t_list.push(t_vo);
                        t_tempId = t_vo.cfg.next;
                    } while (t_tempId);
                }
            }
        }
        {
            var t_cfg = Config.cjds_746;
            for (var k in t_cfg) {
                var t_id = ~~k;
                var t_vo = new VoMasterAchievement();
                t_vo.id = t_id;
                this._masterVoMap[t_id] = t_vo;
            }
        }
    };
    //========================================= 协议相关 ========================================
    //协议处理
    ModelAchievement.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(10322, this.GC_Achievement_openUI_10322, this);
        mgr.regHand(10324, this.GC_Achievement_getReward_10324, this);
        mgr.regHand(10326, this.GC_Achievement_openGoalUI_10326, this);
        mgr.regHand(10328, this.GC_Achievement_getGoalReward_10328, this);
        mgr.regHand(10330, this.GC_Achievement_upAchievement_10330, this);
    };
    /**10321  打开界面 */
    ModelAchievement.prototype.CG_Achievement_openUI_10321 = function () {
        var bates = this.getBytes();
        this.sendSocket(10321, bates);
    };
    /**10322 [B-[I-B-L]]-I-I 打开界面返回 [B:任务类型[I:任务idB:任务状态0未完成 1可领取 2已领取L:对应的完成值]]任务数据sendDataI:成就点数goalPointI:成就阶数goalJie*/
    ModelAchievement.prototype.GC_Achievement_openUI_10322 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readByte(); //任务类型
            var len1 = data.readShort();
            for (var i_1 = 0; i_1 < len1; i_1++) {
                var arg2 = data.readInt(); //任务id
                var arg3 = data.readByte(); //任务状态 0 1 2
                var arg4 = data.readLong(); //任务计数
                var t_vo = self.getTaskVoById(arg2);
                if (t_vo && t_vo.update({ state: arg3, count: arg4 })) {
                    t_change = true;
                }
            }
        }
        var arg5 = data.readInt(); //成就点数
        var arg6 = data.readInt(); //成就等级
        if (self.score != arg5) {
            self.score = arg5;
            t_change = true;
        }
        if (self.level != arg6) {
            self.level = arg6;
            t_change = true;
        }
        //这里要把后端的红点灭掉
        ReddotMgr.ins().setValue(UIConst.ACHIEVEMENT + "|" + 1, 0);
        console.log("======== 10322 前端灭掉后端红点");
        if (t_change) {
            self.reddotCheckTask();
            self.reddotCheckLevel();
            GGlobal.control.notify(Enum_MsgType.ACHIEVEMENT_UPDATE);
        }
    };
    /**10323 B-I-B 领取成就任务奖励 B:任务类型typeI:任务idtaskIdB:领取方式 0领取单个 1一键领取getType*/
    ModelAchievement.prototype.CG_Achievement_getReward_10323 = function (pOneKey, pId) {
        var t = this;
        var t_type = 0;
        if (!pOneKey) {
            var t_vo = t.getTaskVoById(pId);
            if (!t_vo)
                return;
            t_type = t_vo.cfg.rwfl;
        }
        var bates = this.getBytes();
        bates.writeByte(t_type);
        bates.writeInt(pId);
        bates.writeByte(pOneKey);
        this.sendSocket(10323, bates);
    };
    /**10324 B-B-I-I-I-I 领取成就任务奖励返回 B:状态0失败 1成功stateB:失败(1未完成任务 2已领取 3没有可领取奖励) 成功的时候返回任务类型typeI:任务idtaskIdI:领取方式getTypeI:成就点goalPointI:成就阶数goalJie*/
    ModelAchievement.prototype.GC_Achievement_getReward_10324 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte(); //结果
        var arg2 = data.readByte(); //任务类型
        var arg3 = data.readInt(); //任务id
        var arg4 = data.readInt(); //获取方式
        var arg5 = data.readInt(); //成就点
        var arg6 = data.readInt(); //成就等级
        switch (arg1) {
            case 1://成功
                if (arg4 == 1) {
                    //全部获取
                    //重新获取一次全部更新协议
                    self.CG_Achievement_openUI_10321();
                }
                else {
                    //单个领取
                    var t_vo = self.getTaskVoById(arg3);
                    if (t_vo && t_vo.update({ state: EnumAchievement.SATTE_DONE })) {
                        t_change = true;
                    }
                    if (self.score != arg5) {
                        self.score = arg5;
                        t_change = true;
                    }
                    if (self.level != arg6) {
                        self.level = arg6;
                        t_change = true;
                    }
                }
                break;
            case 0://失败
                //1未完成任务 2已领取 3没有可领取奖励
                switch (arg2) {
                    case 1:
                        ViewCommonWarn.text("尚未完成任务");
                        break;
                    case 2:
                        ViewCommonWarn.text("已经领取过了");
                        break;
                    case 3:
                        ViewCommonWarn.text("没有可领取的奖励");
                        break;
                    default:
                        ViewCommonWarn.text("未知错误");
                        break;
                }
                break;
        }
        if (t_change) {
            self.reddotCheckTask();
            self.reddotCheckLevel();
            GGlobal.control.notify(Enum_MsgType.ACHIEVEMENT_UPDATE);
        }
    };
    /**10325  打开成就奖励 */
    ModelAchievement.prototype.CG_Achievement_openGoalUI_10325 = function () {
        var bates = this.getBytes();
        this.sendSocket(10325, bates);
    };
    /**10326 [I-B] 打开成就奖励返回 [I:成就奖励表序号B:状态 0不可领取 1可领取 2已领取]成就奖励列表sendList*/
    ModelAchievement.prototype.GC_Achievement_openGoalUI_10326 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readInt();
            var arg2 = data.readByte();
            var t_vo = self.getMasterVoById(arg1);
            if (t_vo && t_vo.update({ state: arg2 })) {
                t_change = true;
            }
        }
        if (t_change) {
            self.reddotCheckReward();
            GGlobal.control.notify(Enum_MsgType.ACHIEVEMENT_REWARD_UPDATE);
        }
    };
    /**10327 I 领取成就奖励 I:成就奖励表的序号indexindex*/
    ModelAchievement.prototype.CG_Achievement_getGoalReward_10327 = function (pId) {
        var t = this;
        var t_vo = t.getMasterVoById(pId);
        if (!t_vo)
            return;
        var bates = this.getBytes();
        bates.writeInt(pId);
        this.sendSocket(10327, bates);
    };
    /**10328 B-I 领取成就奖励返回 B:状态0失败 1成功stateI:失败(1未达到阶数 2已领取 3非法参数)  成功的时候返回表的序号indexindex*/
    ModelAchievement.prototype.GC_Achievement_getGoalReward_10328 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte(); //结果
        var arg2 = data.readInt();
        switch (arg1) {
            case 1:
                var t_vo = self.getMasterVoById(arg2);
                if (t_vo && t_vo.update({ state: EnumAchievement.SATTE_DONE })) {
                    t_change = true;
                }
                break;
            case 0:
                switch (arg2) {
                    case 1:
                        ViewCommonWarn.text("未达到阶数");
                        break;
                    case 2:
                        ViewCommonWarn.text("已领取过了");
                        break;
                    case 3:
                        ViewCommonWarn.text("非法参数");
                        break;
                    default:
                        ViewCommonWarn.text("未知错误");
                        break;
                }
                break;
        }
        if (t_change) {
            self.reddotCheckReward();
            GGlobal.control.notify(Enum_MsgType.ACHIEVEMENT_REWARD_UPDATE);
        }
    };
    /**10329  成就大师升阶 */
    ModelAchievement.prototype.CG_Achievement_upAchievement_10329 = function () {
        var t = this;
        if (!t.checkMasterCanUp(true))
            return;
        var bates = this.getBytes();
        this.sendSocket(10329, bates);
    };
    /**10330 B-I 成就大师升阶返回 B:状态0失败 1成功stateI:失败(1成就大师已达到最高阶 2成就点不足够升阶) 成功的时候返回升阶后的阶数goalJie*/
    ModelAchievement.prototype.GC_Achievement_upAchievement_10330 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte(); //结果
        var arg2 = data.readInt();
        switch (arg1) {
            case 1:
                if (self.level != arg2) {
                    self.level = arg2;
                    t_change = true;
                }
                break;
            case 0:
                switch (arg2) {
                    case 1:
                        ViewCommonWarn.text("已达到最高阶");
                        break;
                    case 2:
                        ViewCommonWarn.text("成就点不足");
                        break;
                    default:
                        ViewCommonWarn.text("未知错误");
                        break;
                }
                break;
        }
        if (t_change) {
            self.reddotCheckLevel();
            GGlobal.control.notify(Enum_MsgType.ACHIEVEMENT_UPDATE);
            //升级成功了需要重新拉去奖励的协议
            self.CG_Achievement_openGoalUI_10325();
        }
    };
    //=========================================== API ==========================================
    ModelAchievement.prototype.getTaskVoById = function (pId) {
        return this._taskVoMap[pId];
    };
    ModelAchievement.prototype.getTaskChainListByType = function (pType) {
        return this._typeChainMap[pType];
    };
    ModelAchievement.prototype.getTaskTypeList = function () {
        if (this._typeList === undefined) {
            this._typeList = [];
            for (var k in this._typeChainMap) {
                this._typeList.push(~~k);
            }
        }
        return this._typeList;
    };
    ModelAchievement.prototype.getMasterVoById = function (pId) {
        return this._masterVoMap[pId];
    };
    ModelAchievement.prototype.getMasterVoList = function () {
        var t = this;
        if (t._masterList === undefined) {
            t._masterList = [];
            for (var k in t._masterVoMap) {
                t._masterList.push(t._masterVoMap[k]);
            }
        }
        return t._masterList;
    };
    Object.defineProperty(ModelAchievement.prototype, "curMasterVo", {
        /** 当前大师等级数据 */
        get: function () {
            var t = this;
            var t_vo = t.getMasterVoById(t.level);
            return t_vo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelAchievement.prototype, "nextMasterVo", {
        /** 下阶大师等级数据 */
        get: function () {
            var t = this;
            var t_vo = t.getMasterVoById(t.level + 1);
            return t_vo;
        },
        enumerable: true,
        configurable: true
    });
    /** 检查是否可升阶 */
    ModelAchievement.prototype.checkMasterCanUp = function (pShowAlert) {
        var t_result = false;
        var t = this;
        do {
            var t_nextVo = t.nextMasterVo;
            if (!t_nextVo) {
                pShowAlert && ViewCommonWarn.text("已达到最高阶");
                continue;
            }
            if (!t_nextVo.checkCanUp()) {
                pShowAlert && ViewCommonWarn.text("\u9700\u8981\u6210\u5C31\u70B9\u8FBE\u5230" + t_nextVo.cfg.cjd);
                continue;
            }
            t_result = true;
        } while (false);
        return t_result;
    };
    //===================================== private method =====================================
    ModelAchievement.prototype.reddotCheckTask = function () {
        var t = this;
        var t_value = 0;
        for (var k in t._taskVoMap) {
            var t_vo = t._taskVoMap[k];
            if (t_vo.isOpened && t_vo.state == EnumAchievement.STATE_CAN_GET) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(ReddotEnum.VALUE_ACHIEVEMENT_TASK, t_value);
    };
    ModelAchievement.prototype.reddotCheckLevel = function () {
        var t = this;
        var t_value = 0;
        if (t.checkMasterCanUp(false))
            t_value = 1;
        ReddotMgr.ins().setValue(ReddotEnum.VALUE_ACHIEVEMENT_LEVEL, t_value);
    };
    ModelAchievement.prototype.reddotCheckReward = function () {
        var t = this;
        var t_value = 0;
        var t_list = t.getMasterVoList();
        for (var _i = 0, t_list_1 = t_list; _i < t_list_1.length; _i++) {
            var v = t_list_1[_i];
            if (v.state == EnumAchievement.STATE_CAN_GET) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(ReddotEnum.VALUE_ACHIEVEMENT_REWARD, t_value);
    };
    return ModelAchievement;
}(BaseModel));
__reflect(ModelAchievement.prototype, "ModelAchievement");
