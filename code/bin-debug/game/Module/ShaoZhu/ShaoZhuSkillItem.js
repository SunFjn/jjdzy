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
var ShaoZhuSkillItem = (function (_super) {
    __extends(ShaoZhuSkillItem, _super);
    function ShaoZhuSkillItem() {
        return _super.call(this) || this;
    }
    ShaoZhuSkillItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "ShaoZhuSkillItem"));
    };
    ShaoZhuSkillItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ShaoZhuSkillItem.prototype.updateShow = function (cfg) {
        var self = this;
        IconUtil.setImg(self.iconImg, Enum_Path.SKILL_URL + cfg.icon + ".png");
        self.powerLb.text = cfg.power + "";
        self.nameLb.text = cfg.name;
        self.nameLb.color = Color.getColorInt(cfg.pz);
        self.attLb.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+", Color.getColorStr(2), Color.getColorStr(1));
    };
    ShaoZhuSkillItem.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.iconImg, null);
    };
    ShaoZhuSkillItem.URL = "ui://p83wyb2blsg11g";
    return ShaoZhuSkillItem;
}(fairygui.GComponent));
__reflect(ShaoZhuSkillItem.prototype, "ShaoZhuSkillItem");
