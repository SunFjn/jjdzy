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
var IconJie = (function (_super) {
    __extends(IconJie, _super);
    function IconJie() {
        return _super.call(this) || this;
    }
    IconJie.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.txtInfo = this["n1"];
    };
    IconJie.prototype.setVal = function (value) {
        if (value) {
            this.visible = true;
            var jie = value / 10 >> 0;
            var ji = value % 10 >> 0;
            this.txtInfo.text = HtmlUtil.font(jie + "\u9636", "#FFCC00", 18) + HtmlUtil.font(ji + "\u7EA7", "#FFFFFF", 16);
        }
        else {
            this.visible = false;
        }
    };
    IconJie.URL = "ui://jvxpx9ems89q3e5";
    return IconJie;
}(fairygui.GComponent));
__reflect(IconJie.prototype, "IconJie");
