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
var DiaoChanSkillX = (function (_super) {
    __extends(DiaoChanSkillX, _super);
    function DiaoChanSkillX() {
        var _this = _super.call(this) || this;
        _this.CFGTIME = 600;
        _this.EFFECTTIME1 = 100;
        _this.EFFECTTIME2 = 300;
        _this.EFFECTTIME3 = 500;
        _this.lifeTime = 0;
        _this.attackIndex = 1;
        return _this;
    }
    DiaoChanSkillX.create = function (role, skill) {
        var ret = new DiaoChanSkillX();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    DiaoChanSkillX.prototype.update = function (ctx) {
        var nt = this.lifeTime + ctx.dt;
        if (nt >= this.EFFECTTIME1 && this.lifeTime < this.EFFECTTIME1) {
            this.dealHurt(1);
        }
        if (nt >= this.EFFECTTIME2 && this.lifeTime < this.EFFECTTIME2) {
            this.dealHurt(2);
        }
        if (nt >= this.EFFECTTIME3 && this.lifeTime < this.EFFECTTIME3) {
            this.dealHurt(2);
        }
        if (nt >= this.CFGTIME) {
            ctx.d = 1;
        }
        if (this.effid) {
            var effperc = this.lifeTime / this.CFGTIME;
            if (effperc > 1) {
                effperc = 1;
            }
            this.eff.setPec(effperc);
        }
        //this.role.scene.moveRole(this.role,4 * this.role.faceDir,0,0);
        this.lifeTime = nt;
    };
    DiaoChanSkillX.prototype.onAdd = function () {
        this.effid = null;
        this.CFGTIME = 800;
        this.effid = "eff/5_12";
        if (this.effid) {
            this.eff = new Part();
            this.eff.setVal(this.effid);
            this.eff.setAct(1);
            this.eff.setPec(0);
            this.eff.mc.scaleX = this.role.faceDir;
            this.role.view.addChild(this.eff.mc);
        }
        this.role.attack_index = 12;
        this.role.attack_state++;
        this.role.invalid |= 1;
        this.role.setPlayTime(this.CFGTIME - 50, false);
    };
    DiaoChanSkillX.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        if (this.effid) {
            this.role.view.removeChild(this.eff.mc);
            this.effid = null;
        }
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
    };
    DiaoChanSkillX.prototype.dealHurt = function (times) {
        var box3d = Box3D.create();
        var r = this.role;
        box3d.setDCXY(r.faceDir, r.x, r.y, r.h, -50, -this.skill.cfg.a.y, -50, this.skill.cfg.a.x, this.skill.cfg.a.y, 100);
        var roles = this.role.scene.filterRole(Box3D.ROLE3DTESTEnemy, this.role, box3d);
        for (var i = 0; i < roles.length; i++) {
            var role = roles[i];
            var dir = this.role.x <= role.x ? 1 : -1;
            if (times == 1) {
                var dmgVal = 10;
                var dmgCtx = { srcid: this.role.id, srcRole: this.role, dmgVal: dmgVal };
                dmgCtx = this.role.scene.setHurtState(this.role, dmgCtx, role);
                role.takeDmg(dmgCtx);
                role.throw(2 * dir, 15);
            }
            else {
                var dmgVal = 10;
                var dmgCtx = { srcid: this.role.id, srcRole: this.role, dmgVal: dmgVal };
                dmgCtx = this.role.scene.setHurtState(this.role, dmgCtx, role);
                role.takeDmg(dmgCtx);
                role.throw(2 * dir, 15);
            }
        }
    };
    return DiaoChanSkillX;
}(SkillBase));
__reflect(DiaoChanSkillX.prototype, "DiaoChanSkillX");
