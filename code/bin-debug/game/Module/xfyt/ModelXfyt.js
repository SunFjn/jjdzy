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
 * 消费摇骰管理器
 * @author: lujiahao
 * @date: 2019-10-30 10:07:45
 */
var ModelXfyt = (function (_super) {
    __extends(ModelXfyt, _super);
    function ModelXfyt() {
        var _this = _super.call(this) || this;
        _this._cfgRollMap = {};
        /** 是否播放动画 */
        _this.isPlayMc = true;
        /** 当前消费额 */
        _this.curChangeValue = 0;
        /** 当前期数 */
        _this.curQs = 1;
        /** 剩余摇骰次数 */
        _this.remain = 0;
        /** 已经摇过的次数 */
        _this.rolledCount = 0;
        /** 移动步数（用于成功后做动画步数） */
        _this.step = 0;
        /** 走过的总步数，用于计算当前圈数 */
        _this.totolStep = 0;
        _this.info = new VoRollXfyt();
        _this._setupFlag = false;
        _this.resultList = [];
        return _this;
    }
    ModelXfyt.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
    };
    //========================================= 协议相关 ========================================
    //协议处理
    ModelXfyt.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(10020, this.GC_RollDice_openUI_10020, this);
        mgr.regHand(10022, this.GC_RollDice_rolldice_10022, this);
    };
    /**10020 I-I-I-I-B-I 打开消费摇骰界面返回 I:格子IdidI:剩余摇骰次数numI:当前消费元宝yuanbaoI:期数 qsB:显示骰子点数 diceNumI:总步数totalNum*/
    ModelXfyt.prototype.GC_RollDice_openUI_10020 = function (self, data) {
        var t_change = false;
        var arg1 = data.readInt(); //格子id
        var arg2 = data.readInt(); //剩余次数
        var arg3 = data.readInt(); //当前消费额度
        var arg4 = data.readInt(); //期数
        var arg5 = data.readByte(); //上次点数
        var arg6 = data.readInt(); //走过的总步数
        if (self.info.update(arg1)) {
            t_change = true;
        }
        if (self.remain != arg2) {
            self.remain = arg2;
            t_change = true;
        }
        if (self.curChangeValue != arg3) {
            self.curChangeValue = arg3;
            t_change = true;
        }
        if (self.curQs != arg4) {
            self.curQs = arg4;
            t_change = true;
        }
        if (self.step != arg5) {
            self.step = arg5;
            t_change = true;
        }
        if (self.totolStep != arg6) {
            self.totolStep = arg6;
            t_change = true;
        }
        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.XFYT_UPDATE);
        }
    };
    /**10021  摇骰 */
    ModelXfyt.prototype.CG_RollDice_rolldice_10021 = function () {
        var t = this;
        var t_limit = t.rollTimesLimit;
        var t_hasTimes = t.hadRollCount;
        if (t_hasTimes >= t_limit) {
            ViewCommonWarn.text("\u5DF2\u8FBE\u5230\u6447\u9AB0\u6B21\u6570\u4E0A\u9650\uFF0C\u4E0A\u9650\u4E3A" + t_limit + "\u6B21");
            return;
        }
        if (t.remain <= 0) {
            ViewCommonWarn.text("摇骰次数不足");
            return;
        }
        var bates = this.getBytes();
        this.sendSocket(10021, bates);
    };
    /**10022 B-I-B-I 摇骰返回 B:状态：1.成功 2.背包已满 3.剩余次数不足stateI:格子id idB:骰子点数diceNumI:剩余次数num*/
    ModelXfyt.prototype.GC_RollDice_rolldice_10022 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte(); //结果
        var arg2 = data.readInt(); //格子id
        var arg3 = data.readByte(); //摇出点数（移动步数）
        var arg4 = data.readInt(); //剩余次数
        var arg5 = data.readInt(); //已摇次数
        var arg6 = data.readInt(); //走过的总步数
        switch (arg1) {
            case 1:
                if (self.info.update(arg2)) {
                    self.remain = arg4;
                    self.step = arg3;
                    self.totolStep = arg6;
                    self.rolledCount = arg5;
                    t_change = true;
                    //计算得到的奖励列表
                    self.resultList.length = 0;
                    var t_stepCount = 0;
                    var t_curId = self.info.lastId;
                    while (t_stepCount < self.step) {
                        var t_curCfg = self.getCfgRoll(t_curId);
                        var t_nextCfg = self.getCfgRoll(t_curCfg.cfg.next);
                        if (t_nextCfg.rewardItem)
                            self.resultList.push(t_nextCfg.rewardItem);
                        t_stepCount++;
                        t_curId = t_curCfg.cfg.next;
                    }
                }
                break;
            case 2:
                ViewCommonWarn.text("背包已满");
                break;
            case 3:
                break;
        }
        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.XFYT_ROLL_SUCCESS);
        }
    };
    //=========================================== API ==========================================
    /** 获取摇骰配置 */
    ModelXfyt.prototype.getCfgRoll = function (pId) {
        var t = this;
        var t_vo = t._cfgRollMap[pId];
        if (t_vo === undefined) {
            if (Config.xfyt_763[pId]) {
                t_vo = new CfgRollXfyt();
                t_vo.id = pId;
                t._cfgRollMap[pId] = t_vo;
            }
            else
                t._cfgRollMap[pId] = null;
        }
        return t_vo;
    };
    Object.defineProperty(ModelXfyt.prototype, "maxChargeValue", {
        /** 获取当前期数获取次数所需的元宝消耗数 */
        get: function () {
            var t = this;
            var t_cfg = Config.xfytsx_763[t.curQs];
            if (t_cfg) {
                return t_cfg.xf;
            }
            else
                return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelXfyt.prototype, "rollTimesLimit", {
        /** 获取当前期数摇骰次数上限 */
        get: function () {
            var t = this;
            var t_cfg = Config.xfytsx_763[t.curQs];
            if (t_cfg) {
                return t_cfg.cs;
            }
            else
                return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelXfyt.prototype, "canRollTimes", {
        /** 根据消费额计算出的可摇骰次数 */
        get: function () {
            var t = this;
            var t_curValue = t.curChangeValue;
            var t_perCount = t.maxChargeValue;
            var t_hasTimes = ~~(t_curValue / t_perCount);
            return Math.min(t_hasTimes, t.rollTimesLimit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelXfyt.prototype, "hadRollCount", {
        /** 已经摇骰的次数 */
        get: function () {
            var t = this;
            return t.canRollTimes - t.remain;
        },
        enumerable: true,
        configurable: true
    });
    /** 获取当前期数和圈数的配置数据列表 */
    ModelXfyt.prototype.getCurCfgRollList = function () {
        var t = this;
        var t_round = t.info.round;
        var t_qs = t.curQs;
        var t_list = [];
        for (var i = 0; i < EnumXfyt.POS_COUNT; i++) {
            var t_pos = i + 1;
            var t_id = t_qs * 1000 + t_round * 100 + t_pos;
            var t_cfg = t.getCfgRoll(t_id);
            t_list.push(t_cfg);
        }
        return t_list;
    };
    //===================================== private method =====================================
    ModelXfyt.prototype.reddotCheck = function () {
        var t = this;
        var t_value = t.remain > 0;
        GGlobal.reddot.setCondition(UIConst.ACTCOM_XFYT, 0, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    return ModelXfyt;
}(BaseModel));
__reflect(ModelXfyt.prototype, "ModelXfyt");
