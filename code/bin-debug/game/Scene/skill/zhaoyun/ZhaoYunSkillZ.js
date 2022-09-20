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
var ZhaoYunSkillZ = (function (_super) {
    __extends(ZhaoYunSkillZ, _super);
    function ZhaoYunSkillZ() {
        var _this = _super.call(this) || this;
        _this.CFGTIME = 600;
        _this.EFFECTTIME = 300;
        _this.lifeTime = 0;
        _this.attackIndex = 1;
        return _this;
    }
    ZhaoYunSkillZ.create = function (role, skill) {
        var ret = new ZhaoYunSkillZ();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    ZhaoYunSkillZ.prototype.update = function (ctx) {
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
        //this.role.scene.moveRole(this.role,4 * this.role.faceDir,0,0);
        this.lifeTime = nt;
    };
    ZhaoYunSkillZ.prototype.onAdd = function () {
        this.effid = null;
        this.CFGTIME = 400;
        this.EFFECTTIME = 200;
        //this.effid = "eff/1_1";
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
    ZhaoYunSkillZ.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        if (this.effid) {
            this.role.view.removeChild(this.eff.mc);
            this.effid = null;
        }
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
    };
    ZhaoYunSkillZ.prototype.dealHurt = function () {
        this.dmgProxy.effect(1);
    };
    return ZhaoYunSkillZ;
}(SkillBase));
__reflect(ZhaoYunSkillZ.prototype, "ZhaoYunSkillZ");
