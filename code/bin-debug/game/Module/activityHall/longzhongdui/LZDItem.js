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
var LZDItem = (function (_super) {
    __extends(LZDItem, _super);
    function LZDItem() {
        return _super.call(this) || this;
    }
    LZDItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("activityHall", "LZDItem"));
    };
    LZDItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n1 = (this.getChild("n1"));
        this.n2 = (this.getChild("n2"));
    };
    LZDItem.prototype.setdata = function (idx) {
        var data = GGlobal.modelActivityHall.lzd_rankDta;
        this.n0.text = (idx + 1) + "";
        if (data && data.length) {
            var d = data[idx];
            this.n1.text = d[0] + "";
            this.n2.text = d[1] + "分";
        }
        else {
            this.n1.text = "虚位以待";
            this.n2.text = "0分";
        }
    };
    LZDItem.URL = "ui://1xydor24lwyd14";
    return LZDItem;
}(fairygui.GComponent));
__reflect(LZDItem.prototype, "LZDItem");
