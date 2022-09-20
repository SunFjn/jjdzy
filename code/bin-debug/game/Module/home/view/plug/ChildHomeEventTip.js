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
var ChildHomeEventTip = (function (_super) {
    __extends(ChildHomeEventTip, _super);
    function ChildHomeEventTip() {
        var _this = _super.call(this) || this;
        _this.setPos = function (v) {
            var pos = JSON.parse(v)[0];
            _this.setXY(pos[0], pos[1]);
        };
        _this.autoRemove = true;
        return _this;
    }
    ChildHomeEventTip.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ChildHomeEventTip"));
    };
    ChildHomeEventTip.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.t0 = this.getTransition("t0");
    };
    ChildHomeEventTip.prototype.update = function (opt) {
    };
    ChildHomeEventTip.prototype.setJiaDingState = function () {
        this.setXY(-30, -60);
        this.setScale(0.5, 0.5);
    };
    ChildHomeEventTip.prototype.onAdd = function () {
        this.role.headGroup.addChild(this.displayObject);
    };
    ChildHomeEventTip.prototype.onRemove = function () {
        var a = this;
        this.setScale(1, 1);
        a.role.headGroup.removeChild(a.displayObject);
        Pool.recover("ChildHomeEventTip", a);
    };
    ChildHomeEventTip.create = function (role) {
        var temp = Pool.getItemByCreateFun("ChildHomeEventTip", ChildHomeEventTip.createInstance);
        temp.role = role;
        return temp;
    };
    ChildHomeEventTip.URL = "ui://y0plc878wy1s1v";
    return ChildHomeEventTip;
}(fairygui.GComponent));
__reflect(ChildHomeEventTip.prototype, "ChildHomeEventTip");
