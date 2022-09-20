var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChangeModelState = (function () {
    function ChangeModelState() {
        this.remainTime = 2500;
        this.autoRemove = 1; //自动移除
        this.isWorking = false;
        this.shakex = 1;
        this.shakeInterv = 0;
    }
    ChangeModelState.create = function () {
        var p = ChangeModelState.POOL;
        if (p.length) {
            return p.shift();
        }
        return new ChangeModelState();
    };
    ChangeModelState.prototype.update = function (ctx) {
        var self = this;
        self.remainTime -= ctx.dt;
        if (self.remainTime <= 0) {
            ctx.d = 1;
        }
    };
    ChangeModelState.prototype.onAdd = function () {
        var self = this;
        var role = self.role;
        role.dizz_state++;
        role.invalid |= 1;
        role.endSkill();
        self.isWorking = true;
        EffectMgr.addEff("eff/500033/ani", role.view, 0, self.role.namey - self.role.h, 1000, 1000, false, 1, Main.skill_part_type);
    };
    ChangeModelState.prototype.onRemove = function () {
        var s = this;
        if (s.role) {
            if (s.role.dizz_state > 0) {
                s.role.dizz_state--;
            }
            else {
                s.role.dizz_state = 0;
            }
            s.role.changeModel = 0;
            s.role.setPlayTime();
            s.role = null;
        }
        s.isWorking = false;
        if (ChangeModelState.POOL.indexOf(this) == -1)
            ChangeModelState.POOL.push(s);
    };
    ChangeModelState.prototype.onEvent = function (evt, arg) {
    };
    ChangeModelState.POOL = [];
    return ChangeModelState;
}());
__reflect(ChangeModelState.prototype, "ChangeModelState");
