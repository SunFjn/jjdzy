var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CloneRolePart = (function () {
    function CloneRolePart() {
        this.remainTime = 2500;
        this.autoRemove = 1; //自动移除
        this.aniTime = 0;
        this.aniInterv = 1000;
        this.attack_index = 0;
        this.offx = 0;
        this.offy = 0;
        this.scaleX = 1;
    }
    CloneRolePart.create = function () {
        var p = CloneRolePart.POOL;
        if (p.length) {
            return p.shift();
        }
        return new CloneRolePart();
    };
    CloneRolePart.prototype.update = function (ctx) {
        var self = this;
        self.remainTime -= ctx.dt;
        self.aniTime += ctx.dt;
        var perc = self.aniTime / self.aniInterv;
        self.parts.perc = perc;
        if (self.remainTime <= 0) {
            ctx.d = 1;
        }
    };
    CloneRolePart.prototype.onAdd = function () {
        var self = this;
        if (!self.parts) {
            self.parts = new Parts();
        }
        self.parts.x = self.offx;
        self.parts.y = self.offy;
        self.parts.scaleX = self.scaleX;
        self.role.view.addChild(self.parts);
        var body = self.parts.dic[1];
        if (!body) {
            body = Part.create();
            body.type = 1;
            body.dep = 5;
            self.parts.addPart(body);
        }
        var urlkey;
        var weaponkey;
        var actkey = 1;
        var weaponpic = self.role.godWeaponpic ? self.role.godWeaponpic : self.role.weaponpic;
        if (self.attack_index > 10) {
            urlkey = "body/" + self.role.body + "/skill_0" + (self.attack_index % 10) + "/ani";
            if (weaponpic) {
                weaponkey = "weapon/" + weaponpic + "/skill_0" + (self.attack_index % 10) + "/ani";
            }
        }
        else {
            urlkey = "body/" + self.role.body + "/attack_0" + self.attack_index + "/ani";
            if (weaponpic) {
                weaponkey = "weapon/" + weaponpic + "/attack_0" + self.attack_index + "/ani";
            }
        }
        self.parts.ptype = Parts.DIS_REAPEAT;
        if (urlkey) {
            self.parts.setPart(1, urlkey);
        }
        if (weaponpic) {
            var weapon = self.parts.dic[2];
            if (!weapon) {
                weapon = Part.create();
                weapon.type = 2;
                weapon.dep = 6;
                self.parts.addPart(weapon);
            }
            self.parts.setPart(2, weaponkey);
        }
        self.parts.setVal(actkey);
    };
    CloneRolePart.prototype.onRemove = function () {
        var self = this;
        self.aniTime = 0;
        self.scaleX = 1;
        self.parts.removePartExceptBody();
        if (self.role) {
            self.role.view.removeChild(self.parts);
        }
        self.role = null;
        if (CloneRolePart.POOL.indexOf(self) == -1)
            CloneRolePart.POOL.push(self);
    };
    CloneRolePart.prototype.onEvent = function (evt, arg) {
    };
    CloneRolePart.POOL = [];
    return CloneRolePart;
}());
__reflect(CloneRolePart.prototype, "CloneRolePart");
