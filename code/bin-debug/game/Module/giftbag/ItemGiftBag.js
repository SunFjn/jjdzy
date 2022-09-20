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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ItemGiftBag = (function (_super) {
    __extends(ItemGiftBag, _super);
    function ItemGiftBag() {
        return _super.call(this) || this;
    }
    ItemGiftBag.createInstance = function () {
        return (fairygui.UIPackage.createObject("giftBag", "ItemGiftBag"));
    };
    ItemGiftBag.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n1 = (this.getChild("n1"));
        this.n0 = (this.getChild("n0"));
        this.setChoose(false);
    };
    ItemGiftBag.prototype.setChoose = function (v) {
        this.n1.visible = v;
    };
    ItemGiftBag.prototype.clean = function () {
        this.n0.clean();
        this.setChoose(false);
    };
    ItemGiftBag.prototype.setDta = function (data) {
        this.index = data[0] - 1;
        var cfg = data.slice(1, 4);
        var vo = ConfigHelp.makeItem(cfg);
        this.n0.vo = vo;
        this.n0.grid.showEff(true);
        this.n0.grid.tipEnabled = false;
    };
    ItemGiftBag.URL = "ui://0z9qzd94y1c12";
    return ItemGiftBag;
}(fairygui.GComponent));
__reflect(ItemGiftBag.prototype, "ItemGiftBag");
