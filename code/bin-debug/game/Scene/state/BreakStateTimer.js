var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**打断计时器*/
var BreakStateTimer = (function () {
    function BreakStateTimer() {
        this.timerRemain = 0;
        this.isWorking = false;
        this.autoRemove = 1; //自动移除
    }
    BreakStateTimer.create = function () {
        var p = BreakStateTimer.POOL;
        if (p.length) {
            return p.shift();
        }
        return new BreakStateTimer();
    };
    BreakStateTimer.prototype.update = function (ctx) {
        this.timerRemain -= ctx.dt;
        if (this.timerRemain <= 0) {
            ctx.d = 1;
        }
    };
    BreakStateTimer.prototype.onAdd = function () {
        this.isWorking = true;
        this.totalDmg = 0;
        this.timerRemain = 3000;
    };
    BreakStateTimer.prototype.onRemove = function () {
        this.isWorking = false;
        this.role = null;
        BreakStateTimer.POOL.push(this);
    };
    BreakStateTimer.prototype.onEvent = function (evt, arg) {
        var role = this.role;
        if (evt == EVT_SC.EVT_HURT && role.curhp > 0) {
            if (!role.immuneDmg && !role.invincible) {
                if (!role.immuneHSt) {
                    if (arg.bt) {
                        this.timerRemain = 3000; //重置计时器时间
                    }
                }
                this.totalDmg += arg.dmgVal;
                if (this.totalDmg >= role.maxhp * 0.2) {
                    if (!role.immuneHSt && !role.scene.ignoreBati) {
                        role.throw(0, -10); //强制倒地
                        var bati = BaTiState.create(); //获得霸体
                        bati.role = role;
                        role.addPlug(bati);
                        role.removePlug(this);
                    }
                }
            }
        }
    };
    BreakStateTimer.POOL = [];
    return BreakStateTimer;
}());
__reflect(BreakStateTimer.prototype, "BreakStateTimer");
