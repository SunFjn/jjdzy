var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var XiLianHeadVO = (function () {
    function XiLianHeadVO() {
    }
    XiLianHeadVO.prototype.readMsg = function (data) {
        this.headId = data.readInt();
        this.country = data.readInt();
        this.vip = data.readInt();
        this.frameId = data.readInt();
    };
    return XiLianHeadVO;
}());
__reflect(XiLianHeadVO.prototype, "XiLianHeadVO");
