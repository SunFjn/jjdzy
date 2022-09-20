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
var ShaoZhuSkillGrid = (function (_super) {
    __extends(ShaoZhuSkillGrid, _super);
    function ShaoZhuSkillGrid() {
        return _super.call(this) || this;
    }
    ShaoZhuSkillGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "ShaoZhuSkillGrid"));
    };
    ShaoZhuSkillGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.selImg.visible = false;
        self.lookBt.addClickListener(self.OnLook, self);
    };
    ShaoZhuSkillGrid.prototype.OnLook = function () {
        GGlobal.layerMgr.open(UIConst.SHAOZHU_ONESKILL, this.cfg);
    };
    ShaoZhuSkillGrid.prototype.updateShow = function (nameStr, iconStr, isLock) {
        if (isLock === void 0) { isLock = false; }
        var self = this;
        if (isLock) {
            IconUtil.setImg(self.iconImg, null);
        }
        else {
            if (iconStr) {
                IconUtil.setImg(self.iconImg, Enum_Path.SKILL_URL + iconStr + ".png");
            }
            else {
                IconUtil.setImg(self.iconImg, null);
            }
        }
        self.setLock(isLock);
        if (nameStr) {
            self.title = nameStr;
        }
        else {
            self.title = "";
        }
        self.lookBt.visible = self.cfg ? true : false;
    };
    ShaoZhuSkillGrid.prototype.choose = function (value) {
        this.selImg.visible = value;
    };
    ShaoZhuSkillGrid.prototype.setLock = function (value) {
        this.lockImg.visible = value;
    };
    ShaoZhuSkillGrid.prototype.clean = function () {
        var self = this;
        self.cfg = null;
        IconUtil.setImg(self.iconImg, null);
        self.selImg.visible = false;
    };
    ShaoZhuSkillGrid.URL = "ui://p83wyb2bng03d";
    return ShaoZhuSkillGrid;
}(fairygui.GLabel));
__reflect(ShaoZhuSkillGrid.prototype, "ShaoZhuSkillGrid");
