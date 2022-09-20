var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VO_DanBiFanLi = (function () {
    function VO_DanBiFanLi() {
    }
    VO_DanBiFanLi.prototype.init = function (cfg) {
        this.cz = cfg.cz;
        this.qs = cfg.qs;
        this.reward = cfg.reward;
        this.time = cfg.time;
        this.id = cfg.id;
    };
    VO_DanBiFanLi.prototype.getSortIndex = function () {
        var ret = this.id;
        if (this.lastNum < 1 && this.count == 0) {
            ret += 1000000;
        }
        else if (this.count == 0) {
            ret -= 10000;
        }
        else if (this.count > 0) {
            ret -= 1000000;
        }
        return ret;
    };
    return VO_DanBiFanLi;
}());
__reflect(VO_DanBiFanLi.prototype, "VO_DanBiFanLi");
