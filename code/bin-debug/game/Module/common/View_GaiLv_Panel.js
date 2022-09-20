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
var View_GaiLv_Panel = (function (_super) {
    __extends(View_GaiLv_Panel, _super);
    function View_GaiLv_Panel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_GaiLv_Panel.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("common", "View_GaiLv_Panel").asCom;
        s.contentPane = s.view;
        s.titleIcon = (s.view.getChild("titleIcon"));
        s.rewardLb = (s.view.getChild("rewardLb"));
        s.rewardLb.leading = 6;
        s.numLb = (s.view.getChild("numLb"));
        s.numLb.leading = 6;
        _super.prototype.childrenCreated.call(this);
    };
    View_GaiLv_Panel.prototype.updateShow = function () {
        var s = this;
        var showStr = "";
        var numStr = "";
        var type = s._args;
        var index = 1;
        while (index) {
            var cfg = Config.showRate_302[type * 1000 + index];
            if (cfg) {
                if (cfg.showType == 1) {
                    if (index == 1) {
                        s.titleIcon.url = "ui://jvxpx9emz05i3f4";
                        showStr += cfg.name;
                        numStr += (cfg.showRate / 1000) + "%";
                    }
                    else {
                        showStr += "\n" + cfg.name;
                        numStr += "\n" + (cfg.showRate / 1000) + "%";
                    }
                }
                else {
                    if (index == 1) {
                        s.titleIcon.url = "ui://jvxpx9emz05i3f5";
                        showStr += cfg.name;
                        numStr += cfg.num + "次";
                    }
                    else {
                        showStr += "\n" + cfg.name;
                        numStr += "\n" + cfg.num + "次";
                    }
                }
                index++;
            }
            else {
                index = 0;
                break;
            }
        }
        s.rewardLb.text = showStr;
        s.numLb.text = numStr;
    };
    View_GaiLv_Panel.prototype.onShown = function () {
        this.updateShow();
    };
    View_GaiLv_Panel.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.GAILV);
    };
    View_GaiLv_Panel.URL = "ui://jvxpx9empdbd3f1";
    return View_GaiLv_Panel;
}(UIModalPanel));
__reflect(View_GaiLv_Panel.prototype, "View_GaiLv_Panel");
