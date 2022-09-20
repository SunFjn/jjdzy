var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var QiYuanRankVO = (function () {
    function QiYuanRankVO() {
    }
    QiYuanRankVO.prototype.readMsg = function (data) {
        this.name = data.readUTF();
        this.jdCount = data.readInt();
    };
    return QiYuanRankVO;
}());
__reflect(QiYuanRankVO.prototype, "QiYuanRankVO");
