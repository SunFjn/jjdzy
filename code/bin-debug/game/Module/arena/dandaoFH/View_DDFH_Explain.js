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
var View_DDFH_Explain = (function (_super) {
    __extends(View_DDFH_Explain, _super);
    function View_DDFH_Explain() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_DDFH_Explain.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("Arena", "View_DDFH_Explain").asCom;
        a.contentPane = a.view;
        var explainLb = a.view.getChild("explainLb").asRichTextField;
        explainLb.text = Config.wfsm_200[1603].tips;
        _super.prototype.childrenCreated.call(this);
    };
    View_DDFH_Explain.prototype.onShown = function () {
    };
    View_DDFH_Explain.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.DANDAO_FUHUI_EXPLAIN);
    };
    View_DDFH_Explain.URL = "ui://me1skowljs6li";
    return View_DDFH_Explain;
}(UIModalPanel));
__reflect(View_DDFH_Explain.prototype, "View_DDFH_Explain");
