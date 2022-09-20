var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_BaoKu = (function () {
    function Vo_BaoKu() {
        this.id = 0;
        /**宝库ids */
        this.bk = 0;
        /**奖励道具 */
        this.reward = [];
        /** 消耗道具*/
        this.consume = [];
        /**限购次数 */
        this.time = 0;
        /**是否为新品 */
        this.xinpin = 0;
        /**在周几打9折 */
        this.dazhe = 0;
        /**在周几限时 */
        this.xianshi = 0;
        /**vip等级购买条件 */
        this.vip = 0;
        /**已购买数量 */
        this.count = 0;
        /**排序 */
        this.sortNum = 0;
    }
    Vo_BaoKu.prototype.initcfg = function (id) {
        var self = this;
        self.id = id;
        var cfg = Config.bkitem_236[id];
        self.bk = cfg.bk;
        self.reward = JSON.parse(cfg.reward);
        self.consume = JSON.parse(cfg.consume);
        self.time = cfg.time;
        self.xinpin = cfg.xinpin;
        self.dazhe = cfg.dazhe;
        self.xianshi = cfg.xianshi;
        self.vip = cfg.vip;
        self.sortNum = cfg.px;
    };
    Vo_BaoKu.create = function (id) {
        var vo = new Vo_BaoKu();
        vo.initcfg(id);
        return vo;
    };
    return Vo_BaoKu;
}());
__reflect(Vo_BaoKu.prototype, "Vo_BaoKu");
