var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_YiBao = (function () {
    function Vo_YiBao() {
        /**	名字** */
        this.name = "";
        /**	属性** */
        this.attArr = [];
        /**	升星属性** */
        this.starAttArr = [];
        /**	激活（升星）道具* */
        this.costArr = [];
        /**效果 */
        this.xgArr = [];
        /**升星效果 */
        this.starxgArr = [];
        /**星级 */
        this.starLv = 0;
        /**0可激活 1激活2未激活 */
        this.state = 0;
    }
    Vo_YiBao.prototype.initcfg = function (id) {
        var self = this;
        self.id = id;
        var cfg = Config.yb_217[id];
        self.name = cfg.name;
        self.icon = cfg.icon;
        self.imageID = cfg.pic;
        self.quality = cfg.pin;
        self.attArr = JSON.parse(cfg.attr1);
        self.starAttArr = JSON.parse(cfg.starattr1);
        self.power = cfg.power;
        self.starPower = cfg.starpower;
        self.costArr = JSON.parse(cfg.item);
        self.drugMax = cfg.max;
        self.starMax = cfg.star;
        self.way = cfg.way;
        self.xgArr = JSON.parse(cfg.xg);
        self.starxgArr = JSON.parse(cfg.starxg);
        self.cfg = cfg;
    };
    Vo_YiBao.create = function (id) {
        var vo = new Vo_YiBao();
        vo.initcfg(id);
        return vo;
    };
    return Vo_YiBao;
}());
__reflect(Vo_YiBao.prototype, "Vo_YiBao");
