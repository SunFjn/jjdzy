var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_DengFengZJ = (function () {
    function Vo_DengFengZJ() {
    }
    Vo_DengFengZJ.prototype.readMsg = function (data) {
        var s = this;
        s.readMsgRp(data);
        s.st = data.readByte();
    };
    Vo_DengFengZJ.prototype.readMsgRp = function (data) {
        var s = this;
        s.rank = data.readInt();
        s.plyId = data.readLong();
        s.name = data.readUTF();
        s.power = data.readLong();
        s.fashion = data.readInt();
        s.weakean = data.readInt();
        s.horse = data.readInt();
        s.st = 0;
    };
    Vo_DengFengZJ.prototype.readMsgPre = function (data) {
        var s = this;
        s.plyId = data.readLong();
        s.name = data.readUTF();
        s.power = data.readLong();
        s.head = data.readInt();
        s.frame = data.readInt();
    };
    return Vo_DengFengZJ;
}());
__reflect(Vo_DengFengZJ.prototype, "Vo_DengFengZJ");
