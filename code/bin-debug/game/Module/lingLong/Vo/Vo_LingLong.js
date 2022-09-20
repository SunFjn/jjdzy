var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_LingLong = (function () {
    function Vo_LingLong() {
        this.rankId = 0; //I:玲珑阁排名表id  区服id
    }
    Vo_LingLong.prototype.readMsgRank = function (data) {
        this.plyId = data.readLong();
        this.name = data.readUTF();
        this.point = data.readInt();
        this.rankId = data.readInt();
    };
    Vo_LingLong.prototype.readMsgLog = function (data) {
        this.name = data.readUTF();
        this.itemVo = ConfigHelp.parseItemBa(data);
    };
    Vo_LingLong.prototype.readMsgPoint = function (data) {
        this.point = data.readInt();
        this.status = data.readInt();
    };
    Vo_LingLong.prototype.readMsgRank1 = function (data) {
        this.rankId = data.readInt();
        this.point = data.readInt();
    };
    return Vo_LingLong;
}());
__reflect(Vo_LingLong.prototype, "Vo_LingLong");
