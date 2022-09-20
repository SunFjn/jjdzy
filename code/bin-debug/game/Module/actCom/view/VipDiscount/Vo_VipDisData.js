var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * vip折扣数据
 */
var Vo_VipDisData = (function () {
    function Vo_VipDisData() {
        /**vip等级 */
        this.vip = 0;
        /**现价 */
        this.curPrice = 0;
        /**购买次数 */
        this.buyCount = 0;
    }
    Vo_VipDisData.prototype.initDate = function (data) {
        var self = this;
        self.vip = data.readByte();
        self.curPrice = data.readInt();
        self.buyCount = data.readByte();
    };
    return Vo_VipDisData;
}());
__reflect(Vo_VipDisData.prototype, "Vo_VipDisData");
