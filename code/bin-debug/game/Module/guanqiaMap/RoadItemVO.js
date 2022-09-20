var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoadItemVO = (function () {
    function RoadItemVO() {
    }
    RoadItemVO.prototype.init = function (cfg) {
        this.mingcheng = cfg.mingcheng;
        this.jiangli = cfg.jiangli;
        this.guanqia = cfg.guanqia;
        this.tupian = cfg.tupian;
        this.ditu = cfg.ditu;
        this.ID = cfg.ID;
    };
    return RoadItemVO;
}());
__reflect(RoadItemVO.prototype, "RoadItemVO", ["Idgq_205"]);
