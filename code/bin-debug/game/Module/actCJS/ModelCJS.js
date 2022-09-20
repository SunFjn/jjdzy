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
 * 成就树数据管理器
 * @author: lujiahao
 * @date: 2019-11-20 15:38:05
 */
var ModelCJS = (function (_super) {
    __extends(ModelCJS, _super);
    function ModelCJS() {
        var _this = _super.call(this) || this;
        _this._taskVoMap = {};
        _this._rewardVoMap = {};
        _this._maxLayerMap = {};
        /** 当前层数 */
        _this.curLayer = 1;
        _this._setupFlag = false;
        _this._taskVoListMap = {};
        _this._rewardVoListMap = {};
        return _this;
    }
    ModelCJS.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
        {
            var t_cfg = Config.cjs_769;
            for (var k in t_cfg) {
                var t_vo = new VoTaskCJS();
                t_vo.id = ~~k;
                var t_qs = t_vo.cfg.qs;
                var t_cs = t_vo.cfg.cs;
                var t_maxLayer = this._maxLayerMap[t_qs];
                if (t_maxLayer === undefined) {
                    this._maxLayerMap[t_qs] = t_cs;
                }
                else {
                    if (t_cs > t_maxLayer) {
                        this._maxLayerMap[t_qs] = t_cs;
                    }
                }
                this._taskVoMap[t_vo.id] = t_vo;
            }
        }
        {
            var t_cfg = Config.cjsjl_769;
            for (var k in t_cfg) {
                var t_vo = new VoLayerRewardCJS();
                t_vo.id = ~~k;
                this._rewardVoMap[t_vo.id] = t_vo;
            }
        }
    };
    //========================================= 协议相关 ========================================
    //协议处理
    ModelCJS.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(10570, this.GC_AchievementTree_openUI_10570, this);
        mgr.regHand(10572, this.GC_AchievementTree_openFloorUI_10572, this);
        mgr.regHand(10574, this.GC_AchievementTree_getReward_10574, this);
    };
    /**10570 [B-[I-B-L]]-I 打开界面返回 [B:任务类型[I:任务idB:任务状态 0未完成 1已完成L:对应的完成值]]任务数据sendDataI:当前成就树层数floor*/
    ModelCJS.prototype.GC_AchievementTree_openUI_10570 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readByte(); //任务类型
            var len1 = data.readShort();
            for (var i_1 = 0; i_1 < len1; i_1++) {
                var arg2 = data.readInt(); //任务id
                var arg3 = data.readByte(); //任务状态
                var arg4 = data.readLong(); //任务计数
                var t_vo = self.getTaskVoById(arg2);
                if (t_vo) {
                    var t_maxCount = t_vo.cfg.cs1;
                    arg4 = arg4 > t_maxCount ? t_maxCount : arg4;
                    if (t_vo.update({ state: arg3, count: arg4 })) {
                        t_change = true;
                    }
                }
            }
        }
        var t_qs = self.getCurQs();
        var arg5 = data.readInt(); //当前层数
        if (self.curLayer != arg5) {
            self.curLayer = arg5;
            t_change = true;
            //把之前层次的任务设置成完成
            for (var i = arg5 - 1; i >= 1; i--) {
                var t_voList = self.getTaskVoListByQsAndLayer(t_qs, i);
                for (var _i = 0, t_voList_1 = t_voList; _i < t_voList_1.length; _i++) {
                    var v = t_voList_1[_i];
                    v.update({ state: 1, count: v.cfg.cs1 });
                }
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.CJS_UPDATE);
        }
    };
    /**10572 [I-B] 打开成就树楼层奖励返回 [I:成就树楼层indexB:状态 0未领取 1可领取 2已领取]成就树层数奖励sendList*/
    ModelCJS.prototype.GC_AchievementTree_openFloorUI_10572 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readInt(); //id
            var arg2 = data.readByte(); //状态
            var t_vo = self.getRewardVoById(arg1);
            if (t_vo && t_vo.update({ state: arg2 })) {
                t_change = true;
            }
        }
        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.CJS_REWARD_UPDATE);
        }
    };
    /**10571  打开成就树楼层奖励 */
    ModelCJS.prototype.CG_AchievementTree_openFloorUI_10571 = function () {
        var bates = this.getBytes();
        this.sendSocket(10571, bates);
    };
    /**10573 I 领取奖励 I:表的idindex*/
    ModelCJS.prototype.CG_AchievementTree_getReward_10573 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(10573, bates);
    };
    /**10574 B-I 领取奖励返回 B:状态 0失败 1成功stateI:失败(1未达到要求层数 2已领取 3非法参数) 成功的时候返回表的indexindex*/
    ModelCJS.prototype.GC_AchievementTree_getReward_10574 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte(); //结果
        var arg2 = data.readInt(); //id
        switch (arg1) {
            case 1://成功
                var t_vo = self.getRewardVoById(arg2);
                if (t_vo && t_vo.update({ state: 2 })) {
                    t_change = true;
                }
                break;
            case 0://失败
                switch (arg2) {
                    case 1:
                        ViewCommonWarn.text("未达指定层数");
                        break;
                    case 2:
                        ViewCommonWarn.text("奖励已领取过了");
                        break;
                    case 3:
                        ViewCommonWarn.text("非法参数");
                        break;
                    default:
                        ViewCommonWarn.text("[ERROR]未知错误");
                        break;
                }
                break;
        }
        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.CJS_REWARD_UPDATE);
        }
    };
    //=========================================== API ==========================================
    /** 获取当前活动期数 */
    ModelCJS.prototype.getCurQs = function () {
        var t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_CJS);
        if (t_actVo)
            return t_actVo.qs;
        else
            return 1;
    };
    ModelCJS.prototype.getTaskVoById = function (pTaskId) {
        return this._taskVoMap[pTaskId];
    };
    /**
     * 通过期数和层数获取任务数据列表
     * @param pQs 期数
     * @param pLayer 层数
     */
    ModelCJS.prototype.getTaskVoListByQsAndLayer = function (pQs, pLayer) {
        var t = this;
        var t_key = pQs + "_" + pLayer;
        var t_list = t._taskVoListMap[t_key];
        if (t_list === undefined) {
            t._taskVoListMap[t_key] = t_list = [];
            for (var k in t._taskVoMap) {
                var t_vo = t._taskVoMap[k];
                if (t_vo && t_vo.cfg.qs == pQs && t_vo.cfg.cs == pLayer) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    /**
     * 通过期数获取最大层数
     * @param pQs 期数
     */
    ModelCJS.prototype.getMaxLayerByQs = function (pQs) {
        return this._maxLayerMap[pQs];
    };
    ModelCJS.prototype.getRewardVoById = function (pId) {
        return this._rewardVoMap[pId];
    };
    /**
     * 通过期数获取奖励数据列表
     * @param pQs 期数
     */
    ModelCJS.prototype.getRewardVoListByQs = function (pQs) {
        var t = this;
        var t_list = t._rewardVoListMap[pQs];
        if (t_list === undefined) {
            t._rewardVoListMap[pQs] = t_list = [];
            for (var k in t._rewardVoMap) {
                var t_vo = t._rewardVoMap[k];
                if (t_vo && t_vo.cfg.qs == pQs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    //===================================== private method =====================================
    ModelCJS.prototype.reddotCheck = function () {
        var t = this;
        var t_value = false;
        var t_qs = t.getCurQs();
        var t_voList = t.getRewardVoListByQs(t_qs);
        for (var _i = 0, t_voList_2 = t_voList; _i < t_voList_2.length; _i++) {
            var v = t_voList_2[_i];
            if (v.state == 1) {
                t_value = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.ACTCOM_CJS, 1, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    return ModelCJS;
}(BaseModel));
__reflect(ModelCJS.prototype, "ModelCJS");
