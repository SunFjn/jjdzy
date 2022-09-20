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
var ShaoZhuEscReportInter = (function (_super) {
    __extends(ShaoZhuEscReportInter, _super);
    function ShaoZhuEscReportInter() {
        return _super.call(this) || this;
    }
    ShaoZhuEscReportInter.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscReportInter"));
    };
    ShaoZhuEscReportInter.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ShaoZhuEscReportInter.prototype.setdata = function (data) {
        var s = this;
        s.item.isShowEff = false;
        s.item.tipEnabled = false;
        s.item.vo = data;
        s.item.showText = "";
        s.itemNum.text = "-" + data.count;
    };
    ShaoZhuEscReportInter.URL = "ui://lnw94ki2imkmo";
    return ShaoZhuEscReportInter;
}(fairygui.GComponent));
__reflect(ShaoZhuEscReportInter.prototype, "ShaoZhuEscReportInter");
