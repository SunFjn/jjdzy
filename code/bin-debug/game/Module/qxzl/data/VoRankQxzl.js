var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-10-08 20:52:11
 */
var VoRankQxzl = (function () {
    function VoRankQxzl() {
    }
    Object.defineProperty(VoRankQxzl.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.qxzlrank_273[this.id];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoRankQxzl.prototype, "type", {
        get: function () {
            if (this._type === undefined) {
                this._type = ~~(this.id / 100);
            }
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoRankQxzl.prototype, "rank", {
        get: function () {
            if (this._rank === undefined) {
                this._rank = this.id % 100;
            }
            return this._rank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoRankQxzl.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoRankQxzl;
}());
__reflect(VoRankQxzl.prototype, "VoRankQxzl");
