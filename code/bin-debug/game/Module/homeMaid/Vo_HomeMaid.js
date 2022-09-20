var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_HomeMaid = (function () {
    function Vo_HomeMaid() {
        this.id = 0;
        this._star = 0;
        this._lv = 0;
        this.exp = 0;
        this.isAct = false;
    }
    Vo_HomeMaid.prototype.init = function (cfg) {
        var s = this;
        s.cfg = cfg;
        s.id = cfg.id;
        s.isAct = false;
        s.setStar(0);
        s.setLv(0);
    };
    Vo_HomeMaid.prototype.setLv = function (v) {
        var s = this;
        s._lv = v;
        s.cfgLv = Config.snsj_020[s.quality * 10000 + v];
    };
    Object.defineProperty(Vo_HomeMaid.prototype, "lv", {
        get: function () {
            return this._lv;
        },
        enumerable: true,
        configurable: true
    });
    Vo_HomeMaid.prototype.setStar = function (v) {
        var s = this;
        s._star = v;
        s.cfgStar = Config.snsx_020[s.quality * 1000 + v];
    };
    Object.defineProperty(Vo_HomeMaid.prototype, "star", {
        get: function () {
            return this._star;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_HomeMaid.prototype, "quality", {
        get: function () {
            return this.cfg.pinzhi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_HomeMaid.prototype, "name", {
        get: function () {
            return this.cfg.mingzi;
        },
        enumerable: true,
        configurable: true
    });
    return Vo_HomeMaid;
}());
__reflect(Vo_HomeMaid.prototype, "Vo_HomeMaid");
