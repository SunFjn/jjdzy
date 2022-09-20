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
var ItemLeiTaiReport = (function (_super) {
    __extends(ItemLeiTaiReport, _super);
    function ItemLeiTaiReport() {
        return _super.call(this) || this;
    }
    ItemLeiTaiReport.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComLeiTai", "ItemLeiTaiReport"));
    };
    ItemLeiTaiReport.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Object.defineProperty(ItemLeiTaiReport.prototype, "vo", {
        set: function (v) {
            this.lb.text = v;
        },
        enumerable: true,
        configurable: true
    });
    ItemLeiTaiReport.URL = "ui://rhfap29iwf0hb";
    return ItemLeiTaiReport;
}(fairygui.GComponent));
__reflect(ItemLeiTaiReport.prototype, "ItemLeiTaiReport");
