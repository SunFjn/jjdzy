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
var ZLiaoSki_1007 = (function (_super) {
    __extends(ZLiaoSki_1007, _super);
    function ZLiaoSki_1007() {
        var _this = _super.call(this) || this;
        _this.lifeTime = 0;
        _this.et = 0;
        return _this;
    }
    ZLiaoSki_1007.create = function (role, skill) {
        var ret = new ZLiaoSki_1007();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    ZLiaoSki_1007.prototype.update = function (ctx) {
        var self = this;
        var nt = self.lifeTime + ctx.dt;
        if (nt >= self.ET1 && self.lifeTime < self.ET1) {
            self.et++;
            self.ef1.va = self.role.faceDir * 20;
            self.ef2.va = self.ef1.va;
        }
        if (nt >= self.ET2 && self.lifeTime < self.ET2) {
            self.et++;
            self.dealHurt(1);
        }
        if (nt >= self.ET3 && self.lifeTime < self.ET3) {
            self.et++;
            self.dealHurt(2);
        }
        if (nt >= self.CFGTIME) {
            ctx.d = 1;
        }
        //this.role.scene.moveRole(this.role, this.role.faceDir * 6, 0, 0);
        //this.role.scene.moveRole(this.role,4 * this.role.faceDir,0,0);
        self.lifeTime = nt;
    };
    ZLiaoSki_1007.prototype.onAdd = function () {
        var self = this;
        self.CFGTIME = 835;
        self.ET1 = 500;
        self.ET2 = self.skill.cfg.a[1].t;
        self.ET3 = self.skill.cfg.a[2].t;
        self.role.immuneHSt++;
        self.role.attack_index = 2;
        self.role.attack_state++;
        self.role.invalid |= 1;
        self.role.setPlayTime(self.CFGTIME, false);
        self.ef1 = HuangZhongArrow1.create();
        self.ef1.initWithRoleFace(self.role, "eff/9017", 1, 500, true, 30, -40);
        self.ef1.lifeTime = 0;
        self.ef2 = HuangZhongArrow1.create();
        self.ef2.initWithRoleFace(self.role, "eff/9017", 1, 500, true, -30, -80);
        self.ef2.lifeTime = 0;
        self.ef1.dep = self.role.y + 10;
        self.ef2.dep = self.role.y - 10;
        self.ef1.dieTime = self.ef2.dieTime = 1500;
        self.ef1.va = self.ef1.vb = 0;
        self.ef2.va = self.ef2.vb = 0;
        self.ef1.updateFunc = self.ef2.updateFunc = HuangZhongArrow1.ZY3FUNC;
        self.role.scene.addUnit(self.ef1);
        self.role.scene.addUnit(self.ef2);
    };
    ZLiaoSki_1007.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.role.immuneHSt--;
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
        if (this.et == 0 && this.ef1.scene) {
            this.role.scene.removeUnit(this.ef1);
            this.role.scene.removeUnit(this.ef2);
            this.ef1 = this.ef2 = null;
        }
    };
    ZLiaoSki_1007.prototype.dealHurt = function (times) {
        this.dmgProxy.effect(times);
    };
    return ZLiaoSki_1007;
}(SkillBase));
__reflect(ZLiaoSki_1007.prototype, "ZLiaoSki_1007");
