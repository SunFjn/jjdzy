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
var Button3 = (function (_super) {
    __extends(Button3, _super);
    function Button3() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    Button3.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "Button3"));
    };
    Button3.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgNotice = (this.getChild("imgNotice"));
    };
    Object.defineProperty(Button3.prototype, "checkNotice", {
        get: function () {
            return this._checkNotice;
        },
        set: function (value) {
            this._checkNotice = value;
            this.imgNotice.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Button3.URL = "ui://jvxpx9emkvh16z";
    return Button3;
}(fairygui.GButton));
__reflect(Button3.prototype, "Button3");
