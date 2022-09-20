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
var FengHuoNamePlug = (function (_super) {
    __extends(FengHuoNamePlug, _super);
    function FengHuoNamePlug() {
        var _this = _super.call(this) || this;
        _this.autoRemove = 1;
        return _this;
    }
    FengHuoNamePlug.create = function (isSelf) {
        if (isSelf === void 0) { isSelf = true; }
        FengHuoNamePlug.isSelf = isSelf;
        return FengHuoNamePlug.POOL.length ? FengHuoNamePlug.POOL.pop() : FengHuoNamePlug.createInstance();
    };
    FengHuoNamePlug.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "FengHuoNamePlug"));
    };
    FengHuoNamePlug.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.titleImg = (this.getChild("titleImg"));
        this.nameLb = (this.getChild("nameLb"));
        this.n3 = (this.getChild("n3"));
        this.t0 = this.getTransition("t0");
        this.setArrow(false);
    };
    FengHuoNamePlug.prototype.update = function () {
        var a = this;
        if (a.role.nameBarVild)
            a.updateShow();
    };
    FengHuoNamePlug.prototype.onAdd = function () {
        var a = this;
        a.role.headGroup.addChild(a.displayObject);
        a.role.nameBarVild = true;
    };
    FengHuoNamePlug.prototype.updateShow = function () {
        var a = this;
        a.role.nameBarVild = false;
        a.nameLb.text = a.role.name;
    };
    FengHuoNamePlug.prototype.setArrow = function (value) {
        var a = this;
        a.n3.visible = value;
    };
    //1 blue 2red
    FengHuoNamePlug.prototype.setCamp = function (val) {
        this.nameLb.color = ModelFengHuoLY.PLAYERNAMECOLOR[val];
    };
    FengHuoNamePlug.prototype.resetTitlePos = function () {
        var a = this;
        var xx = (172 - a.titleImg.width) >> 1;
        if (a.role.guanzhi <= 0 && a.role.country <= 0) {
            a.titleImg.setXY(xx, 25 - a.titleImg.height);
        }
        else {
            a.titleImg.setXY(xx, 21 - a.titleImg.height);
        }
    };
    FengHuoNamePlug.prototype.onRemove = function () {
        var a = this;
        a.role.nameBarVild = true;
        a.setArrow(false);
        a.role.headGroup.removeChild(a.displayObject);
    };
    FengHuoNamePlug.POOL = [];
    FengHuoNamePlug.URL = "ui://edvdots4m2dlw1s";
    return FengHuoNamePlug;
}(fairygui.GComponent));
__reflect(FengHuoNamePlug.prototype, "FengHuoNamePlug");
