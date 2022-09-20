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
var ShaoZhuTab2 = (function (_super) {
    __extends(ShaoZhuTab2, _super);
    function ShaoZhuTab2() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    ShaoZhuTab2.createInstance = function () {
        return (fairygui.UIPackage.createObject("shaozhuAct", "ShaoZhuTab2"));
    };
    ShaoZhuTab2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getController("button");
        this.n0 = (this.getChild("n0"));
        this.n1 = (this.getChild("n1"));
        this.n2 = (this.getChild("n2"));
        this.n3 = (this.getChild("n3"));
        this.n6 = (this.getChild("n6"));
        this.noticeImg = (this.getChild("noticeImg"));
    };
    ShaoZhuTab2.prototype.showYlq = function (v) {
        this.n6.visible = v;
    };
    Object.defineProperty(ShaoZhuTab2.prototype, "checkNotice", {
        get: function () {
            return this._checkNotice;
        },
        set: function (value) {
            this._checkNotice = value;
            this.noticeImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    ShaoZhuTab2.prototype.__click = function (evt) {
        if (!this.overrideClickFunc) {
            _super.prototype.__click.call(this, evt);
        }
        else {
            this.overrideClickFunc.runWith(evt);
        }
    };
    ShaoZhuTab2.prototype.onSuperClick = function (evt) {
        _super.prototype.__click.call(this, evt);
    };
    ShaoZhuTab2.URL = "ui://w5ll6n5jm02f1t";
    return ShaoZhuTab2;
}(fairygui.GButton));
__reflect(ShaoZhuTab2.prototype, "ShaoZhuTab2");
