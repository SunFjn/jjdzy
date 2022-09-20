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
var SkillGrid = (function (_super) {
    __extends(SkillGrid, _super);
    function SkillGrid() {
        return _super.call(this) || this;
    }
    SkillGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "SkillGrid"));
    };
    SkillGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.bg = (this.getChild("bg"));
        this.skillIcon = (this.getChild("skillIcon"));
        this.lbCD = (this.getChild("lbCD"));
    };
    SkillGrid.prototype.setVo = function (value) {
        this.vo = value;
        if (value) {
            ImageLoader.instance.loader(Enum_Path.SKILL_URL + value.icon + ".png", this.skillIcon);
            this.skillIcon.visible = true;
            this.lbCD.visible = true;
        }
        else {
            this.skillIcon.visible = false;
            this.lbCD.visible = false;
        }
    };
    SkillGrid.prototype.setCDRemain = function (remainTime) {
        if (remainTime <= 0) {
            this.lbCD.visible = false;
        }
        else {
            var remainSec = Math.ceil(remainTime / 1000);
            this.lbCD.text = remainSec.toString();
            this.lbCD.visible = true;
        }
    };
    SkillGrid.URL = "ui://7gxkx46wtw1l2f";
    return SkillGrid;
}(fairygui.GButton));
__reflect(SkillGrid.prototype, "SkillGrid", ["ISkillGrid"]);
