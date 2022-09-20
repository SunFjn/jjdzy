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
var SunjiSkill2 = (function (_super) {
    __extends(SunjiSkill2, _super);
    function SunjiSkill2() {
        var _this = _super.call(this) || this;
        _this.CFGTIME = 1167;
        _this.ET1 = 334;
        _this.ET2 = 668;
        _this.ET3 = 1000;
        _this.lifeTime = 0;
        return _this;
    }
    SunjiSkill2.create = function (role, skill) {
        var ret = new SunjiSkill2();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    SunjiSkill2.prototype.update = function (ctx) {
        var nt = this.lifeTime + ctx.dt;
        if (nt >= this.ET1 && this.lifeTime < this.ET1) {
            this.dealHurt(1);
            this.st++;
        }
        if (nt >= this.ET2 && this.lifeTime < this.ET2) {
            this.dealHurt(2);
            this.st++;
        }
        if (nt >= this.ET3 && this.lifeTime < this.ET3) {
            this.dealHurt(3);
            this.st++;
        }
        if (nt >= this.CFGTIME) {
            ctx.d = 1;
        }
        if (this.st == 0) {
            this.role.scene.moveRole(this.role, 20 * this.role.faceDir, 0, 0);
        }
        else if (this.st == 1) {
            this.role.scene.moveRole(this.role, -18 * this.role.faceDir, 0, 0);
        }
        this.lifeTime = nt;
    };
    SunjiSkill2.prototype.onAdd = function () {
        this.st = 0;
        this.role.immuneHSt++;
        this.role.attack_index = 2;
        this.role.attack_state++;
        this.role.invalid |= 1;
        this.role.setPlayTime(this.CFGTIME, false);
    };
    SunjiSkill2.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.role.immuneHSt--;
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
    };
    SunjiSkill2.prototype.dealHurt = function (times) {
        this.dmgProxy.effect(times);
    };
    return SunjiSkill2;
}(SkillBase));
__reflect(SunjiSkill2.prototype, "SunjiSkill2");
