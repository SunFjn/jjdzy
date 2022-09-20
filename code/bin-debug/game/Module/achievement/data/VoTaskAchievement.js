var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 成就任务数据结构
 * @author: lujiahao
 * @date: 2019-11-06 15:51:34
 */
var VoTaskAchievement = (function () {
    function VoTaskAchievement() {
        this.state = 0;
        this.count = 0;
    }
    Object.defineProperty(VoTaskAchievement.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.cj_746[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoTaskAchievement.prototype.update = function (pData) {
        var t_change = false;
        t_change = ObjectUtils.modifyObject(this, pData);
        return t_change;
    };
    Object.defineProperty(VoTaskAchievement.prototype, "isOpened", {
        get: function () {
            var t = this;
            var t_id = t.cfg.xt;
            if (t_id > 0) {
                if (ModuleManager.isOpen(t_id))
                    return true;
                else
                    return false;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoTaskAchievement.prototype, "sortValue", {
        /** 排序权值 */
        get: function () {
            var t_value = 0;
            switch (this.state) {
                case EnumAchievement.STATE_CAN_GET:
                    t_value += 100;
                    break;
                case EnumAchievement.STATE_NONE:
                    t_value += 10;
                    break;
                case EnumAchievement.SATTE_DONE:
                    break;
            }
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoTaskAchievement.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoTaskAchievement;
}());
__reflect(VoTaskAchievement.prototype, "VoTaskAchievement");
