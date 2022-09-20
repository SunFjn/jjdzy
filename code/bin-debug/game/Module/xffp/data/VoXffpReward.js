var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 奖池物品数据结构
 * @author: lujiahao
 * @date: 2019-09-07 14:32:22
 */
var VoXffpReward = (function () {
    function VoXffpReward() {
        /** 状态  0未领取 1已领取 */
        this.state = 0;
        /** 翻牌位置 */
        this.index = -1;
    }
    Object.defineProperty(VoXffpReward.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.xhdxffpxfb_318[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoXffpReward.prototype.update = function (pIndex, pState) {
        var t_change = false;
        if (pState != this.state) {
            this.state = pState;
            t_change = true;
        }
        if (pState == 0) {
            //如果状态是未领取，则index强制重置为-1
            pIndex = -1;
        }
        if (pIndex != this.index) {
            this.index = pIndex;
            t_change = true;
        }
        return t_change;
    };
    Object.defineProperty(VoXffpReward.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.show);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoXffpReward.prototype, "ybValue", {
        /** 当前阶段所需元宝值 */
        get: function () {
            if (this._ybValue === undefined) {
                this._ybValue = ~~(JSON.parse(this.cfg.yb)[0][2]);
            }
            return this._ybValue;
        },
        enumerable: true,
        configurable: true
    });
    return VoXffpReward;
}());
__reflect(VoXffpReward.prototype, "VoXffpReward");
