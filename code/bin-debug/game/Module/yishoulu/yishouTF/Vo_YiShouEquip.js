var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_YiShouEquip = (function () {
    function Vo_YiShouEquip() {
        this.jie = 0;
        this.level = 0;
        this.color = 1;
    }
    Vo_YiShouEquip.prototype.initLib = function (id) {
        var self = this;
        self.cfg = Config.ystfzb_752[id];
        self.setColor(1000);
        self.setLevel(10000);
    };
    Vo_YiShouEquip.prototype.setLevel = function (value) {
        var self = this;
        self.level = value;
        self.levelcfg = Config.ystfsj_752[value];
    };
    Vo_YiShouEquip.prototype.setColor = function (value) {
        var self = this;
        self.color = value;
        self.colorcfg = Config.ystfsp_752[value];
    };
    Vo_YiShouEquip.create = function (id) {
        var vo = new Vo_YiShouEquip();
        vo.initLib(id);
        return vo;
    };
    return Vo_YiShouEquip;
}());
__reflect(Vo_YiShouEquip.prototype, "Vo_YiShouEquip");
