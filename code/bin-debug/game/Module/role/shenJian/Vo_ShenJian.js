var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_ShenJian = (function () {
    function Vo_ShenJian() {
        /**	名字** */
        this.name = "";
        /**	属性** */
        this.attArr = [];
        /**	升星属性** */
        this.starAttArr = [];
        /**	激活（升星）道具* */
        this.costArr = [];
        /**星级 */
        this.starLv = 0;
        /**0已装备1可激活 2激活3未激活 */
        this.state = 0;
    }
    Vo_ShenJian.prototype.initcfg = function (id) {
        var self = this;
        self.id = id;
        var cfg = Config.sword_216[id];
        self.name = cfg.name;
        self.icon = cfg.icon;
        self.imageID = cfg.pic;
        self.quality = cfg.pin;
        self.attArr = JSON.parse(cfg.attr);
        self.starAttArr = JSON.parse(cfg.starattr);
        self.power = cfg.power;
        self.starPower = cfg.starpower;
        self.costArr = JSON.parse(cfg.item);
        self.drugMax = cfg.max;
        self.starMax = cfg.star;
        self.way = cfg.way;
        self.miaoshu = cfg.miaoshu;
        self.cfg = cfg;
    };
    Vo_ShenJian.create = function (id) {
        var vo = new Vo_ShenJian();
        vo.initcfg(id);
        return vo;
    };
    return Vo_ShenJian;
}());
__reflect(Vo_ShenJian.prototype, "Vo_ShenJian");
