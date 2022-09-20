var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-10-24 20:05:32
 */
var VoTargetQice = (function () {
    function VoTargetQice() {
        /** 剩余可领奖次数 -1已领取 0未达条件 >0可领奖次数 */
        this.remain = 0;
    }
    Object.defineProperty(VoTargetQice.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.cmhcmb_761[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoTargetQice.prototype.update = function (pRemain) {
        var t_change = false;
        if (this.remain != pRemain) {
            this.remain = pRemain;
            t_change = true;
        }
        return t_change;
    };
    Object.defineProperty(VoTargetQice.prototype, "state", {
        /** 状态 0未达条件 1可领取 2已领取 */
        get: function () {
            if (this.remain > 0)
                return 1;
            else if (this.remain == 0)
                return 0;
            else
                return 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoTargetQice.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.gj);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoTargetQice;
}());
__reflect(VoTargetQice.prototype, "VoTargetQice");
