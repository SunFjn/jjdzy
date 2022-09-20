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
var ItemSkillGrid = (function (_super) {
    __extends(ItemSkillGrid, _super);
    function ItemSkillGrid() {
        var _this = _super.call(this) || this;
        _this.type = 0;
        return _this;
    }
    ItemSkillGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "ItemSkillGrid"));
    };
    ItemSkillGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ItemSkillGrid.prototype.setVo = function (value) {
        var self = this;
        self.vo = value;
        self.lbCD.visible = false;
        self.maskImg.visible = false;
        if (value) {
            IconUtil.setImg(self.skillIcon, Enum_Path.SKILL_URL + value.icon + ".png");
        }
        else {
            IconUtil.setImg(self.skillIcon, Enum_Path.SKILL_URL + self.type + ".png");
        }
    };
    ItemSkillGrid.prototype.setCDRemain = function (remainTime) {
        var self = this;
        if (remainTime <= 0) {
            self.lbCD.visible = false;
            self.maskImg.visible = false;
        }
        else {
            var remainSec = Math.ceil(remainTime / 1000);
            self.lbCD.text = remainSec.toString();
            self.lbCD.visible = true;
            self.maskImg.visible = true;
        }
    };
    ItemSkillGrid.prototype.setCM = function (value) {
        var self = this;
        self.cmImg.visible = value;
    };
    ItemSkillGrid.URL = "ui://7gxkx46wtw1l2h";
    return ItemSkillGrid;
}(fairygui.GButton));
__reflect(ItemSkillGrid.prototype, "ItemSkillGrid", ["ISkillGrid"]);
