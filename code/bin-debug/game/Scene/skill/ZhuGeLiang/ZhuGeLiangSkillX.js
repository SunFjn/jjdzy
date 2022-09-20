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
var ZhuGeLiangSkillX = (function (_super) {
    __extends(ZhuGeLiangSkillX, _super);
    function ZhuGeLiangSkillX() {
        var _this = _super.call(this) || this;
        _this.CFGTIME = 1000;
        _this.EFFECTTIME1 = 200;
        _this.EFFECTTIME2 = 300;
        _this.EFFECTTIME3 = 600;
        _this.lifeTime = 0;
        _this.attackIndex = 1;
        return _this;
    }
    ZhuGeLiangSkillX.create = function (role, skill) {
        var ret = new ZhuGeLiangSkillX();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    ZhuGeLiangSkillX.prototype.update = function (ctx) {
        var nt = this.lifeTime + ctx.dt;
        if (nt >= this.EFFECTTIME1 && this.lifeTime < this.EFFECTTIME1) {
            this.dealHurt(0);
        }
        if (nt >= this.EFFECTTIME2 && this.lifeTime < this.EFFECTTIME2) {
            this.dealHurt(1);
        }
        if (nt >= this.EFFECTTIME3 && this.lifeTime < this.EFFECTTIME3) {
            this.dealHurt(2);
        }
        if (nt >= this.CFGTIME) {
            ctx.d = 1;
        }
        this.lifeTime = nt;
    };
    ZhuGeLiangSkillX.prototype.onAdd = function () {
        this.role.attack_index = 13;
        this.role.attack_state++;
        this.role.invalid |= 1;
        this.role.setPlayTime(this.CFGTIME, false);
        this.dealHurt(0);
    };
    ZhuGeLiangSkillX.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
    };
    ZhuGeLiangSkillX.prototype.dealHurt = function (times) {
        var mine = this.role;
        var cfga = this.skill.cfg.a;
        if (times == 0) {
            for (var i = 0; i < 6; i++) {
                var angle = Math.PI * i / 3;
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                var sceneff = new HuangZhongArrow1();
                sceneff.initXY("eff/" + cfga.effid, 1, 500, true, mine.x + cos * 70, mine.y + sin * 35);
                sceneff.alpha = 1;
                sceneff.va = mine.x; //sx
                sceneff.vb = mine.y; //sy
                sceneff.vc = angle; //angle
                sceneff.vd = 70; //width
                sceneff.ve = 35; //height
                sceneff.effInterv = 200;
                sceneff.dieTime = 600;
                sceneff.updateFunc = HuangZhongArrow1.ZGLTHUNDERFUNC2;
                mine.scene.addUnit(sceneff);
            }
            return;
        }
        this.dmgProxy.effect(times);
    };
    return ZhuGeLiangSkillX;
}(SkillBase));
__reflect(ZhuGeLiangSkillX.prototype, "ZhuGeLiangSkillX");
