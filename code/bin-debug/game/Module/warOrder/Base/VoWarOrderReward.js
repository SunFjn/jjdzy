var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 三国战令奖励数据结构
 * @author: lujiahao
 * @date: 2019-09-19 16:06:03
 */
var VoWarOrderReward = (function () {
    function VoWarOrderReward() {
        /** 普通状态 */
        this.state0 = 0;
        /** 升级状态 */
        this.state1 = 1;
    }
    Object.defineProperty(VoWarOrderReward.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.kssj1_338[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoWarOrderReward.prototype.updateState = function (pType, pState) {
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
    Object.defineProperty(VoWarOrderReward.prototype, "rewardList0", {
        get: function () {
            if (this._rewardList0 === undefined)
                try {
                    this._rewardList0 = ConfigHelp.makeItemListArr(this.cfg.reward);
                }
                catch (error) {
                    this._rewardList0 = [];
                }
            return this._rewardList0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoWarOrderReward.prototype, "rewardList1", {
        get: function () {
            if (this._rewardList1 === undefined)
                try {
                    this._rewardList1 = ConfigHelp.makeItemListArr(this.cfg.reward1);
                }
                catch (error) {
                    this._rewardList1 = [];
                }
            return this._rewardList1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoWarOrderReward.prototype, "sortValue", {
        /** 排序权值 */
        get: function () {
            var t_value = 0;
            if (this.state0 == Model_WarOrderAct.STATE_CAN_GET || this.state1 == Model_WarOrderAct.STATE_CAN_GET) {
                t_value += 100;
            }
            else if (this.state0 == Model_WarOrderAct.STATE_NONE && this.state1 == Model_WarOrderAct.STATE_NONE) {
                t_value += 10;
            }
            else {
            }
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    return VoWarOrderReward;
}());
__reflect(VoWarOrderReward.prototype, "VoWarOrderReward");
