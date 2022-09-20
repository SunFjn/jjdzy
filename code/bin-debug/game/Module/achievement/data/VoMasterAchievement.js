var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 成就大师数据结构
 * @author: lujiahao
 * @date: 2019-11-08 14:43:20
 */
var VoMasterAchievement = (function () {
    function VoMasterAchievement() {
        this.state = 0;
    }
    Object.defineProperty(VoMasterAchievement.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.cjds_746[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoMasterAchievement.prototype.update = function (pData) {
        var t_change = false;
        t_change = ObjectUtils.modifyObject(this, pData);
        return t_change;
    };
    Object.defineProperty(VoMasterAchievement.prototype, "isActive", {
        /** 是否激活 */
        get: function () {
            var t = this;
            var t_model = GGlobal.modelAchievement;
            if (t_model.level >= t.id)
                return true;
            else
                return false;
        },
        enumerable: true,
        configurable: true
    });
    /** 是否满足升级条件 */
    VoMasterAchievement.prototype.checkCanUp = function () {
        var t = this;
        var t_model = GGlobal.modelAchievement;
        return t_model.score >= t.cfg.cjd;
    };
    Object.defineProperty(VoMasterAchievement.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                try {
                    this._rewardList = ConfigHelp.makeItemListArr(this.cfg.jl);
                }
                catch (error) {
                    this._rewardList = null;
                }
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoMasterAchievement.prototype, "sortValue", {
        /** 排序权值 */
        get: function () {
            var t = this;
            var t_value = 0;
            switch (t.state) {
                case EnumAchievement.STATE_CAN_GET:
                    t_value += 10000;
                    break;
                case EnumAchievement.STATE_NONE:
                    t_value += 1000;
                    break;
                case EnumAchievement.SATTE_DONE:
                    break;
            }
            t_value -= t.id;
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    return VoMasterAchievement;
}());
__reflect(VoMasterAchievement.prototype, "VoMasterAchievement");
