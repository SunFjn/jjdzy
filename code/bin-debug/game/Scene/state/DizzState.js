var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**定身眩晕状态 */
var DizzState = (function () {
    function DizzState() {
        this.remainTime = 2500;
        this.autoRemove = 1; //自动移除
        this.isWorking = false;
        this.shakex = 1;
        this.shakeInterv = 0;
        /**1定身2眩晕 */
        this.state = 0;
    }
    DizzState.create = function () {
        var p = DizzState.POOL;
        if (p.length) {
            return p.shift();
        }
        return new DizzState();
    };
    DizzState.prototype.update = function (ctx) {
        var self = this;
        self.remainTime -= ctx.dt;
        if (self.remainTime <= 0) {
            ctx.d = 1;
        }
        if (self.eff && self.role) {
            self.eff.mc.y = self.role.namey - self.role.h;
        }
    };
    DizzState.prototype.onAdd = function () {
        var self = this;
        var role = self.role;
        role.dizz_state++;
        role.invalid |= 1;
        role.endSkill();
        self.isWorking = true;
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
            console.log("error");
        }
        switch (self.state) {
            case 1:
            case 2:
                self.eff = EffectMgr.addEff("eff/500014/ani", role.view, 0, self.role.namey - self.role.h, 1000, -1, true, 1, Main.skill_part_type);
                break;
        }
    };
    DizzState.prototype.onRemove = function () {
        var s = this;
        if (s.role) {
            if (s.role.dizz_state > 0) {
                s.role.dizz_state--;
            }
            else {
                s.role.dizz_state = 0;
            }
            s.role.setPlayTime();
            s.role = null;
        }
        s.isWorking = false;
        if (s.eff) {
            EffectMgr.instance.removeEff(s.eff);
            s.eff = null;
        }
        if (DizzState.POOL.indexOf(this) == -1)
            DizzState.POOL.push(s);
    };
    DizzState.prototype.onEvent = function (evt, arg) {
    };
    DizzState.POOL = [];
    return DizzState;
}());
__reflect(DizzState.prototype, "DizzState");
