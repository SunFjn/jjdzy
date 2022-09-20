/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var DBLabel = (function (_super) {
    __extends(DBLabel, _super);
    function DBLabel() {
        return _super.call(this) || this;
    }
    DBLabel.createInstance = function () {
        return (fairygui.UIPackage.createObject("shaozhuAct", "DBLabel"));
    };
    DBLabel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n0.color = 0xffffff;
    };
    DBLabel.prototype.setText = function (str) {
        this.n0.text = str;
    };
    DBLabel.prototype.reScroll = function () {
        this.scrollPane.setPercY(0);
        ;
    };
    DBLabel.URL = "ui://w5ll6n5jhsa2e";
    return DBLabel;
}(fairygui.GComponent));
__reflect(DBLabel.prototype, "DBLabel");
