var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Currency = (function () {
    function Vo_Currency() {
        this.count = 1;
        this.showEffect = false;
        this.showCount = false;
    }
    Vo_Currency.create = function (type) {
        var ret = new Vo_Currency();
        ret.initLib(type);
        return ret;
    };
    Object.defineProperty(Vo_Currency.prototype, "qColor", {
        get: function () {
            return Color.QUALITYCOLOR[this.quality];
        },
        enumerable: true,
        configurable: true
    });
    Vo_Currency.prototype.initLib = function (type) {
        this.gType = Number(type);
        this.cfg = Config.jssx_002[type];
        this.name = this.cfg.name;
        this.quality = this.cfg.color;
        this.icon = this.cfg.icon;
        this.cfg = Config.daoju_204[type];
        this.id = this.cfg.id;
        if (this.quality >= 5) {
            this.showEffect = true;
        }
    };
    return Vo_Currency;
}());
__reflect(Vo_Currency.prototype, "Vo_Currency", ["IGridImpl"]);
