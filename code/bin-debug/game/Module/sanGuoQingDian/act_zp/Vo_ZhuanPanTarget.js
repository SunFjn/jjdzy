var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_ZhuanPanTarget = (function () {
    function Vo_ZhuanPanTarget() {
        this.state = 0;
    }
    Vo_ZhuanPanTarget.prototype.initCfg = function (value) {
        this.cfg = Config.sgzpmb_261[value];
    };
    Vo_ZhuanPanTarget.create = function (id) {
        var vo = new Vo_ZhuanPanTarget();
        vo.initCfg(id);
        return vo;
    };
    return Vo_ZhuanPanTarget;
}());
__reflect(Vo_ZhuanPanTarget.prototype, "Vo_ZhuanPanTarget");
