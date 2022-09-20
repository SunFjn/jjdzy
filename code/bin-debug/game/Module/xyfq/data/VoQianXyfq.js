var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 福签数据结构
 * @author: lujiahao
 * @date: 2020-04-09 10:32:10
 */
var VoQianXyfq = (function () {
    function VoQianXyfq() {
        this._tempRewardId = 0;
    }
    Object.defineProperty(VoQianXyfq.prototype, "posId", {
        //=========================================== API ==========================================
        /** 位置id */
        get: function () {
            return this.id % 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQianXyfq.prototype, "count", {
        /** 背包中的数量 */
        get: function () {
            return FastAPI.getItemCount(this.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQianXyfq.prototype, "rewardCfg", {
        /** 奖励配置 */
        get: function () {
            var t = this;
            return Config.xyfq_508[t.rewardId];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQianXyfq.prototype, "rewardId", {
        /** 奖励id */
        get: function () {
            var t = this;
            var t_model = GGlobal.modelXyfq;
            var t_qs = t_model.curQs;
            var t_rewardId = t_qs * 10 + t.posId;
            return t_rewardId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQianXyfq.prototype, "rewardList", {
        get: function () {
            var t = this;
            var t_rewardId = t.rewardId;
            if (t._tempRewardId != t_rewardId) {
                t._tempRewardId = t_rewardId;
                t._rewardList = undefined;
            }
            if (t._rewardList === undefined)
                t._rewardList = ConfigHelp.makeItemListArr(t.rewardCfg.show);
            return t._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQianXyfq.prototype, "compCfg", {
        /** 合成配置 */
        get: function () {
            return Config.xyfqhc_508[this.id];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQianXyfq.prototype, "needQainItem", {
        /** 合成所需的签数据 */
        get: function () {
            var t = this;
            var t_compCfg = t.compCfg;
            if (t_compCfg) {
                if (t._needQainItem === undefined) {
                    var t_list = ConfigHelp.makeItemListArr(t_compCfg.q);
                    t._needQainItem = t_list[0];
                }
            }
            return t._needQainItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQianXyfq.prototype, "compConsume", {
        /** 合成所需消耗 */
        get: function () {
            var t = this;
            var t_compCfg = t.compCfg;
            if (t_compCfg) {
                if (t._compConsume === undefined) {
                    var t_list = ConfigHelp.makeItemListArr(t_compCfg.consume);
                    t._compConsume = t_list[0];
                }
            }
            return t._compConsume;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否可开启福签
     * @param pShowAlert
     */
    VoQianXyfq.prototype.checkCanOpen = function (pShowAlert) {
        var t = this;
        if (t.count <= 0) {
            if (pShowAlert) {
                ViewCommonWarn.text("福签不足");
            }
            return false;
        }
        return true;
    };
    /**
     * 是否可合成
     * @param pShowAlert
     */
    VoQianXyfq.prototype.checkCanComp = function (pShowAlert, pCount) {
        if (pCount === void 0) { pCount = 1; }
        var t = this;
        if (!t.compCfg) {
            if (pShowAlert)
                ViewCommonWarn.text("该福签不能被合成");
            return false;
        }
        var t_needQian = t.needQainItem;
        if (!FastAPI.checkItemEnough(t_needQian.id, t_needQian.count * pCount, pShowAlert))
            return false;
        var t_needConsume = t.compConsume;
        if (!FastAPI.checkItemEnough(t_needConsume.id, t_needConsume.count * pCount, pShowAlert))
            return false;
        return true;
    };
    return VoQianXyfq;
}());
__reflect(VoQianXyfq.prototype, "VoQianXyfq");
