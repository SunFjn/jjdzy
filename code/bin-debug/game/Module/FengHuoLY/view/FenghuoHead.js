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
var FenghuoHead = (function (_super) {
    __extends(FenghuoHead, _super);
    function FenghuoHead() {
        return _super.call(this) || this;
    }
    FenghuoHead.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "FenghuoHead"));
    };
    FenghuoHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgHead = (this.getChild("imgHead"));
        this.imgHeadGrid = (this.getChild("imgHeadGrid"));
        this.lbName = (this.getChild("lbName"));
    };
    FenghuoHead.URL = "ui://edvdots41266w1p";
    return FenghuoHead;
}(fairygui.GComponent));
__reflect(FenghuoHead.prototype, "FenghuoHead");
