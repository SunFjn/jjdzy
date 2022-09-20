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
var CommonAttack2 = (function (_super) {
    __extends(CommonAttack2, _super);
    function CommonAttack2() {
        var _this = _super.call(this) || this;
        _this.T = 600;
        _this.T1 = 300;
        _this.lifeTime = 0;
        return _this;
    }
    CommonAttack2.create = function (role, skill) {
        var ret = new CommonAttack2();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    CommonAttack2.prototype.update = function (ctx) {
        var nt = this.lifeTime + ctx.dt;
        if (nt >= this.T1 && this.lifeTime < this.T1) {
            this.dealHurt();
        }
        if (nt >= this.T) {
            ctx.d = 1;
        }
        //this.role.scene.moveRole(this.role,11 * this.role.faceDir,0,0);
        this.lifeTime = nt;
    };
    CommonAttack2.prototype.onAdd = function () {
        var self = this;
        self.T = self.skill.cfg.a.t;
        self.T1 = self.skill.cfg.a[1].t;
        self.role.attack_index = 2;
        self.role.attack_state++;
        self.role.invalid |= 1;
        self.role.setPlayTime(self.T, false);
    };
    CommonAttack2.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.role.attack_state--;
        this.role.invalid |= 1;
        this.role.setPlayTime();
    };
    CommonAttack2.prototype.dealHurt = function () {
        this.dmgProxy.effect(1);
    };
    return CommonAttack2;
}(SkillBase));
__reflect(CommonAttack2.prototype, "CommonAttack2");
