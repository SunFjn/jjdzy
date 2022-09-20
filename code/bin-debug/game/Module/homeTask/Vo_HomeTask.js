var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_HomeTask = (function () {
    function Vo_HomeTask() {
    }
    Vo_HomeTask.prototype.initLib = function (cfg) {
        var s = this;
        s.lib = cfg;
        s.id = cfg.id;
    };
    Vo_HomeTask.prototype.update = function () {
        this.sortIndex = this.lib.id;
        if (this.state == 1) {
            this.sortIndex = this.sortIndex - 1000;
        }
        else if (this.state == 2) {
            this.sortIndex = this.sortIndex + 1000;
        }
    };
    Object.defineProperty(Vo_HomeTask.prototype, "name", {
        get: function () {
            return this.lib.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_HomeTask.prototype, "icon", {
        get: function () {
            return this.lib.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_HomeTask.prototype, "nextto", {
        get: function () {
            return this.lib.nextto;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_HomeTask.prototype, "award", {
        get: function () {
            return this.lib.award;
        },
        enumerable: true,
        configurable: true
    });
    return Vo_HomeTask;
}());
__reflect(Vo_HomeTask.prototype, "Vo_HomeTask");
