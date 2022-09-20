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
var DiaoChanSkillZ = (function (_super) {
    __extends(DiaoChanSkillZ, _super);
    function DiaoChanSkillZ() {
        var _this = _super.call(this) || this;
        _this.CFGTIME = 600;
        _this.EFFECTTIME = 300;
        _this.lifeTime = 0;
        _this.attackIndex = 1;
        return _this;
    }
    DiaoChanSkillZ.create = function (role, skill) {
        var ret = new DiaoChanSkillZ();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    DiaoChanSkillZ.prototype.update = function (ctx) {
        var nt = this.lifeTime + ctx.dt;
        if (nt >= this.EFFECTTIME && this.lifeTime < this.EFFECTTIME) {
            this.dealHurt();
        }
        if (nt >= this.CFGTIME) {
            ctx.d = 1;
        }
        this.role.scene.moveRole(this.role, this.role.faceDir * 10, 0, 0);
        if (this.effid) {
            var effperc = this.lifeTime / this.CFGTIME;
            if (effperc > 1) {
                effperc = 1;
            }
            this.eff.setPec(effperc);
        }
        this.lifeTime = nt;
    };
    DiaoChanSkillZ.prototype.onAdd = function () {
        this.effid = null;
        this.CFGTIME = 500;
        this.EFFECTTIME = 300;
        this.effid = "eff/5_11";
        if (this.effid) {
            this.eff = new Part();
            this.eff.setVal(this.effid);
            this.eff.setAct(1);
            this.eff.setPec(0);
            this.eff.mc.y = 20;
            this.eff.mc.scaleX = this.role.faceDir;
            this.role.view.addChild(this.eff.mc);
        }
        this.role.attack_index = 11;
        this.role.attack_state++;
        this.role.invalid |= 1;
        this.role.setPlayTime(this.CFGTIME, false);
    };
    DiaoChanSkillZ.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        if (this.effid) {
            this.role.view.removeChild(this.eff.mc);
            this.effid = null;
        }
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
    };
    DiaoChanSkillZ.prototype.dealHurt = function () {
        var box3d = Box3D.create();
        var r = this.role;
        box3d.setDCXY(r.faceDir, r.x, r.y, r.h, -50, -this.skill.cfg.a.y, -50, this.skill.cfg.a.x, this.skill.cfg.a.y, 100);
        var roles = this.role.scene.filterRole(Box3D.ROLE3DTESTEnemy, this.role, box3d);
        for (var i = 0; i < roles.length; i++) {
            var role = roles[i];
            var dmgVal = 20;
            var hitback = true;
            var dmgCtx = { srcid: this.role.id, srcRole: this.role, dmgVal: dmgVal };
            dmgCtx = this.role.scene.setHurtState(this.role, dmgCtx, role);
            role.takeDmg(dmgCtx);
            role.throw(10 * this.role.faceDir, 13);
        }
    };
    return DiaoChanSkillZ;
}(SkillBase));
__reflect(DiaoChanSkillZ.prototype, "DiaoChanSkillZ");
