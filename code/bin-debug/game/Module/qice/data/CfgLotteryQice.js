var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 出谋划策配置
 * @author: lujiahao
 * @date: 2019-10-25 10:11:08
 */
var CfgLotteryQice = (function () {
    function CfgLotteryQice() {
    }
    Object.defineProperty(CfgLotteryQice.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.cmhc_761[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgLotteryQice.prototype, "consume1", {
        get: function () {
            if (this._consume1 === undefined) {
                this._consume1 = ConfigHelp.makeItemListArr(this.cfg.cj1)[0];
            }
            return this._consume1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgLotteryQice.prototype, "consume10", {
        get: function () {
            if (this._consume10 === undefined) {
                this._consume10 = ConfigHelp.makeItemListArr(this.cfg.cj2)[0];
            }
            return this._consume10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgLotteryQice.prototype, "consumeItem1", {
        get: function () {
            if (this._consumeItem1 === undefined) {
                this._consumeItem1 = ConfigHelp.makeItemListArr(this.cfg.dj1)[0];
            }
            return this._consumeItem1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgLotteryQice.prototype, "consumeItem10", {
        get: function () {
            if (this._consumeItem10 === undefined) {
                this._consumeItem10 = ConfigHelp.makeItemListArr(this.cfg.dj2)[0];
            }
            return this._consumeItem10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgLotteryQice.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.zs);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 检查抽奖道具是否足够（非元宝）
     * @param pType 1抽一次 2抽10次
     */
    CfgLotteryQice.prototype.checkItemEnough = function (pType) {
        var t = this;
        if (pType == 1) {
            //抽一次
            return FastAPI.checkItemEnough(t.consumeItem1.id, t.consumeItem1.count, false);
        }
        else {
            //抽10次
            return FastAPI.checkItemEnough(t.consumeItem10.id, t.consumeItem10.count, false);
        }
    };
    return CfgLotteryQice;
}());
__reflect(CfgLotteryQice.prototype, "CfgLotteryQice");
