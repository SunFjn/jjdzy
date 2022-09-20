var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_CaiLiaoFB = (function () {
    function Vo_CaiLiaoFB() {
        this.monsterArr = [];
        this.bossArr = [];
        this.addArr = [];
        this.rewardArr = [];
        this.tupian = 0;
        /**剩余挑战次数 */
        this.battleNum = 0;
        /**已购买次数 */
        this.buyNum = 0;
        /**是否通关 0没有1有*/
        this.pass = 0;
    }
    Vo_CaiLiaoFB.prototype.initcfg = function (id) {
        var a = this;
        a.id = id;
        var cfg = Config.cailiaofuben_709[id];
        a.lib = cfg;
        a.name = cfg.NAME;
        a.startcondition = cfg.startcondition;
        a.monsterArr = JSON.parse(cfg.monster);
        a.bossArr = JSON.parse(cfg.boss);
        a.addArr = JSON.parse(cfg.ADD);
        a.rewardArr = JSON.parse(cfg.AWARD);
        a.picture = cfg.picture;
        a.scene = cfg.scene;
        a.tupian = cfg.tupian;
        a.paixu = cfg.paixu;
        a.taskType = cfg.type;
    };
    Vo_CaiLiaoFB.create = function (id) {
        var vo = new Vo_CaiLiaoFB();
        vo.initcfg(id);
        return vo;
    };
    return Vo_CaiLiaoFB;
}());
__reflect(Vo_CaiLiaoFB.prototype, "Vo_CaiLiaoFB");
