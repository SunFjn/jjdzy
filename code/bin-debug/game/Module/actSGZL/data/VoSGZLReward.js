var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 三国战令奖励数据结构
 * @author: lujiahao
 * @date: 2019-09-19 16:06:03
 */
var VoSGZLReward = (function () {
    function VoSGZLReward() {
        /** 普通状态 */
        this.state0 = 0;
        /** 升级状态 */
        this.state1 = 1;
    }
    Object.defineProperty(VoSGZLReward.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.sgzljl_017[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoSGZLReward.prototype.updateState = function (pType, pState) {
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
    Object.defineProperty(VoSGZLReward.prototype, "rewardList0", {
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
    Object.defineProperty(VoSGZLReward.prototype, "rewardList1", {
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
    Object.defineProperty(VoSGZLReward.prototype, "sortValue", {
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
    return VoSGZLReward;
}());
__reflect(VoSGZLReward.prototype, "VoSGZLReward");
