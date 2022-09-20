var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RewardBackItemVO = (function () {
    function RewardBackItemVO() {
    }
    RewardBackItemVO.prototype.init = function (cfg) {
        this.conmuse = cfg.conmuse;
        this.conmuse1 = cfg.conmuse1;
        this.fb = cfg.fb;
        this.sys = cfg.sys;
        this.xs = cfg.xs;
        this.reward = cfg.reward;
        this.id = cfg.id;
        this.name = cfg.name;
    };
    RewardBackItemVO.prototype.sortIndex = function () {
        var ret = this.id;
        if (this.state == 1) {
            ret -= 10000;
        }
        else if (this.state == 2) {
            ret += 10000;
        }
        return ret;
    };
    return RewardBackItemVO;
}());
__reflect(RewardBackItemVO.prototype, "RewardBackItemVO");
