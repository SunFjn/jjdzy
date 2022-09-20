var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-12-17 17:54:39
 */
var VoBattleRewardKfwz = (function () {
    function VoBattleRewardKfwz() {
    }
    Object.defineProperty(VoBattleRewardKfwz.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.kfwztz_770[this.id];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBattleRewardKfwz.prototype, "rewardListWin", {
        get: function () {
            if (this._rewardListWin === undefined)
                this._rewardListWin = ConfigHelp.makeItemListArr(this.cfg.sljl);
            return this._rewardListWin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBattleRewardKfwz.prototype, "rewardListFail", {
        get: function () {
            if (this._rewardListFail === undefined)
                this._rewardListFail = ConfigHelp.makeItemListArr(this.cfg.sbjl);
            return this._rewardListFail;
        },
        enumerable: true,
        configurable: true
    });
    return VoBattleRewardKfwz;
}());
__reflect(VoBattleRewardKfwz.prototype, "VoBattleRewardKfwz");
