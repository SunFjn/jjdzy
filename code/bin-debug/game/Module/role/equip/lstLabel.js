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
var lstLabel = (function (_super) {
    __extends(lstLabel, _super);
    function lstLabel() {
        return _super.call(this) || this;
    }
    lstLabel.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "lstLabel"));
    };
    lstLabel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbContent = (this.getChild("lbContent"));
    };
    lstLabel.prototype.setText = function (str) {
        this.lbContent.text = str;
    };
    lstLabel.prototype.reScroll = function () {
        this.scrollPane.setPercY(0);
        ;
    };
    lstLabel.URL = "ui://3tzqotadltpm19";
    return lstLabel;
}(fairygui.GComponent));
__reflect(lstLabel.prototype, "lstLabel");
