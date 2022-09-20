var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoRebirthLH = (function () {
    function VoRebirthLH() {
    }
    VoRebirthLH.prototype.readMsg = function (data) {
        this.pos = data.readByte();
        this.lv = data.readInt();
        this.exp = data.readInt();
    };
    return VoRebirthLH;
}());
__reflect(VoRebirthLH.prototype, "VoRebirthLH");
