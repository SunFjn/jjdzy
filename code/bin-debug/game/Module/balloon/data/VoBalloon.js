var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-10-31 21:27:41
 */
var VoBalloon = (function () {
    function VoBalloon() {
        this.itemType = 0;
        this.itemId = 0;
        this.count = 0;
        this._changeFlag = false;
    }
    //=========================================== API ==========================================
    VoBalloon.prototype.update = function (pItemType, pItemId, pCount) {
        var t = this;
        var t_change = false;
        if (t.itemType != pItemType) {
            t.itemType = pItemType;
            t_change = true;
        }
        if (t.itemId != pItemId) {
            t.itemId = pItemId;
            t_change = true;
        }
        if (t.count != pCount) {
            t.count = pCount;
            t_change = true;
        }
        if (t_change) {
            t._changeFlag = t_change;
        }
        return t_change;
    };
    Object.defineProperty(VoBalloon.prototype, "rewardItem", {
        /** 奖励物品数据 */
        get: function () {
            var t = this;
            if (t._changeFlag) {
                t._rewardItem = undefined;
                t._changeFlag = false;
            }
            if (t._rewardItem === undefined) {
                if (t.itemType == 0)
                    t._rewardItem = null;
                else
                    t._rewardItem = ConfigHelp.makeItem([t.itemType, t.itemId, t.count]);
            }
            return t._rewardItem;
        },
        enumerable: true,
        configurable: true
    });
    return VoBalloon;
}());
__reflect(VoBalloon.prototype, "VoBalloon");
