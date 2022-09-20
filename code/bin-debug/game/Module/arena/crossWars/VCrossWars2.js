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
var VCrossWars2 = (function (_super) {
    __extends(VCrossWars2, _super);
    function VCrossWars2() {
        return _super.call(this) || this;
    }
    VCrossWars2.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossWars2"));
    };
    VCrossWars2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbName = (this.getChild("lbName"));
    };
    Object.defineProperty(VCrossWars2.prototype, "vo", {
        set: function (v) {
            this.lbName.text = v;
        },
        enumerable: true,
        configurable: true
    });
    VCrossWars2.URL = "ui://me1skowlhfct4e";
    return VCrossWars2;
}(fairygui.GComponent));
__reflect(VCrossWars2.prototype, "VCrossWars2");
