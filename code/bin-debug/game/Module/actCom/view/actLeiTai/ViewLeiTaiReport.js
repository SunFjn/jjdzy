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
var ViewLeiTaiReport = (function (_super) {
    __extends(ViewLeiTaiReport, _super);
    function ViewLeiTaiReport() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewLeiTaiReport.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComLeiTai", "ViewLeiTaiReport"));
    };
    ViewLeiTaiReport.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("actComLeiTai", "ViewLeiTaiReport").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
    };
    ViewLeiTaiReport.prototype.onShown = function () {
        var s = this;
        var m = GGlobal.model_ActLeiTai;
        m.CG_GETNOTICELIST_11609();
        m.listen(Model_ActLeiTai.REPORT, s.upView, s);
        s.upView();
    };
    ViewLeiTaiReport.prototype.upView = function () {
        var s = this;
        var m = GGlobal.model_ActLeiTai;
        var arr = m.reportArr;
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            if (v.res == 0) {
                str += "很遗憾，" + HtmlUtil.fontNoSize(v.name, Color.TEXT_YELLOW) + "击败了你，成为新的擂主";
            }
            else {
                str += HtmlUtil.fontNoSize(v.name, Color.TEXT_YELLOW) + "不自量力前来挑战你，被你大败而归";
            }
            if (i != arr.length - 1) {
                str += "\n";
            }
        }
        s.lb.vo = str;
    };
    ViewLeiTaiReport.prototype.onHide = function () {
        var s = this;
        var m = GGlobal.model_ActLeiTai;
        m.remove(Model_ActLeiTai.REPORT, s.upView, s);
    };
    ViewLeiTaiReport.URL = "ui://rhfap29iut4i8";
    return ViewLeiTaiReport;
}(UIModalPanel));
__reflect(ViewLeiTaiReport.prototype, "ViewLeiTaiReport");
