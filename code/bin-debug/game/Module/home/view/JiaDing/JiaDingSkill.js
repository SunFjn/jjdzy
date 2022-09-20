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
var JiaDingSkill = (function (_super) {
    __extends(JiaDingSkill, _super);
    function JiaDingSkill() {
        return _super.call(this) || this;
    }
    JiaDingSkill.createInstance = function () {
        return (fairygui.UIPackage.createObject("JiaDing", "JiaDingSkill"));
    };
    JiaDingSkill.prototype.setVo = function (vo) {
        var self = this;
        self.vo = vo;
        IconUtil.setImg(self._iconObject.asLoader, Enum_Path.ICON70_URL + vo.skill + ".png");
        self.text = vo.name;
        self.addClickListener(self.openTip, self);
    };
    JiaDingSkill.prototype.openTip = function () {
        GGlobal.layerMgr.open(UIConst.HOME_JIADING_SKILL, this.vo);
    };
    JiaDingSkill.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self._iconObject.asLoader, null);
        self.removeClickListener(self.openTip, self);
    };
    JiaDingSkill.URL = "ui://ypo8uejwgz25a";
    return JiaDingSkill;
}(fairygui.GLabel));
__reflect(JiaDingSkill.prototype, "JiaDingSkill");
