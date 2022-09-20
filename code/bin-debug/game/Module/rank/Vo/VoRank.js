var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoRank = (function () {
    function VoRank() {
    }
    VoRank.prototype.readMsg = function (data) {
        var self = this;
        self.rank = data.readInt();
        self.plyId = data.readLong();
        self.name = data.readUTF();
        self.job = data.readInt();
        self.godWeapon = data.readInt();
        self.level = data.readInt();
        self.lunhui = data.readInt();
        self.vip = data.readInt();
        self.guanxian = data.readInt();
        self.country = data.readInt();
        self.showCoun = data.readByte();
        self.power = data.readLong();
        self.params = data.readInt();
        self.headId = data.readInt();
        self.frameId = data.readInt();
        self.titleId = data.readInt();
        self.totPower = data.readLong();
        self.horseId = data.readInt();
    };
    return VoRank;
}());
__reflect(VoRank.prototype, "VoRank");
