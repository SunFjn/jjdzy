var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var QiYuanHeadVO = (function () {
    function QiYuanHeadVO() {
    }
    QiYuanHeadVO.prototype.readMsg = function (data) {
        this.headId = data.readInt();
        this.frameId = data.readInt();
        this.country = data.readInt();
        this.vip = data.readInt();
    };
    return QiYuanHeadVO;
}());
__reflect(QiYuanHeadVO.prototype, "QiYuanHeadVO");
