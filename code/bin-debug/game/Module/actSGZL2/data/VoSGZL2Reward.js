var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 三国战令奖励数据结构
 * @author: lujiahao
 * @date: 2019-09-19 16:06:03
 */
var VoSGZL2Reward = (function () {
    function VoSGZL2Reward() {
        /** 普通状态 */
        this.state0 = 0;
        /** 升级状态 */
        this.state1 = 1;
    }
    Object.defineProperty(VoSGZL2Reward.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.sgzljl_332[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoSGZL2Reward.prototype.updateState = function (pType, pState) {
        var t_change = false;
        switch (pType) {
            case 0:
                if (pState != this.state0) {
                    this.state0 = pState;
                    t_change = true;
                }
                break;
            case 1:
                if (pState != this.state1) {
                    this.state1 = pState;
                    t_change = true;
                }
                break;
        }
        return t_change;
    };
    Object.defineProperty(VoSGZL2Reward.prototype, "rewardList0", {
        get: function () {
            if (this._rewardList0 === undefined)
                try {
                    this._rewardList0 = ConfigHelp.makeItemListArr(this.cfg.putong);
                }
                catch (error) {
                    this._rewardList0 = [];
                }
            return this._rewardList0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSGZL2Reward.prototype, "rewardList1", {
        get: function () {
            if (this._rewardList1 === undefined)
                try {
                    this._rewardList1 = ConfigHelp.makeItemListArr(this.cfg.jinjie);
                }
                catch (error) {
                    this._rewardList1 = [];
                }
            return this._rewardList1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSGZL2Reward.prototype, "sortValue", {
        /** 排序权值 */
        get: function () {
            var t_value = 0;
            if (this.state0 == Enum_SGZL.STATE_CAN_GET || this.state1 == Enum_SGZL.STATE_CAN_GET) {
                t_value += 100;
            }
            else if (this.state0 == Enum_SGZL.STATE_NONE && this.state1 == Enum_SGZL.STATE_NONE) {
                t_value += 10;
            }
            else {
            }
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    return VoSGZL2Reward;
}());
__reflect(VoSGZL2Reward.prototype, "VoSGZL2Reward");
