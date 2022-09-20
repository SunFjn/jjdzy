var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoWarOrder = (function () {
    function VoWarOrder() {
        /** 是否进阶过 */
        this.upgradeFlag = 0;
        /** 战令等级id */
        this.levelId = 0;
        /** 当前战令经验 */
        this.curExp = 0;
        /** 已经购买次数 */
        this.buyNum = 0;
        //活动id
        this.hdId = 0;
    }
    VoWarOrder.prototype.update = function (pData) {
        return ObjectUtils.modifyObject(this, pData);
    };
    return VoWarOrder;
}());
__reflect(VoWarOrder.prototype, "VoWarOrder");
