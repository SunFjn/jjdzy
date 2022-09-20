var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VO_LeiChongFanLi = (function () {
    function VO_LeiChongFanLi() {
    }
    VO_LeiChongFanLi.prototype.init = function (cfg) {
        this.lj = cfg.lj;
        this.qs = cfg.qs;
        this.reward = cfg.reward;
        this.id = cfg.id;
        this.tips = cfg.tips;
    };
    VO_LeiChongFanLi.prototype.getSortIndex = function () {
        var ret = this.id;
        if (this.state == 1) {
            ret -= 10000;
        }
        else if (this.state == 2) {
            ret += 10000;
        }
        return ret;
    };
    return VO_LeiChongFanLi;
}());
__reflect(VO_LeiChongFanLi.prototype, "VO_LeiChongFanLi");
