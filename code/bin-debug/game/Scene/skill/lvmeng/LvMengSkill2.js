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
var LvMengSkill2 = (function (_super) {
    __extends(LvMengSkill2, _super);
    function LvMengSkill2() {
        var _this = _super.call(this) || this;
        _this.lifeTime = 0;
        _this.et = 0;
        return _this;
    }
    LvMengSkill2.create = function (role, skill) {
        var ret = new LvMengSkill2();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    LvMengSkill2.prototype.update = function (ctx) {
        var nt = this.lifeTime + ctx.dt;
        if (nt >= this.ET1 && this.lifeTime < this.ET1) {
            this.et++;
            this.dealHurt(this.et);
            this.fire(1);
        }
        if (nt >= this.ET2 && this.lifeTime < this.ET2) {
            this.et++;
            this.dealHurt(this.et);
            this.fire(2);
        }
        if (nt >= this.ET3 && this.lifeTime < this.ET3) {
            this.et++;
            this.dealHurt(this.et);
            this.fire(3);
        }
        if (nt >= this.CFGTIME) {
            ctx.d = 1;
        }
        //this.role.scene.moveRole(this.role, this.role.faceDir * 6, 0, 0);
        //this.role.scene.moveRole(this.role,4 * this.role.faceDir,0,0);
        this.lifeTime = nt;
    };
    LvMengSkill2.prototype.fire = function (times) {
        var arrow = HuangZhongArrow1.create();
        arrow.initWithRoleFace(this.role, "eff/9014", 1, 400, false, 50, -150);
        arrow.va = this.role.faceDir * (4 + times * 4);
        arrow.vd = 1;
        arrow.vc = this.role.faceDir;
        arrow.dep = this.role.y + 40;
        //arrow.eff.mc.scaleX = this.role.faceDir;
        var rot = Math.atan2(20, arrow.va) / Math.PI * 180 + (this.role.faceDir == -1 ? 180 : 0);
        arrow.eff.mc.rotation = rot;
        arrow.updateFunc = HuangZhongArrow1.LMDROP;
        this.role.scene.addUnit(arrow);
    };
    LvMengSkill2.prototype.onAdd = function () {
        this.CFGTIME = 800;
        this.ET1 = 200;
        this.ET2 = 400;
        this.ET3 = 600;
        this.role.attack_index = 2;
        this.role.attack_state++;
        this.role.invalid |= 1;
        this.role.setPlayTime(this.CFGTIME, false);
    };
    LvMengSkill2.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
    };
    LvMengSkill2.prototype.dealHurt = function (times) {
        this.dmgProxy.effect(times);
    };
    return LvMengSkill2;
}(SkillBase));
__reflect(LvMengSkill2.prototype, "LvMengSkill2");
