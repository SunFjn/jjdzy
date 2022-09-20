var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_GCBZ = (function () {
    function Vo_GCBZ() {
        this.id = 0;
        this.headID = 0;
        this.frameID = 0;
        this.power = 0;
        this.times = 0;
    }
    Vo_GCBZ.create = function (value) {
        var vo = new Vo_GCBZ();
        vo.cfg = Config.gcbz_777[value];
        return vo;
    };
    return Vo_GCBZ;
}());
__reflect(Vo_GCBZ.prototype, "Vo_GCBZ");
