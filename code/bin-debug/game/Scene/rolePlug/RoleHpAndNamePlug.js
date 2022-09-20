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
var RoleHpAndNamePlug = (function (_super) {
    __extends(RoleHpAndNamePlug, _super);
    function RoleHpAndNamePlug() {
        var _this = _super.call(this) || this;
        /** 角色被移除时是否自动移除该挂件*/
        _this.autoRemove = 1;
        return _this;
    }
    RoleHpAndNamePlug.create = function (isSelf) {
        if (isSelf === void 0) { isSelf = true; }
        RoleHpAndNamePlug.isSelf = isSelf;
        return RoleHpAndNamePlug.POOL.length ? RoleHpAndNamePlug.POOL.pop() : RoleHpAndNamePlug.createInstance();
    };
    RoleHpAndNamePlug.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "BattleHpAndName"));
    };
    RoleHpAndNamePlug.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    RoleHpAndNamePlug.prototype.update = function () {
        var a = this;
        a.updateHp();
        if (a.role.nameBarVild)
            a.updateShow();
    };
    RoleHpAndNamePlug.prototype.onAdd = function () {
        var s = this;
        s.role.headGroup.addChild(s.displayObject);
        s.role.nameBarVild = true;
        if (GGlobal.modelGuanQia.inGuanQiaBoss() || GGlobal.sceneType != SceneCtrl.GUANQIA) {
            if (s.role.curhp < s.role.maxhp) {
                s.role.curShield = 0;
            }
            s.role.showHpShield(s.role.curShield > 0);
            s.shieldImg.visible = s.role.curShield > 0;
        }
        else {
            s.role.showHpShield(false);
            s.shieldImg.visible = false;
        }
    };
    RoleHpAndNamePlug.prototype.updateHp = function () {
        var s = this;
        s.hpbar.max = s.role.maxhp;
        s.hpbar.value = s.role.curhp;
        if (GGlobal.modelGuanQia.inGuanQiaBoss() || GGlobal.sceneType != SceneCtrl.GUANQIA) {
            if (s.role.curhp > s.role.maxhp) {
                s.role.curShield = s.role.curhp - s.role.maxhp;
            }
            else if (s.role.curhp < s.role.maxhp) {
                s.role.curShield = 0;
            }
            if (s.role.curShield > 0) {
                s.role.showHpShield(true);
                s.shieldImg.visible = true;
                s.shieldImg.scaleX = s.role.curShield / s.role.maxShield;
            }
            else {
                s.shieldImg.visible = false;
                s.role.showHpShield(false);
            }
        }
        else {
            s.shieldImg.visible = false;
            s.role.showHpShield(false);
        }
    };
    RoleHpAndNamePlug.prototype.updateShow = function () {
        var a = this;
        a.role.nameBarVild = false;
        a.nameLb.text = a.role.name;
        if (a.role.country > 0) {
            a.countryImg.url = CommonManager.getCommonUrl("country" + a.role.country);
            a.countryImg.visible = true;
            a.jxLb.text = Model_GuanXian.getJiangXianStr(1);
        }
        else {
            a.countryImg.visible = false;
        }
        if (a.role.guanzhi > 0) {
            a.jxLb.text = Model_GuanXian.getJiangXianStr(a.role.guanzhi);
            a.jxLb.visible = true;
        }
        else {
            a.jxLb.visible = false;
        }
        a.jxLb.x = a.countryImg.visible ? 54 : (172 - a.jxLb.width) >> 1;
        if (a.role.title > 0) {
            var cfg = Config.chenghao_702[a.role.title];
            a.titleImg.visible = true;
            ImageLoader.instance.loader(Enum_Path.TITLE_URL + cfg.picture + ".png", a.titleImg, Handler.create(this, this.resetTitlePos));
            if (a.role.guanzhi <= 0 && a.role.country <= 0) {
                a.titleImg.setXY(61, -96);
            }
            else {
                a.titleImg.setXY(61, -116);
            }
        }
        else {
            a.titleImg.visible = false;
        }
    };
    RoleHpAndNamePlug.prototype.resetTitlePos = function () {
        var a = this;
        var xx = (172 - a.titleImg.width) >> 1;
        if (!a.role) {
            return;
        }
        if (a.role.guanzhi <= 0 && a.role.country <= 0) {
            a.titleImg.setXY(xx, 25 - a.titleImg.height);
        }
        else {
            a.titleImg.setXY(xx, 21 - a.titleImg.height);
        }
    };
    RoleHpAndNamePlug.prototype.onRemove = function () {
        var s = this;
        s.role.nameBarVild = true;
        s.role.showHpShield(false);
        s.role.headGroup.removeChild(s.displayObject);
        s.role = null;
    };
    RoleHpAndNamePlug.prototype.onEvent = function (evt, arg) {
        var self = this;
        if (evt == EVT_SC.EVT_HURT) {
            self.hpbar.max = self.role.maxhp;
            self.hpbar.value = self.role.curhp;
        }
    };
    RoleHpAndNamePlug.POOL = [];
    RoleHpAndNamePlug.URL = "ui://jvxpx9emta899l";
    return RoleHpAndNamePlug;
}(fairygui.GComponent));
__reflect(RoleHpAndNamePlug.prototype, "RoleHpAndNamePlug");
