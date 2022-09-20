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
var View_ShaoZhu_SkillDataPanel = (function (_super) {
    __extends(View_ShaoZhu_SkillDataPanel, _super);
    function View_ShaoZhu_SkillDataPanel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_ShaoZhu_SkillDataPanel.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ShaoZhu", "View_ShaoZhu_SkillDataPanel").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.attLb.leading = 18;
        _super.prototype.childrenCreated.call(this);
    };
    View_ShaoZhu_SkillDataPanel.prototype.onShown = function () {
        var self = this;
        var cfg = self._args;
        self.skillGrid.updateShow(HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pz)), cfg.icon, false);
        self.attLb.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+", Color.getColorStr(2), Color.getColorStr(2));
        self.powerLb.text = cfg.power + "";
    };
    View_ShaoZhu_SkillDataPanel.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.SHAOZHU_ONESKILL);
    };
    View_ShaoZhu_SkillDataPanel.URL = "ui://p83wyb2bn0801d";
    return View_ShaoZhu_SkillDataPanel;
}(UIModalPanel));
__reflect(View_ShaoZhu_SkillDataPanel.prototype, "View_ShaoZhu_SkillDataPanel");
