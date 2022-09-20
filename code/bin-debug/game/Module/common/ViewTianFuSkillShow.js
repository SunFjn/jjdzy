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
var ViewTianFuSkillShow = (function (_super) {
    __extends(ViewTianFuSkillShow, _super);
    function ViewTianFuSkillShow() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewTianFuSkillShow.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewTianFuSkillShow"));
    };
    ViewTianFuSkillShow.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "ViewTianFuSkillShow").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewTianFuSkillShow.prototype.onShown = function () {
        var s = this;
        var data = this._args;
        s.gridSkill.setVo(data.skillid, data.level);
        s.lbDescription.text = SkillUtil.getBuffDescription(data.id, data.level);
    };
    ViewTianFuSkillShow.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.TIANFU_SKILL_SHOW);
    };
    ViewTianFuSkillShow.URL = "ui://jvxpx9empb4s3gk";
    return ViewTianFuSkillShow;
}(UIModalPanel));
__reflect(ViewTianFuSkillShow.prototype, "ViewTianFuSkillShow");
