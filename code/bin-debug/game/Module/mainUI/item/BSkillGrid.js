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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var BSkillGrid = (function (_super) {
    __extends(BSkillGrid, _super);
    function BSkillGrid() {
        return _super.call(this) || this;
    }
    BSkillGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "BSkillGrid"));
    };
    BSkillGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.angerBar0._content.fillMode = egret.BitmapFillMode.CLIP;
        self.angerBar0.height = 0;
        self.angerBar1._content.fillMode = egret.BitmapFillMode.CLIP;
        self.angerBar1.height = 0;
    };
    BSkillGrid.prototype.setVo = function (value) {
        this.vo = value;
        if (value) {
            ImageLoader.instance.loader(Enum_Path.SKILL_URL + value.icon + ".png", this.skillIcon);
            this.skillIcon.visible = true;
        }
        else {
            this.skillIcon.visible = false;
        }
    };
    BSkillGrid.prototype.setCDRemain = function (remainTime) {
    };
    BSkillGrid.prototype.setRage = function (value) {
        var max = Config.changshu_101[3].num / 200;
        if (value > max) {
            this.angerBar1.height = 89;
            this.angerBar0.height = (value - max) / max * 89;
        }
        else {
            this.angerBar1.height = value / max * 89;
            this.angerBar0.height = 0;
        }
    };
    BSkillGrid.prototype.setCM = function (value) {
        var self = this;
        self.cmImg.visible = value;
    };
    BSkillGrid.URL = "ui://7gxkx46wtw1l2g";
    return BSkillGrid;
}(fairygui.GButton));
__reflect(BSkillGrid.prototype, "BSkillGrid", ["ISkillGrid"]);
