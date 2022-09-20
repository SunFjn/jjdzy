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
var ZhaoYunSkillX = (function (_super) {
    __extends(ZhaoYunSkillX, _super);
    function ZhaoYunSkillX() {
        var _this = _super.call(this) || this;
        _this.CFGTIME = 600;
        _this.EFFECTTIME1 = 250;
        _this.EFFECTTIME2 = 550;
        _this.lifeTime = 0;
        _this.attackIndex = 1;
        return _this;
    }
    ZhaoYunSkillX.create = function (role, skill) {
        var ret = new ZhaoYunSkillX();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    ZhaoYunSkillX.prototype.update = function (ctx) {
        var nt = this.lifeTime + ctx.dt;
        if (nt >= this.EFFECTTIME1 && this.lifeTime < this.EFFECTTIME1) {
            this.dealHurt(1);
        }
        if (nt >= this.EFFECTTIME2 && this.lifeTime < this.EFFECTTIME2) {
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
    ZhaoYunSkillX.prototype.onAdd = function () {
        this.effid = null;
        this.CFGTIME = 800;
        //this.effid = "eff/1_13"
        this.effid = null;
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
    ZhaoYunSkillX.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        if (this.effid) {
            this.role.view.removeChild(this.eff.mc);
            this.effid = null;
        }
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
    };
    ZhaoYunSkillX.prototype.dealHurt = function (times) {
        this.dmgProxy.effect(times);
    };
    ZhaoYunSkillX.prototype.onEvent = function (evt, arg) {
        _super.prototype.onEvent.call(this, evt, arg);
    };
    return ZhaoYunSkillX;
}(SkillBase));
__reflect(ZhaoYunSkillX.prototype, "ZhaoYunSkillX");
