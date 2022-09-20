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
var UIRole = (function (_super) {
    __extends(UIRole, _super);
    function UIRole() {
        var _this = _super.call(this) || this;
        _this.effList = [];
        _this._last = 0;
        _this.weaponDown = false;
        _this.isPlaySkill = false;
        _this.skillLoop = false;
        return _this;
    }
    UIRole.create = function () {
        var pool = UIRole.UIRoleP;
        return pool.length ? pool.pop() : new UIRole();
    };
    UIRole.prototype.createParts = function () {
        var self = this;
        var shadow = self.shadow = new StaticPart();
        shadow.setVal("s/1");
        shadow.setAct(4);
        self.view.addChild(shadow.mc);
        self.parts = new Parts();
        self.view.addChild(self.parts);
        var body = new Part();
        body.type = Parts.T_BODY;
        body.dep = Parts.P_BODY;
        self.parts.addPart(body);
    };
    UIRole.prototype.update = function (time) {
        var s = this;
        var dt = time - s._last;
        s._last = time;
        var ctx = { dt: dt };
        if (s.skillLogic) {
            if (s.isPlaySkill) {
                s.skillLogic.update(ctx);
            }
            else {
                if (s.skillLoop) {
                    if (s.skillLogic.CFGTIME && s.skillLogic.t >= s.skillLogic.CFGTIME)
                        s.skillLogic.onAdd();
                }
                else {
                    s.attack_index = s.attack_state = 0;
                    s.invalid |= 1;
                }
            }
        }
        s.aniTime += ctx.dt;
        var perc = s.aniTime / s.aniInterv;
        s.parts.perc = perc;
        s.updateState();
        var len = s.plugs.length;
        var plugArg = s.plugCtx;
        var plugDirty = 0;
        for (var i = 0; i < len; i++) {
            var plug = s.plugs[i];
            if (!plug) {
                plugDirty++;
                continue;
            }
            plugArg.d = 0;
            plugArg.dt = ctx.dt;
            plug.update(plugArg);
            if (plugArg.d) {
                s.plugs[i] = null;
                plug.onRemove();
                plugDirty++;
            }
            else {
            }
        }
        if (plugDirty) {
            ArrayUitl.cleannull(s.plugs);
        }
        var arrawDirty = 0;
        for (var i = 0; i < s.effList.length; i++) {
            var arraw = s.effList[i];
            if (arraw) {
                arraw.update(ctx);
                if (ctx.d) {
                    s.effList[i] = null;
                    arraw.onRemove();
                    i--;
                    arrawDirty++;
                }
            }
        }
        if (arrawDirty) {
            ArrayUitl.cleannull(s.effList);
        }
        if (s.extraFrameFun) {
            s.extraFrameFun();
        }
    };
    UIRole.prototype.setJob = function (v) {
        var body = Model_player.getBodyOrWeaponID(v);
        this.setBody(body);
        this.setWeapon(v);
    };
    UIRole.prototype.setDir = function (dir) {
        var s = this;
        // if (s.faceDir != dir) {
        s.faceDir = dir;
        s.invalid |= 2;
        s.updateWay();
        // }
    };
    UIRole.prototype.updateState = function () {
        var invalid = this.invalid;
        if (invalid) {
            if (invalid & 1) {
                this.updateAction();
            }
            if (invalid & 2) {
                this.updateWay();
            }
            this.invalid = 0;
        }
    };
    UIRole.prototype.setAction = function (val) {
        if (this.move_state != val) {
            this.invalid = 1;
            this.move_state = val;
        }
    };
    UIRole.prototype.updateAction = function () {
        var self = this;
        if (self.changeModel > 0) {
            self.updateChangeModel();
            return;
        }
        var urlkey;
        var weaponkey;
        var actkey = 1;
        var needSort;
        var isWeaponDown = false;
        var isHorseDown = false;
        var nameyStatey = 0;
        var weaponpic = self.godWeaponpic ? self.godWeaponpic : self.weaponpic;
        var horseMod = self.horseMod;
        var horseWingUrl = "";
        if (self.attack_state) {
            if (self.attack_index > 20) {
                urlkey = "body/" + self.body + "/use_0" + (self.attack_index % 10) + "/ani";
                if (weaponpic) {
                    weaponkey = "weapon/" + weaponpic + "/use_0" + (self.attack_index % 10) + "/ani";
                }
            }
            else if (self.attack_index > 10) {
                urlkey = "body/" + self.body + "/skill_0" + (self.attack_index % 10) + "/ani";
                if (weaponpic) {
                    weaponkey = "weapon/" + weaponpic + "/skill_0" + (self.attack_index % 10) + "/ani";
                }
            }
            else {
                if (self.attack_index == 9) {
                    urlkey = "body/" + self.body + "/rush/ani";
                    if (weaponpic) {
                        weaponkey = "weapon/" + weaponpic + "/rush/ani";
                    }
                }
                else {
                    urlkey = "body/" + self.body + "/attack_0" + self.attack_index + "/ani";
                    if (weaponpic) {
                        weaponkey = "weapon/" + weaponpic + "/attack_0" + self.attack_index + "/ani";
                    }
                }
            }
        }
        else {
            if (self.move_state) {
                if (horseMod) {
                    horseMod = "body/" + horseMod + "/ride/ani";
                    horseWingUrl = "body/" + self.horseMod + "/wing/ani";
                    urlkey = "body/" + self.body + "/ride/ani";
                    if (weaponpic) {
                        weaponkey = null;
                    }
                }
                else {
                    urlkey = "body/" + self.body + "/run/ani";
                    if (weaponpic) {
                        weaponkey = "weapon/" + weaponpic + "/run/ani";
                    }
                }
            }
            else {
                if (horseMod) {
                    horseMod = "body/" + horseMod + "/ride_st/ani";
                    horseWingUrl = "body/" + self.horseMod + "/wing_st/ani";
                    urlkey = "body/" + self.body + "/ride_st/ani";
                    if (weaponpic) {
                        weaponkey = null;
                    }
                }
                else {
                    urlkey = "body/" + self.body + "/stand/ani";
                    if (weaponpic) {
                        weaponkey = "weapon/" + weaponpic + "/stand/ani";
                    }
                }
            }
            self.parts.ptype = Parts.DIS_REAPEAT;
        }
        if (urlkey) {
            self.parts.setPart(Parts.T_BODY, urlkey);
        }
        if (weaponkey) {
            var weapon = self.parts.dic[Parts.T_WEAPON];
            if (!weapon) {
                weapon = Part.create();
                weapon.type = Parts.T_WEAPON;
                weapon.dep = Parts.P_WEAPON;
                self.parts.addPart(weapon);
            }
            if (self.weaponDown != isWeaponDown) {
                self.weaponDown = isWeaponDown;
                weapon.dep = Parts.D_WEAPON_DOWN;
                needSort = true;
            }
            self.parts.setPart(Parts.T_WEAPON, weaponkey);
        }
        else {
            self.parts.removePartByType(Parts.T_WEAPON); //移除PART
        }
        if (horseMod) {
            var horse = self.parts.dic[Parts.T_HORSE];
            if (!horse) {
                horse = Part.create();
                horse.type = Parts.T_HORSE;
                horse.dep = Parts.D_HORSE_DOWN;
                self.parts.addPart(horse);
            }
            if (Config.zq_773[self.horseId].zhezhao == 1) {
                var horseWing = self.parts.dic[Parts.T_HORSE_WING];
                if (!horseWing) {
                    horseWing = Part.create();
                    horseWing.type = Parts.T_HORSE_WING;
                    horseWing.dep = Parts.P_HORSE;
                    self.parts.addPart(horseWing);
                }
                self.parts.setPart(Parts.T_HORSE_WING, horseWingUrl);
            }
            else {
                self.parts.removePartByType(Parts.T_HORSE_WING); //移除PART
            }
            needSort = true;
            self.parts.setPart(Parts.T_HORSE, horseMod);
        }
        else {
            self.parts.removePartByType(Parts.T_HORSE); //移除PART
            self.parts.removePartByType(Parts.T_HORSE_WING); //移除PART
        }
        if (self.charType == 1) {
            needSort = true;
        }
        self.parts.setVal(actkey);
        if (needSort) {
            self.parts.sort();
        }
        if (self.nameStatey != nameyStatey) {
            self.headGroup.y = self.namey + nameyStatey;
            self.nameStatey = nameyStatey;
        }
    };
    UIRole.prototype.playSkillID = function (skillID, skillLoop) {
        if (skillLoop === void 0) { skillLoop = true; }
        var bestSkill = Vo_Skill.create(skillID, 1, 1);
        if (this.skillLogic) {
            this.skillLogic.onRemove();
        }
        this.skillLogic = UIRoleSkillBase.getPlayLogic(this, bestSkill);
        this.skillLogic.onAdd();
        this.skillLoop = skillLoop;
    };
    UIRole.prototype.onAdd = function () {
        var self = this;
        self.invalid |= 1;
        if (!self.view.parent)
            self.uiparent.addChild(self.view);
        self.view.visible = true;
        if (!Timer.instance.has(self.update, self)) {
            self._last = egret.getTimer();
            Timer.instance.listen(self.update, self, 16); //30fps
        }
    };
    UIRole.prototype.setXY = function (xx, yy) {
        this.x = xx;
        this.y = yy;
    };
    UIRole.prototype.synchroPos = function () {
        this.view.x = this.x;
        this.view.y = this.y;
    };
    UIRole.prototype.setPos = function (xx, yy) {
        this.view.x = xx;
        this.view.y = yy;
    };
    UIRole.prototype.setScaleXY = function (xx, yy) {
        this.view.$setScaleX(xx);
        this.view.$setScaleY(yy);
    };
    UIRole.prototype.onHide = function () {
        var s = this;
        Timer.instance.remove(s.update, s);
        if (s.view.parent)
            s.view.parent.removeChild(s.view);
        s.invalid |= 255;
        s.setWeapon(0);
        s.setBody(0);
        s.setHorseId(0);
        s.setScaleXY(1, 1);
        s.parts.setPart(Parts.T_BODY, null);
        s.parts.setPart(Parts.T_WEAPON, null);
        s.uiparent = null;
    };
    UIRole.prototype.onRemove = function () {
        var s = this;
        for (var i = s.plugs.length - 1; i >= 0; i--) {
            var plug = s.plugs[i];
            if (plug && plug.autoRemove) {
                s.removePlug(plug);
            }
        }
        for (var i = 0; i < s.effList.length; i++) {
            var arraw = s.effList[i];
            if (arraw) {
                arraw.onRemove();
                arraw = null;
            }
        }
        s.effList = [];
        if (s.skillLogic) {
            s.skillLogic.onRemove();
            s.skillLogic = null;
        }
        s.isPlaySkill = false;
        s.onHide();
        s.extraFrameFun = null;
        s.data = null;
        s.setDir(1);
        s.skillLoop = false;
        s.resetVar();
        if (UIRole.UIRoleP.indexOf(s) < 0)
            UIRole.UIRoleP.push(s);
    };
    UIRole.UIRoleP = [];
    return UIRole;
}(SceneCharRole));
__reflect(UIRole.prototype, "UIRole");
