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
var ViewArpgSceneChange = (function (_super) {
    __extends(ViewArpgSceneChange, _super);
    function ViewArpgSceneChange() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewArpgSceneChange.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewArpgSceneChange"));
    };
    ViewArpgSceneChange.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "ViewArpgSceneChange").asCom;
        this.contentPane = this.view;
        this.n0 = (this.view.getChild("n0"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewArpgSceneChange.prototype.onShown = function () {
        var arg = this._args;
        this.n0.text = "正在进入【" + arg + "】";
    };
    ViewArpgSceneChange.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.ARPG_SCENEVIEW);
    };
    ViewArpgSceneChange.URL = "ui://jvxpx9emafjm0";
    return ViewArpgSceneChange;
}(UIModalPanel));
__reflect(ViewArpgSceneChange.prototype, "ViewArpgSceneChange");
