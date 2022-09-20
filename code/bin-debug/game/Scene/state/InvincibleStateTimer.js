var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var InvincibleStateTimer = (function () {
    function InvincibleStateTimer() {
        this.timerRemain = 0;
        this.autoRemove = 1; //自动移除
        this.isWorking = false;
    }
    InvincibleStateTimer.create = function () {
        var p = InvincibleStateTimer.POOL;
        if (p.length) {
            return p.shift();
        }
        return new InvincibleStateTimer();
    };
    InvincibleStateTimer.prototype.update = function (ctx) {
        this.timerRemain -= ctx.dt;
        if (this.timerRemain <= 0) {
            ctx.d = 1;
        }
    };
    InvincibleStateTimer.prototype.onAdd = function () {
        this.isWorking = true;
        this.role.invincible = 1;
        this.role.view.alpha = 0.75;
    };
    InvincibleStateTimer.prototype.onRemove = function () {
        this.isWorking = false;
        if (true) {
            if (!this.role) {
                throw new Error("can't find role");
            }
        }
        if (this.role) {
            this.role.invincible = 0;
            this.role.view.alpha = 1;
            this.role = null;
        }
        InvincibleStateTimer.POOL.push(this);
    };
    InvincibleStateTimer.prototype.onEvent = function (evt, arg) {
        var role = this.role;
    };
    InvincibleStateTimer.POOL = [];
    return InvincibleStateTimer;
}());
__reflect(InvincibleStateTimer.prototype, "InvincibleStateTimer");
