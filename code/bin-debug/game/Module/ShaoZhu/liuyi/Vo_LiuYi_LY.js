var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_LiuYi_LY = (function () {
    function Vo_LiuYi_LY() {
    }
    Vo_LiuYi_LY.prototype.readMsg = function (data) {
        var s = this;
        s.lyId = data.readByte();
        s.lyLv = data.readInt();
        s.st = data.readByte();
        s.initCfg();
    };
    Vo_LiuYi_LY.prototype.initCfg = function () {
        var s = this;
        var id = s.lyId * 1000 + s.lyLv;
        s.cfg = Config.sonsix_267[id];
    };
    Vo_LiuYi_LY.prototype.initData = function (id) {
        var s = this;
        s.lyId = id;
        s.lyLv = 0;
        s.st = 0;
        s.initCfg();
    };
    return Vo_LiuYi_LY;
}());
__reflect(Vo_LiuYi_LY.prototype, "Vo_LiuYi_LY");
