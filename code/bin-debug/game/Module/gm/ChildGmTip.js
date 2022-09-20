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
var ChildGmTip = (function (_super) {
    __extends(ChildGmTip, _super);
    function ChildGmTip() {
        return _super.call(this) || this;
    }
    ChildGmTip.createInstance = function () {
        return (fairygui.UIPackage.createObject("GM", "ChildGmTip"));
    };
    ChildGmTip.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbName = (this.getChild("lbName"));
    };
    Object.defineProperty(ChildGmTip.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (value) {
            this._vo = value;
            this.lbName.text = value.text;
        },
        enumerable: true,
        configurable: true
    });
    ChildGmTip.URL = "ui://vm9a8xq8qm4n5";
    return ChildGmTip;
}(fairygui.GComponent));
__reflect(ChildGmTip.prototype, "ChildGmTip");
