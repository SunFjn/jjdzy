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
var ZhuGeLiangSkillZ = (function (_super) {
    __extends(ZhuGeLiangSkillZ, _super);
    function ZhuGeLiangSkillZ() {
        var _this = _super.call(this) || this;
        _this.CFGTIME = 1000;
        _this.EFFECTTIME1 = 300;
        _this.EFFECTTIME2 = 500;
        _this.EFFECTTIME3 = 700;
        _this.lifeTime = 0;
        _this.attackIndex = 1;
        return _this;
    }
    ZhuGeLiangSkillZ.create = function (role, skill) {
        var ret = new ZhuGeLiangSkillZ();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    ZhuGeLiangSkillZ.prototype.update = function (ctx) {
        var nt = this.lifeTime + ctx.dt;
        if (nt >= this.EFFECTTIME1 && this.lifeTime < this.EFFECTTIME1) {
            this.dealHurt(1);
        }
        if (nt >= this.EFFECTTIME2 && this.lifeTime < this.EFFECTTIME2) {
            this.dealHurt(2);
        }
        if (nt >= this.EFFECTTIME3 && this.lifeTime < this.EFFECTTIME3) {
            this.dealHurt(3);
        }
        if (nt >= this.CFGTIME) {
            ctx.d = 1;
        }
        //this.role.scene.moveRole(this.role,4 * this.role.faceDir,0,0);
        this.lifeTime = nt;
    };
    ZhuGeLiangSkillZ.prototype.onAdd = function () {
        this.role.attack_index = 11;
        this.role.attack_state++;
        this.role.invalid |= 1;
        this.role.setPlayTime(this.CFGTIME, false);
    };
    ZhuGeLiangSkillZ.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
    };
    ZhuGeLiangSkillZ.prototype.dealHurt = function (times) {
        var box3d = Box3D.create();
        var mine = this.role;
        if (1) {
            var sceneff = new HuangZhongArrow1();
            var farx;
            var fary;
            if (times == 1) {
                sceneff.va = 0.35;
                sceneff.initWithRoleFace(this.role, "eff/2_2", 1, 300, false, 0, -90);
            }
            else if (times == 2) {
                sceneff.va = 0.4;
                sceneff.initWithRoleFace(this.role, "eff/2_2", 1, 300, false, 0, -120);
            }
            else {
                sceneff.va = 0.45;
                sceneff.initWithRoleFace(this.role, "eff/2_2", 1, 300, false, 0, -150);
            }
            sceneff.alpha = 2;
            sceneff.updateFunc = HuangZhongArrow1.ZGL2FUNC;
            mine.scene.addUnit(sceneff);
            this.role.scene.shake(0, 5);
        }
        this.dmgProxy.effect(times);
    };
    return ZhuGeLiangSkillZ;
}(SkillBase));
__reflect(ZhuGeLiangSkillZ.prototype, "ZhuGeLiangSkillZ");
