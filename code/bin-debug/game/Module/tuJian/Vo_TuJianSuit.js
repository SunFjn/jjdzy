var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_TuJianSuit = (function () {
    function Vo_TuJianSuit() {
        this.suitAttArr = [];
        this.suitPower = 0;
        this.suitLv = 0;
        this.type = 0;
        this.tujianLv = 0;
    }
    Object.defineProperty(Vo_TuJianSuit.prototype, "suitID", {
        get: function () {
            return this._suitID;
        },
        set: function (value) {
            this._suitID = value;
            var cfg = Config.picteam_005[value];
            this.suitLv = cfg.lv;
            this.suitName = cfg.name;
            this.suitNeed = cfg.need;
            if (cfg.attr != "0") {
                this.suitAttArr = JSON.parse(cfg.attr);
            }
            this.suitNext = cfg.next;
            this.suitPower = cfg.power;
            this.type = cfg.type;
        },
        enumerable: true,
        configurable: true
    });
    return Vo_TuJianSuit;
}());
__reflect(Vo_TuJianSuit.prototype, "Vo_TuJianSuit");
