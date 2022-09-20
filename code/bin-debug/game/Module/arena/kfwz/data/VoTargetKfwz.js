var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跨服王者目标奖励数据结构
 * @author: lujiahao
 * @date: 2019-12-06 17:58:44
 */
var VoTargetKfwz = (function () {
    function VoTargetKfwz() {
        this.state = 0;
    }
    Object.defineProperty(VoTargetKfwz.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.kfwzmb_770[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoTargetKfwz.prototype.update = function (pData) {
        return ObjectUtils.modifyObject(this, pData);
    };
    Object.defineProperty(VoTargetKfwz.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.jl);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoTargetKfwz;
}());
__reflect(VoTargetKfwz.prototype, "VoTargetKfwz");
