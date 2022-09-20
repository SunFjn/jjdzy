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
var View_YanHui_BKList = (function (_super) {
    __extends(View_YanHui_BKList, _super);
    function View_YanHui_BKList() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_YanHui_BKList.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "View_YanHui_BKList"));
    };
    View_YanHui_BKList.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_BKList").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    View_YanHui_BKList.prototype.onShown = function () {
        var self = this;
        var model = GGlobal.modelYanHui;
        var str = "";
        for (var i = 0; i < model.bkList.length; i++) {
            var cfg = Config.partylw_298[model.bkList[i].rewardId];
            str += (i == 0 ? "" : "\n") + HtmlUtil.fontNoSize(model.bkList[i].name, Color.getColorStr(3)) + "携带" + HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.id + 3))
                + "前来赴宴 宴会氛围值" + HtmlUtil.fontNoSize("+" + cfg.fw, Color.getColorStr(3));
        }
        self.contentLb.text = str;
    };
    View_YanHui_BKList.prototype.onHide = function () {
    };
    View_YanHui_BKList.URL = "ui://4x7dk3lhgz25i";
    return View_YanHui_BKList;
}(UIModalPanel));
__reflect(View_YanHui_BKList.prototype, "View_YanHui_BKList");
