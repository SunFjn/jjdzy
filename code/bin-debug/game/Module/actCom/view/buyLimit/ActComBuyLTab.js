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
var ActComBuyLTab = (function (_super) {
    __extends(ActComBuyLTab, _super);
    function ActComBuyLTab() {
        return _super.call(this) || this;
    }
    ActComBuyLTab.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComBuyLimit", "ActComBuyLTab"));
    };
    ActComBuyLTab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getController("button");
        this.n0 = (this.getChild("n0"));
        this.n1 = (this.getChild("n1"));
        this.lb = (this.getChild("lb"));
        this.noticeImg = (this.getChild("noticeImg"));
    };
    ActComBuyLTab.prototype.setVo = function (v, hour, off) {
        this._vo = v;
        if (hour == v[0].opentime - off - 8) {
            this.lb.text = v[0].opentime + ":00\n抢购中";
            this.lb.color = Color.GREENINT;
        }
        else {
            this.lb.text = v[0].opentime + ":00\n未开始";
            this.lb.color = Color.WHITEINT;
        }
    };
    Object.defineProperty(ActComBuyLTab.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    ActComBuyLTab.URL = "ui://vagtkxbkqsq27";
    return ActComBuyLTab;
}(fairygui.GButton));
__reflect(ActComBuyLTab.prototype, "ActComBuyLTab");
