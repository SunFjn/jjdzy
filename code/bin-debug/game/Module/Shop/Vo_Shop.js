var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Shop = (function () {
    function Vo_Shop() {
        /**玩家转生刷新范围 */
        this.szArr = [];
        /**道具 */
        this.itemArr = [];
        /**价格 */
        this.moneyArr = [];
        /**原价 */
        this.oldmoneyArr = [];
        /**购买条件 */
        this.condition = [];
    }
    Vo_Shop.prototype.initcfg = function (id) {
        this.id = id;
        var cfg = Config.list_218[id];
        this.store = cfg.store;
        this.szArr = JSON.parse(cfg.sz);
        this.itemArr = JSON.parse(cfg.item);
        this.moneyArr = JSON.parse(cfg.money);
        this.oldmoneyArr = JSON.parse(cfg.oldmoney);
        this.off = cfg.off;
        this.time = cfg.time;
        if (cfg.condition != "0")
            this.condition = JSON.parse(cfg.condition);
        this.tips = cfg.tips;
    };
    Vo_Shop.create = function (id) {
        var vo = new Vo_Shop();
        vo.initcfg(id);
        return vo;
    };
    //专属活动
    Vo_Shop.createOnly = function (id) {
        var vo = new Vo_Shop();
        vo.initcfgOnly(id);
        return vo;
    };
    //专属活动
    Vo_Shop.prototype.initcfgOnly = function (id) {
        this.id = id;
        var cfg = Config.zshdzssd_315[id];
        this.itemArr = cfg.item;
        this.moneyArr = cfg.money;
        this.pos = cfg.wz;
        this.time = cfg.time;
    };
    return Vo_Shop;
}());
__reflect(Vo_Shop.prototype, "Vo_Shop");
