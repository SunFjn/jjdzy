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
var SceneDropView = (function (_super) {
    __extends(SceneDropView, _super);
    function SceneDropView() {
        return _super.call(this) || this;
    }
    SceneDropView.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "SceneDropView"));
    };
    SceneDropView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n1 = (this.getChild("n1"));
        this.n2 = (this.getChild("n2"));
    };
    SceneDropView.URL = "ui://jvxpx9emqxkh3fn";
    return SceneDropView;
}(fairygui.GComponent));
__reflect(SceneDropView.prototype, "SceneDropView");
