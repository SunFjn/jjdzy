var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_LiuChuQS = (function () {
    function Vo_LiuChuQS() {
    }
    Vo_LiuChuQS.prototype.readMsg = function (b) {
        this.type = b.readByte();
        this.name = b.readUTF();
        this.plyId = b.readLong();
        this.head = b.readInt();
        this.frame = b.readInt();
        this.lv = b.readInt();
        this.power = b.readLong();
    };
    return Vo_LiuChuQS;
}());
__reflect(Vo_LiuChuQS.prototype, "Vo_LiuChuQS");
