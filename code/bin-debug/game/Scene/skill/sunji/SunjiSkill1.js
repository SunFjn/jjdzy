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
var SunjiSkill1 = (function (_super) {
    __extends(SunjiSkill1, _super);
    function SunjiSkill1() {
        var _this = _super.call(this) || this;
        _this.st = 0;
        _this.lifeTime = 0;
        return _this;
    }
    SunjiSkill1.create = function (role, skill) {
        var ret = new SunjiSkill1();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    SunjiSkill1.prototype.update = function (ctx) {
        var nt = this.lifeTime + ctx.dt;
        if (nt >= this.ET1 && this.lifeTime < this.ET1) {
            this.st++;
            this.dealHurt(1);
            this.role.scene.moveRole(this.role, 20 * this.role.faceDir, 0, 0);
        }
        if (this.st == 1) {
            this.role.scene.moveRole(this.role, 3 * this.role.faceDir, 0, 0);
        }
        if (nt >= this.ET2 && this.lifeTime < this.ET2) {
            this.st++;
            this.dealHurt(2);
        }
        if (nt >= this.CFGTIME) {
            ctx.d = 1;
        }
        this.lifeTime = nt;
    };
    SunjiSkill1.prototype.onAdd = function () {
        this.CFGTIME = 600;
        this.ET1 = 200;
        this.ET2 = 400;
        this.role.immuneHSt++;
        this.role.attack_index = 1;
        this.role.attack_state++;
        this.role.invalid |= 1;
        this.role.setPlayTime(this.CFGTIME, false);
    };
    SunjiSkill1.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.role.immuneHSt--;
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
    };
    SunjiSkill1.prototype.dealHurt = function (times) {
        this.dmgProxy.effect(times);
    };
    return SunjiSkill1;
}(SkillBase));
__reflect(SunjiSkill1.prototype, "SunjiSkill1");
