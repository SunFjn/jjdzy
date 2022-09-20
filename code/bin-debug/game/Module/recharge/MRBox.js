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
var MRBox = (function (_super) {
    __extends(MRBox, _super);
    function MRBox() {
        var _this = _super.call(this) || this;
        _this.ids = 0;
        _this._st = 0;
        return _this;
    }
    MRBox.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouchong", "MRBox"));
    };
    MRBox.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.grid = (this.getChild("grid"));
        this.img = (this.getChild("img"));
        this.imgNotice = (this.getChild("imgNotice"));
        this.addClickListener(this.clickHandler, this);
    };
    MRBox.prototype.clickHandler = function () {
        GGlobal.layerMgr.open(UIConst.MRSCBOX, this.ids);
    };
    MRBox.prototype.setSt = function (st) {
        this._st = st;
        this.img.visible = this._st == 2;
        this.imgNotice.visible = this._st == 1;
        var count = 0;
        var lib = Config.mrbx_715[this.ids];
        var award = JSON.parse(lib.AWARD);
        var arr1 = ConfigHelp.makeItemListArr(award);
        var vo = arr1[0];
        this.grid.vo = vo;
    };
    MRBox.URL = "ui://zzz8io3ro5122";
    return MRBox;
}(fairygui.GComponent));
__reflect(MRBox.prototype, "MRBox");
