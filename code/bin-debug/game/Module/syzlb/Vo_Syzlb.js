var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Syzlb = (function () {
    function Vo_Syzlb() {
    }
    Vo_Syzlb.prototype.readMsgTeam = function (d) {
        var s = this;
        s.type = d.readByte();
        s.name = d.readUTF();
        s.pId = d.readLong();
        s.head = d.readInt();
        s.frame = d.readInt();
        s.lv = d.readInt();
        s.power = d.readLong();
    };
    Vo_Syzlb.prototype.readMsgJoin = function (d) {
        var s = this;
        s.name = d.readUTF();
        s.teamId = d.readInt();
        s.head = d.readInt();
        s.frame = d.readInt();
        s.ct = d.readByte();
        s.hard = d.readByte();
    };
    return Vo_Syzlb;
}());
__reflect(Vo_Syzlb.prototype, "Vo_Syzlb");
