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
var ChildTipBagWuJ = (function (_super) {
    __extends(ChildTipBagWuJ, _super);
    function ChildTipBagWuJ() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        return _this;
    }
    ChildTipBagWuJ.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ChildTipBagWuJ"));
    };
    ChildTipBagWuJ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Object.defineProperty(ChildTipBagWuJ.prototype, "vo", {
        set: function (v) {
            var self = this;
            var tzPas = v.tzPas;
            var mx;
            var weapon;
            var hero;
            var hasSkill = true;
            if (v.tz == UIConst.WU_JIANG_SZ) {
                mx = Config.sz_739[tzPas].moxing;
                weapon = tzPas;
                hero = Config.hero_211[Math.floor(tzPas / 1000)];
            }
            else {
                hero = Config.hero_211[tzPas];
                weapon = mx = hero.type;
            }
            if (hasSkill) {
                var skillsArr = ConfigHelp.SplitStr(hero.skills);
                var secSkill = skillsArr[1][0];
                self.skill0.setVo(skillsArr[0][0], 0);
                self.skill1.setVo(skillsArr[1][0], 1);
                self.skill2.setVo(skillsArr[2][0], 2);
                self.skill3.setVo(skillsArr[3][0], 3);
                self.skill0.visible = true;
                self.skill1.visible = true;
                self.skill2.visible = true;
                self.skill3.visible = true;
            }
            else {
                self.skill0.visible = false;
                self.skill1.visible = false;
                self.skill2.visible = false;
                self.skill3.visible = false;
            }
            if (!self.awatar) {
                self.awatar = UIRole.create();
                self.awatar.setPos(self.img.x, self.img.y);
                self.awatar.uiparent = self.displayListContainer;
                self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
            }
            self.awatar.setBody(mx);
            self.awatar.setWeapon(weapon);
            self.awatar.onAdd();
            self.awatar.setScaleXY(1.5, 1.5);
        },
        enumerable: true,
        configurable: true
    });
    ChildTipBagWuJ.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
    };
    ChildTipBagWuJ.URL = "ui://jvxpx9emq2i93g1";
    return ChildTipBagWuJ;
}(fairygui.GComponent));
__reflect(ChildTipBagWuJ.prototype, "ChildTipBagWuJ");
