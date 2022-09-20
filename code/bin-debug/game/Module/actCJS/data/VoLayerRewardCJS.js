var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-11-21 11:12:14
 */
var VoLayerRewardCJS = (function () {
    function VoLayerRewardCJS() {
        /** 状态 0未领取 1可领取 2已领取 */
        this.state = 0;
    }
    Object.defineProperty(VoLayerRewardCJS.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.cjsjl_769[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoLayerRewardCJS.prototype.update = function (pData) {
        var t_change = false;
        if (ObjectUtils.modifyObject(this, pData)) {
            t_change = true;
        }
        return t_change;
    };
    Object.defineProperty(VoLayerRewardCJS.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.jl);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoLayerRewardCJS.prototype, "sortValue", {
        get: function () {
            var t = this;
            var t_value = 0;
            switch (t.state) {
                case 0:
                    t_value += 500;
                    break;
                case 1:
                    t_value += 1000;
                    break;
                case 2:
                    break;
            }
            t_value -= t.cfg.cs;
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    return VoLayerRewardCJS;
}());
__reflect(VoLayerRewardCJS.prototype, "VoLayerRewardCJS");
