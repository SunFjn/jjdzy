var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-10-23 20:05:49
 */
var CfgSuitQice = (function () {
    function CfgSuitQice() {
    }
    Object.defineProperty(CfgSuitQice.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.qctz_760[this.level];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgSuitQice.prototype, "isActive", {
        /** 是否激活 */
        get: function () {
            return GGlobal.modelQice.suitLv >= this.level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgSuitQice.prototype, "curCount", {
        /** 当前满足条件的数量 */
        get: function () {
            var t_dataList = GGlobal.modelQice.getVoList();
            var t_count = 0;
            for (var _i = 0, t_dataList_1 = t_dataList; _i < t_dataList_1.length; _i++) {
                var v = t_dataList_1[_i];
                if (v.star >= this.requireStar)
                    t_count++;
            }
            return t_count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgSuitQice.prototype, "requireStar", {
        get: function () {
            var t_lastCfg = GGlobal.modelQice.getCfgSuit(this.level - 1);
            if (t_lastCfg)
                return t_lastCfg.cfg.tj;
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgSuitQice.prototype, "maxCount", {
        /** 当前条件需求总数 */
        get: function () {
            return GGlobal.modelQice.getVoList().length;
        },
        enumerable: true,
        configurable: true
    });
    /** 是否满足升级条件 */
    CfgSuitQice.prototype.checkCanUp = function () {
        if (this.curCount >= this.maxCount)
            return true;
        else
            return false;
    };
    return CfgSuitQice;
}());
__reflect(CfgSuitQice.prototype, "CfgSuitQice");
