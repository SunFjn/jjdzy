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
var LvMengSkill1 = (function (_super) {
    __extends(LvMengSkill1, _super);
    function LvMengSkill1() {
        var _this = _super.call(this) || this;
        _this.lifeTime = 0;
        _this.et = 0;
        return _this;
    }
    LvMengSkill1.create = function (role, skill) {
        var ret = new LvMengSkill1();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    LvMengSkill1.prototype.update = function (ctx) {
        var nt = this.lifeTime + ctx.dt;
        if (nt >= this.T1 && this.lifeTime < this.T1) {
            this.et++;
            this.dealHurt(this.et);
        }
        if (nt >= this.T2 && this.lifeTime < this.T2) {
            this.et++;
            this.dealHurt(this.et);
        }
        if (nt >= this.T3 && this.lifeTime < this.T3) {
            this.et++;
            this.dealHurt(this.et);
        }
        if (nt >= this.T) {
            ctx.d = 1;
        }
        this.role.scene.moveRole(this.role, this.role.faceDir * 6, 0, 0);
        //this.role.scene.moveRole(this.role,4 * this.role.faceDir,0,0);
        this.lifeTime = nt;
    };
    LvMengSkill1.prototype.onAdd = function () {
        var skilllogiccfg = this.skill.cfg.a;
        this.T = skilllogiccfg.t;
        this.T1 = skilllogiccfg[1].t;
        this.T2 = skilllogiccfg[2].t;
        this.T3 = skilllogiccfg[3].t;
        //this.role.immuneHSt++;
        var act_index = skilllogiccfg.a ? skilllogiccfg.a : 1;
        this.role.attack_index = act_index;
        this.role.attack_state++;
        this.role.invalid |= 1;
        this.role.setPlayTime(skilllogiccfg.at, true);
    };
    LvMengSkill1.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        //this.role.immuneHSt--;
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
    };
    LvMengSkill1.prototype.dealHurt = function (times) {
        this.dmgProxy.effect(times);
    };
    return LvMengSkill1;
}(SkillBase));
__reflect(LvMengSkill1.prototype, "LvMengSkill1");
