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
var View_JiaDingSkill_Tips = (function (_super) {
    __extends(View_JiaDingSkill_Tips, _super);
    function View_JiaDingSkill_Tips() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_JiaDingSkill_Tips.createInstance = function () {
        return (fairygui.UIPackage.createObject("JiaDing", "View_JiaDingSkill_Tips"));
    };
    View_JiaDingSkill_Tips.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("JiaDing", "View_JiaDingSkill_Tips").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    View_JiaDingSkill_Tips.prototype.onShown = function () {
        var self = this;
        self.vo = self._args;
        self.skillLb.setVo(self.vo);
        self.skillDesLb.text = ConfigHelp.reTxt(self.vo.xiaoguo, self.vo.canshu1 / 1000, self.vo.canshu2 / 1000);
    };
    View_JiaDingSkill_Tips.prototype.onHide = function () {
        this.skillLb.clean();
    };
    View_JiaDingSkill_Tips.URL = "ui://ypo8uejwgz25e";
    return View_JiaDingSkill_Tips;
}(UIModalPanel));
__reflect(View_JiaDingSkill_Tips.prototype, "View_JiaDingSkill_Tips");
