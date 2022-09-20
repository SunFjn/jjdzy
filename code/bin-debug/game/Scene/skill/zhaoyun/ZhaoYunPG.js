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
var ZhaoYunPG = (function (_super) {
    __extends(ZhaoYunPG, _super);
    function ZhaoYunPG() {
        var _this = _super.call(this) || this;
        _this.T = 600;
        _this.EFFECTTIME = 300;
        _this.lifeTime = 0;
        _this.attackIndex = 1;
        return _this;
    }
    ZhaoYunPG.create = function (role, skill) {
        var ret = new ZhaoYunPG();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    ZhaoYunPG.prototype.update = function (ctx) {
        var nt = this.lifeTime + ctx.dt;
        if (nt >= this.EFFECTTIME && this.lifeTime < this.EFFECTTIME) {
            this.dealHurt();
        }
        if (nt >= this.T) {
            ctx.d = 1;
        }
        if (this.attackIndex == 2) {
            this.role.scene.moveRole(this.role, 0.2 * this.role.faceDir, 0, 0);
        }
        if (this.effid) {
            var effperc = this.lifeTime / this.T;
            if (effperc > 1) {
                effperc = 1;
            }
            this.eff.setPec(effperc);
        }
        this.lifeTime = nt;
    };
    ZhaoYunPG.prototype.onAdd = function () {
        this.effid = null;
        if (this.attackIndex == 1) {
            this.T = 450;
            this.EFFECTTIME = 300;
        }
        else if (this.attackIndex == 2) {
            this.T = 450;
            this.EFFECTTIME = 300;
            //this.effid = "eff/1_2";
        }
        else if (this.attackIndex == 3) {
            this.T = 450;
            this.EFFECTTIME = 300;
        }
        if (this.effid) {
            this.eff = new Part();
            this.eff.setVal(this.effid);
            this.eff.setAct(1);
            this.eff.setPec(0);
            this.eff.mc.scaleY = 0.85;
            this.eff.mc.scaleX = this.role.faceDir * 0.85;
            this.role.view.addChild(this.eff.mc);
        }
        this.role.attack_index = this.attackIndex;
        this.role.attack_state++;
        this.role.invalid |= 1;
        this.role.setPlayTime(this.T, false);
    };
    ZhaoYunPG.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        if (this.effid) {
            this.role.view.removeChild(this.eff.mc);
            this.effid = null;
        }
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
        this.role.attack_index = 0;
        if (this.attackIndex <= 2 && this.role.scene.hasRole(MapScene.ISLIFEENEMY, this.role.force)) {
            var pg2 = new ZhaoYunPG();
            pg2.skill = this.skill;
            pg2.attackIndex = this.attackIndex + 1;
            pg2.role = this.role;
            this.role.playSkill(pg2);
        }
    };
    ZhaoYunPG.prototype.dealHurt = function () {
        this.dmgProxy.effect(this.attackIndex);
    };
    return ZhaoYunPG;
}(SkillBase));
__reflect(ZhaoYunPG.prototype, "ZhaoYunPG");
