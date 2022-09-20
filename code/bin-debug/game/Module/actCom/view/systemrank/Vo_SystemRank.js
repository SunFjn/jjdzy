var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_SystemRank = (function () {
    function Vo_SystemRank() {
    }
    Vo_SystemRank.prototype.readMsg = function (data) {
        var self = this;
        self.rank = data.readInt();
        self.name = data.readUTF();
        self.count = data.readInt();
    };
    Vo_SystemRank.prototype.readHeadMsg = function (data) {
        var self = this;
        self.headId = data.readInt();
        self.frameId = data.readInt();
        self.country = data.readInt();
        self.vip = data.readInt();
    };
    return Vo_SystemRank;
}());
__reflect(Vo_SystemRank.prototype, "Vo_SystemRank");
