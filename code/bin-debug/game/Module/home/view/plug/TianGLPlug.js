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
var TianGLPlug = (function (_super) {
    __extends(TianGLPlug, _super);
    function TianGLPlug() {
        var _this = _super.call(this) || this;
        _this.autoRemove = true;
        return _this;
    }
    TianGLPlug.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "TianGLPlug"));
    };
    TianGLPlug.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
    };
    TianGLPlug.prototype.update = function (opt) {
    };
    TianGLPlug.prototype.onAdd = function () {
        this.role.headGroup.addChild(this.displayObject);
    };
    TianGLPlug.prototype.onRemove = function () {
        var a = this;
        this.setXY(-50, 1);
        a.role.headGroup.removeChild(a.displayObject);
        Pool.recover("TianGLPlug", a);
    };
    TianGLPlug.create = function (role) {
        var temp = Pool.getItemByCreateFun("TianGLPlug", TianGLPlug.createInstance);
        temp.role = role;
        return temp;
    };
    TianGLPlug.URL = "ui://y0plc878c60e25";
    return TianGLPlug;
}(fairygui.GComponent));
__reflect(TianGLPlug.prototype, "TianGLPlug");
