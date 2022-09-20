var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_HomeGoal = (function () {
    function Vo_HomeGoal() {
    }
    Vo_HomeGoal.prototype.initCfg = function (cfg) {
        var s = this;
        s.lib = cfg;
        s.id = cfg.id;
    };
    Vo_HomeGoal.prototype.update = function () {
        this.sortIndex = this.lib.id;
        if (this.state == 1) {
            this.sortIndex = this.sortIndex - 1000;
        }
        else if (this.state == 2) {
            this.sortIndex = this.sortIndex + 1000;
        }
    };
    Object.defineProperty(Vo_HomeGoal.prototype, "nextto", {
        get: function () {
            return this.lib.nextto;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_HomeGoal.prototype, "name", {
        get: function () {
            return this.lib.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_HomeGoal.prototype, "fenlei", {
        get: function () {
            return this.lib.fenlei;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_HomeGoal.prototype, "award", {
        get: function () {
            return this.lib.award;
        },
        enumerable: true,
        configurable: true
    });
    return Vo_HomeGoal;
}());
__reflect(Vo_HomeGoal.prototype, "Vo_HomeGoal");
