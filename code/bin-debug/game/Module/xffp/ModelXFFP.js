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
 * 消费翻牌模块管理
 * @author: lujiahao
 * @date: 2019-09-07 11:56:17
 */
var ModelXFFP = (function (_super) {
    __extends(ModelXFFP, _super);
    function ModelXFFP() {
        var _this = _super.call(this) || this;
        /** 奖池奖励物品列表map key：期数 value：奖励物品列表  */
        _this._rewardVoListMap = {};
        _this._rewardVoMap = {};
        /** 当前消费额 */
        _this.curChargeValue = 0;
        /** 已翻牌次数 */
        _this.fpCount = 0;
        /** 当前期数 */
        _this.curQs = 1;
        /** 当前进度id 进度为0则为超过最大进度 */
        _this.curPbId = 0;
        return _this;
    }
    ModelXFFP.prototype.setup = function () {
        var t_cfg = Config.xhdxffpxfb_318;
        for (var k in t_cfg) {
            var t_rewardVo = new VoXffpReward();
            t_rewardVo.id = ~~k;
            var t_rewardList = this._rewardVoListMap[t_rewardVo.cfg.qs];
            if (!t_rewardList) {
                this._rewardVoListMap[t_rewardVo.cfg.qs] = t_rewardList = [];
            }
            else {
                var t_lastVo = t_rewardList[t_rewardList.length - 1];
                t_rewardVo.lastVo = t_lastVo;
                t_lastVo.nextVo = t_rewardVo;
            }
            t_rewardList.push(t_rewardVo);
            this._rewardVoMap[t_rewardVo.id] = t_rewardVo;
        }
        this.updateCurPbId();
    };
    //========================================= 协议相关 ========================================
    ModelXFFP.prototype.listenServ = function (m) {
        _super.prototype.listenServ.call(this, m);
        //注册GC方法
        m.regHand(8600, this.GC_ConsumeTurnCardAct_openUI_8600, this);
        m.regHand(8602, this.GC_ConsumeTurnCardAct_turn_8602, this);
    };
    /**8600 I-I-I-[I-I-B] 打开界面返回 I:消费元宝数量numI:期数qsI:已翻牌次数times[I:消费翻牌消费表idI:位置，从0开始B:状态（0未抽中 1已抽中）]翻牌列表turntableList*/
    ModelXFFP.prototype.GC_ConsumeTurnCardAct_openUI_8600 = function (self, data) {
        var t_change = false;
        var arg1 = data.readInt();
        if (arg1 != self.curChargeValue) {
            self.curChargeValue = arg1;
            t_change = true;
            self.updateCurPbId();
        }
        var arg2 = data.readInt();
        if (arg2 != self.curQs) {
            self.curQs = arg2;
            t_change = true;
            self.updateCurPbId();
        }
        var arg3 = data.readInt();
        if (arg3 != self.fpCount) {
            self.fpCount = arg3;
            t_change = true;
        }
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg4 = data.readInt();
            var arg5 = data.readInt();
            var arg6 = data.readByte();
            var t_vo = self.getRewardVoById(arg4);
            if (t_vo) {
                if (t_vo.update(arg5, arg6)) {
                    t_change = true;
                }
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.XFFP_UPDATE);
        }
        self.reddotCheck();
    };
    /**8601 I 翻牌 I:位置，从0开始index*/
    ModelXFFP.prototype.cmdSendFlopCard = function (pIndex) {
        if (!TimeUitl.cool("ModelXFFP.cmdSendFlopCard", 500))
            return;
        var t_remain = this.remainFpCount;
        if (t_remain < 1) {
            ViewCommonWarn.text("剩余翻牌次数不足");
            return;
        }
        var t_voList = this.getRewardVoListByQs(this.curQs);
        if (!t_voList)
            return;
        for (var _i = 0, t_voList_1 = t_voList; _i < t_voList_1.length; _i++) {
            var v = t_voList_1[_i];
            if (v.index > -1 && v.index == pIndex) {
                //防止翻牌位置重复的判断
                return;
            }
        }
        var bates = this.getBytes();
        bates.writeInt(pIndex);
        this.sendSocket(8601, bates);
    };
    /**8602 B-I-I 翻牌返回 B:状态：1：成功，2：抽奖次数不足stateI:抽取的档次，为消费翻牌消费表ididI:位置，从0开始index*/
    ModelXFFP.prototype.GC_ConsumeTurnCardAct_turn_8602 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        var t_id = data.readInt();
        var t_index = data.readInt();
        if (arg1 == 1) {
            //成功
            var t_vo = self.getRewardVoById(t_id);
            if (t_vo) {
                if (t_vo.update(t_index, 1)) {
                    t_change = true;
                }
            }
            self.fpCount += 1; //更新翻牌次数
            self.reddotCheck();
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.XFFP_FLOP_SUCCESS, { id: t_id });
        }
    };
    //=========================================== API ==========================================
    ModelXFFP.prototype.getRewardVoById = function (pId) {
        return this._rewardVoMap[pId];
    };
    /**
     * 通过期数获取奖池物品列表
     * @param pQs 期数
     */
    ModelXFFP.prototype.getRewardVoListByQs = function (pQs) {
        return this._rewardVoListMap[pQs];
    };
    Object.defineProperty(ModelXFFP.prototype, "actVo", {
        get: function () {
            var t_actVo = GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.XFFP);
            return t_actVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelXFFP.prototype, "remainFpCount", {
        /** 剩余可翻牌次数 */
        get: function () {
            var t_remain = 0;
            var t_max = this.curMaxFpCount;
            t_remain = t_max - this.fpCount;
            t_remain = t_remain < 0 ? 0 : t_remain;
            return t_remain;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelXFFP.prototype, "curMaxFpCount", {
        /** 当前翻牌次数最大值 */
        get: function () {
            var t_max = 0;
            var t_curPbVo = this.getRewardVoById(this.curPbId);
            if (t_curPbVo) {
                var t_lastVo = t_curPbVo.lastVo;
                if (t_lastVo) {
                    t_max = t_lastVo.cfg.times;
                }
            }
            else {
                //满进度则取当前期数的最后一个数据的times
                var t_list = this.getRewardVoListByQs(this.curQs);
                t_max = t_list[t_list.length - 1].cfg.times;
            }
            return t_max;
        },
        enumerable: true,
        configurable: true
    });
    /** 更新当前的进度id */
    ModelXFFP.prototype.updateCurPbId = function () {
        var t_voList = this.getRewardVoListByQs(this.curQs);
        var t_curValue = this.curChargeValue;
        var t_curPbId = 0;
        if (t_voList) {
            for (var i = 0; i < t_voList.length; i++) {
                var t_vo = t_voList[i];
                if (t_curValue < t_vo.ybValue) {
                    t_curPbId = t_vo.id;
                    break;
                }
            }
        }
        this.curPbId = t_curPbId;
    };
    //===================================== private method =====================================
    ModelXFFP.prototype.reddotCheck = function () {
        var t_remain = this.remainFpCount;
        var t_value = t_remain > 0;
        GGlobal.reddot.setCondition(UIConst.XFFP, 0, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    return ModelXFFP;
}(BaseModel));
__reflect(ModelXFFP.prototype, "ModelXFFP");
