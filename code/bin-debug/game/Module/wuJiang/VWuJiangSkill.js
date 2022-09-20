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
var VWuJiangSkill = (function (_super) {
    __extends(VWuJiangSkill, _super);
    function VWuJiangSkill() {
        return _super.call(this) || this;
    }
    VWuJiangSkill.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "VWuJiangSkill"));
    };
    VWuJiangSkill.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_5.png", this.bg);
    };
    Object.defineProperty(VWuJiangSkill.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (value) {
            this._vo = value;
            this.lbLevel.text = "";
            var skill = Config.herolvskill_211[value];
            if (skill) {
                if (skill.power == 0) {
                    this.imgLocked.visible = true;
                }
                else {
                    this.imgLocked.visible = false;
                }
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + skill.icon + ".png", this.imgIcon);
                this.imgIcon.visible = true;
                var level = skill.id % 1000;
                if (level > 0) {
                    this.lbLevel.text = "Lv." + level;
                }
                this.noticeImg.visible = Model_WuJiang.checkSkill(value);
            }
            else {
                this.imgLocked.visible = true;
                this.imgIcon.visible = false;
                this.noticeImg.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    VWuJiangSkill.URL = "ui://zyx92gzwtht44";
    return VWuJiangSkill;
}(fairygui.GComponent));
__reflect(VWuJiangSkill.prototype, "VWuJiangSkill");
