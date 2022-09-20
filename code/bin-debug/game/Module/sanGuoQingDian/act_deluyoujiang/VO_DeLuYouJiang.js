var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VO_DeLuYouJiang = (function () {
    function VO_DeLuYouJiang() {
    }
    VO_DeLuYouJiang.prototype.init = function (cfg) {
        this.day = cfg.day;
        this.qs = cfg.qs;
        this.reward = cfg.reward;
        this.id = cfg.id;
    };
    VO_DeLuYouJiang.prototype.getSortIndex = function () {
        var ret = this.id;
        if (this.state == 1) {
            ret -= 10000;
        }
        else if (this.state == 2) {
            ret += 10000;
        }
        return ret;
    };
    return VO_DeLuYouJiang;
}());
__reflect(VO_DeLuYouJiang.prototype, "VO_DeLuYouJiang");
