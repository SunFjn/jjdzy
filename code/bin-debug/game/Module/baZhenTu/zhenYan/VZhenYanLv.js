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
var VZhenYanLv = (function (_super) {
    __extends(VZhenYanLv, _super);
    function VZhenYanLv() {
        return _super.call(this) || this;
    }
    VZhenYanLv.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "VZhenYanLv"));
    };
    VZhenYanLv.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgBg = (this.getChild("imgBg"));
        this.lb = (this.getChild("lb"));
    };
    Object.defineProperty(VZhenYanLv.prototype, "vo", {
        set: function (v) {
            this.lb.text = v + "级";
        },
        enumerable: true,
        configurable: true
    });
    VZhenYanLv.URL = "ui://xrzn9ppaihg124";
    return VZhenYanLv;
}(fairygui.GComponent));
__reflect(VZhenYanLv.prototype, "VZhenYanLv");
