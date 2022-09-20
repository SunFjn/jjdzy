var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_JinShengTask = (function () {
    function Vo_JinShengTask() {
    }
    Vo_JinShengTask.prototype.initcfg = function (id) {
        var self = this;
        self.id = id;
        var cfg = Config.uptask_231[id];
        self.next = cfg.next;
        self.open = cfg.open;
        self.type = cfg.type;
        self.can1 = cfg.can1;
        self.can2 = cfg.can2;
        self.exp = cfg.exp;
        self.yb = cfg.yb;
        self.tips = cfg.tips;
        self.ui = cfg.ui;
        self.kfDay = cfg.time;
    };
    Vo_JinShengTask.create = function (id) {
        var vo = new Vo_JinShengTask();
        vo.initcfg(id);
        return vo;
    };
    return Vo_JinShengTask;
}());
__reflect(Vo_JinShengTask.prototype, "Vo_JinShengTask");
