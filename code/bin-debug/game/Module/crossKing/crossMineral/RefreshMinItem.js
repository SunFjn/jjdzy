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
var RefreshMinItem = (function (_super) {
    __extends(RefreshMinItem, _super);
    function RefreshMinItem() {
        var _this = _super.call(this) || this;
        _this._awards = [];
        return _this;
    }
    RefreshMinItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "RefreshMinItem"));
    };
    RefreshMinItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = this;
        self.list.itemRenderer = this.itemRender;
        self.chooseImg.visible = false;
    };
    RefreshMinItem.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    RefreshMinItem.prototype.clean = function () {
        this.list.numItems = 0;
    };
    RefreshMinItem.prototype.setdata = function (data) {
        var self = this;
        var cfg = Config.kfkz_275[data + 1];
        self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.max1));
        self.list.numItems = this._awards.length;
        IconUtil.setImg(self.mineIcon, Enum_Path.PIC_URL + "k" + cfg.pz + ".png");
        self.nameIcon.url = CommonManager.getUrl("crossKing", "k" + cfg.pz);
    };
    RefreshMinItem.prototype.setChoose = function (value) {
        this.chooseImg.visible = value;
    };
    RefreshMinItem.URL = "ui://yqpfulefnyv755";
    return RefreshMinItem;
}(fairygui.GButton));
__reflect(RefreshMinItem.prototype, "RefreshMinItem");
