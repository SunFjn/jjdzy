var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_BaoWu = (function () {
    function Vo_BaoWu() {
        /**	宝物名字** */
        this.name = "";
        /**	属性** */
        this.attArr = [];
        /**	升星属性** */
        this.starAttArr = [];
        /**	激活（升星）道具* */
        this.costArr = [];
        /**星级 */
        this._starLv = 0;
    }
    Vo_BaoWu.prototype.initcfg = function (id) {
        var self = this;
        self.id = id;
        var cfg = Config.bao_214[id];
        self.name = cfg.name;
        self.icon = cfg.icon;
        self.imageID = cfg.pic;
        self.quality = cfg.pin;
        self.attArr = JSON.parse(cfg.attr);
        self.starAttArr = JSON.parse(cfg.starattr);
        self.power = cfg.power;
        self.starPower = cfg.starpower;
        self.skillVo = Vo_Skill.create(cfg.skill, 1, 1);
        self.costArr = JSON.parse(cfg.item);
        self.drugMax = cfg.max;
        self.starMax = cfg.star;
        self.way = cfg.way;
        self.state = 3;
    };
    Object.defineProperty(Vo_BaoWu.prototype, "starLv", {
        get: function () {
            return this._starLv;
        },
        set: function (value) {
            this._starLv = value;
            if (value <= 0) {
                this.skillVo.starLv = this.skillVo.level = 1;
            }
            else {
                this.skillVo.starLv = this.skillVo.level = value;
            }
            this.skillVo.updatePower();
        },
        enumerable: true,
        configurable: true
    });
    Vo_BaoWu.create = function (id) {
        var vo = new Vo_BaoWu();
        vo.initcfg(id);
        return vo;
    };
    return Vo_BaoWu;
}());
__reflect(Vo_BaoWu.prototype, "Vo_BaoWu");
