var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ReduceDefStateTimer = (function () {
    function ReduceDefStateTimer() {
        this.timerRemain = 0;
        this.autoRemove = 1; //自动移除
        this.isWorking = false;
    }
    ReduceDefStateTimer.create = function () {
        var p = ReduceDefStateTimer.POOL;
        if (p.length) {
            return p.shift();
        }
        return new ReduceDefStateTimer();
    };
    ReduceDefStateTimer.prototype.update = function (ctx) {
        this.timerRemain -= ctx.dt;
        if (this.timerRemain <= 0) {
            ctx.d = 1;
        }
    };
    ReduceDefStateTimer.prototype.onAdd = function () {
        this.isWorking = true;
    };
    ReduceDefStateTimer.prototype.onRemove = function () {
        this.isWorking = false;
        this.role.reduceDef = 0;
        this.role = null;
        ReduceDefStateTimer.POOL.push(this);
    };
    ReduceDefStateTimer.prototype.onEvent = function (evt, arg) {
        var role = this.role;
    };
    ReduceDefStateTimer.POOL = [];
    return ReduceDefStateTimer;
}());
__reflect(ReduceDefStateTimer.prototype, "ReduceDefStateTimer");
