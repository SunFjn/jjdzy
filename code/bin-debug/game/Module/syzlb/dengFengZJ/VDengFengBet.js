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
var VDengFengBet = (function (_super) {
    __extends(VDengFengBet, _super);
    function VDengFengBet() {
        return _super.call(this) || this;
    }
    VDengFengBet.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "VDengFengBet"));
    };
    VDengFengBet.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.check.touchable = false;
    };
    Object.defineProperty(VDengFengBet.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            var s = this;
            s._vo = v;
            var m = GGlobal.modelDengFengZJ;
            if (v) {
                s.head.setdata(v.head, -1, "", -1, false, v.frame);
                s.check.selected = m.finalBetId == v.plyId;
            }
            else {
                s.head.setdata();
                s.check.visible = false;
            }
            s.lbName.text = v ? v.name : "";
            s.lbPower.text = v ? "战力：" + v.power : "";
        },
        enumerable: true,
        configurable: true
    });
    VDengFengBet.URL = "ui://3o8q23uua0u327";
    return VDengFengBet;
}(fairygui.GButton));
__reflect(VDengFengBet.prototype, "VDengFengBet");
