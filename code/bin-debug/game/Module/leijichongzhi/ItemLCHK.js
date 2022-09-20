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
var ItemLCHK = (function (_super) {
    __extends(ItemLCHK, _super);
    function ItemLCHK() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.UNSEL = "ui://goyve578qnxv6";
        _this.SEL = "ui://goyve578qnxv3";
        return _this;
    }
    ItemLCHK.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ItemLCHK.prototype.setData = function (value) {
        this._data = value;
        this.txtInfo.text = "\u7D2F\u5145" + value.coin + "\u5143";
        this.noticeImg.visible = GGlobal.modelLCHK.datas[this._data.id] == 1;
    };
    ItemLCHK.prototype.getData = function () {
        return this._data;
    };
    ItemLCHK.prototype.setSel = function (value) {
        this.bg.url = value ? this.SEL : this.UNSEL;
    };
    ItemLCHK.URL = "ui://goyve578liti1";
    return ItemLCHK;
}(fairygui.GComponent));
__reflect(ItemLCHK.prototype, "ItemLCHK");
