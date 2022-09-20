var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 限定武将活跃奖励
 * @author: lujiahao
 * @date: 2019-09-12 14:51:50
 */
var VoXiandingReward = (function () {
    function VoXiandingReward() {
        this.state = 0;
    }
    Object.defineProperty(VoXiandingReward.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.xdwjhy_757[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoXiandingReward.prototype.update = function (pState) {
        var t_change = false;
        if (pState != this.state) {
            this.state = pState;
            t_change = true;
        }
        return t_change;
    };
    Object.defineProperty(VoXiandingReward.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoXiandingReward;
}());
__reflect(VoXiandingReward.prototype, "VoXiandingReward");
