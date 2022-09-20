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
var EasyButton = (function (_super) {
    __extends(EasyButton, _super);
    function EasyButton() {
        var _this = _super.call(this) || this;
        _this._enabled = true;
        return _this;
    }
    EasyButton.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "EasyButton"));
    };
    EasyButton.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.btn = (this.getChild("btn"));
        this.iconTip = (this.getChild("iconTip"));
        this.iconTip.visible = false;
    };
    EasyButton.prototype.setNoticeVis = function (v) {
        this.iconTip.visible = v;
    };
    Object.defineProperty(EasyButton.prototype, "iconDisable", {
        get: function () {
            return this._iconDisable;
        },
        set: function (value) {
            if (value == this._iconDisable) {
                return;
            }
            this._iconDisable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EasyButton.prototype, "label", {
        get: function () {
            return this.btn.text;
        },
        /**按钮文字 */
        set: function (value) {
            this.btn.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EasyButton.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            if (this._enabled == value) {
                return;
            }
            this._enabled = value;
        },
        enumerable: true,
        configurable: true
    });
    EasyButton.URL = "ui://jvxpx9emhfx72m";
    return EasyButton;
}(fairygui.GComponent));
__reflect(EasyButton.prototype, "EasyButton");
