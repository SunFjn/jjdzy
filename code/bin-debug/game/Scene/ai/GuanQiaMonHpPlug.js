var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuanQiaMonHpPlug = (function () {
    function GuanQiaMonHpPlug() {
        this.autoRemove = 1;
    }
    GuanQiaMonHpPlug.create = function () {
        var pool = GuanQiaMonHpPlug.P;
        return pool.length ? pool.pop() : new GuanQiaMonHpPlug();
    };
    GuanQiaMonHpPlug.prototype.update = function (ctx) {
        var now = egret.getTimer();
        if (now - this.lt >= 3000) {
            if (this.role.curhp > 1) {
                this.role.curhp = 1;
            }
            ctx.d = 1;
        }
    };
    GuanQiaMonHpPlug.prototype.onAdd = function () {
        this.lt = egret.getTimer();
    };
    GuanQiaMonHpPlug.prototype.onRemove = function () {
        GuanQiaMonHpPlug.P.push(this);
    };
    GuanQiaMonHpPlug.prototype.onEvent = function (evt, arg) {
    };
    GuanQiaMonHpPlug.P = [];
    return GuanQiaMonHpPlug;
}());
__reflect(GuanQiaMonHpPlug.prototype, "GuanQiaMonHpPlug");
