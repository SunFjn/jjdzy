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
var FengHuoLstIt = (function (_super) {
    __extends(FengHuoLstIt, _super);
    function FengHuoLstIt() {
        return _super.call(this) || this;
    }
    FengHuoLstIt.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "FengHuoLstIt"));
    };
    FengHuoLstIt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
    };
    FengHuoLstIt.prototype.setdate = function (name, camp) {
        this.n0.text = name[1];
        this.n0.color = ModelFengHuoLY.PLAYERNAMECOLOR[camp];
    };
    FengHuoLstIt.URL = "ui://edvdots4m2dlw1t";
    return FengHuoLstIt;
}(fairygui.GComponent));
__reflect(FengHuoLstIt.prototype, "FengHuoLstIt");
