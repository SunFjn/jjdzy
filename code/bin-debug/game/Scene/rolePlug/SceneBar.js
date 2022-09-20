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
var SceneBar = (function (_super) {
    __extends(SceneBar, _super);
    function SceneBar() {
        return _super.call(this) || this;
    }
    SceneBar.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "SceneBar"));
    };
    SceneBar.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.bar = (this.getChild("bar"));
    };
    SceneBar.URL = "ui://jvxpx9emlve29r";
    return SceneBar;
}(fairygui.GProgressBar));
__reflect(SceneBar.prototype, "SceneBar");
