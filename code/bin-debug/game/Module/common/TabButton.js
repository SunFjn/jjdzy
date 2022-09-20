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
var TabButton = (function (_super) {
    __extends(TabButton, _super);
    function TabButton() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    TabButton.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TabButton"));
    };
    TabButton.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
    };
    Object.defineProperty(TabButton.prototype, "checkNotice", {
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
    TabButton.prototype.__click = function (evt) {
        if (!this.overrideClickFunc) {
            _super.prototype.__click.call(this, evt);
        }
        else {
            this.overrideClickFunc.runWith(evt);
        }
    };
    TabButton.prototype.onSuperClick = function (evt) {
        _super.prototype.__click.call(this, evt);
    };
    TabButton.URL = "ui://jvxpx9embwmw3f";
    return TabButton;
}(fairygui.GButton));
__reflect(TabButton.prototype, "TabButton");
