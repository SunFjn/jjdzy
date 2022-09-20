var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ComboAttack3 = (function (_super) {
    __extends(ComboAttack3, _super);
    function ComboAttack3() {
        var _this = _super.call(this) || this;
        _this.lifeTime = 0;
        return _this;
    }
    ComboAttack3.create = function (role, skill) {
        var ret = new ComboAttack3();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    ComboAttack3.prototype.update = function (ctx) {
        var nt = this.lifeTime + ctx.dt;
        if (nt >= this.T1 && this.lifeTime < this.T1) {
            this.dealHurt(1);
        }
        if (nt >= this.T2 && this.lifeTime < this.T2) {
            this.dealHurt(2);
        }
        if (nt >= this.T3 && this.lifeTime < this.T3) {
            this.dealHurt(3);
        }
        if (nt >= this.T) {
            ctx.d = 1;
        }
        this.lifeTime = nt;
    };
    ComboAttack3.prototype.onAdd = function () {
        var self = this;
        self.T1 = self.skill.cfg.a[1].t;
        self.T2 = self.skill.cfg.a[2].t;
        self.T3 = self.skill.cfg.a[3].t;
        self.T = self.skill.cfg.a.t;
        self.role.attack_index = self.skill.cfg.a.a ? self.skill.cfg.a.a : 1;
        self.role.attack_state++;
        self.role.invalid |= 1;
        self.role.setPlayTime(self.T, false);
    };
    ComboAttack3.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
        this.role.attack_index = 0;
    };
    ComboAttack3.prototype.dealHurt = function (times) {
        this.dmgProxy.effect(times);
    };
    return ComboAttack3;
}(SkillBase));
__reflect(ComboAttack3.prototype, "ComboAttack3");
