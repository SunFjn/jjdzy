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
/**
 * 护卫武将item
 */
var ShaoZhuGuardItem = (function (_super) {
    __extends(ShaoZhuGuardItem, _super);
    function ShaoZhuGuardItem() {
        var _this = _super.call(this) || this;
        _this._awards = [];
        return _this;
    }
    ShaoZhuGuardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuGuardItem"));
    };
    ShaoZhuGuardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = this;
        self.list.itemRenderer = this.itemRender;
        self.chooseImg.visible = false;
    };
    ShaoZhuGuardItem.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    ShaoZhuGuardItem.prototype.clean = function () {
        this.list.numItems = 0;
    };
    ShaoZhuGuardItem.prototype.setChoose = function (value) {
        this.chooseImg.visible = value;
    };
    ShaoZhuGuardItem.prototype.setdata = function (data) {
        var self = this;
        var cfg = Config.szhs_401[data + 1];
        self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = this._awards.length;
        IconUtil.setImg(self.guardIcon, Enum_Path.PIC_URL + "guard" + cfg.id + ".png");
        self.nameTxt.text = HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pz));
    };
    ShaoZhuGuardItem.URL = "ui://lnw94ki2lnit8";
    return ShaoZhuGuardItem;
}(fairygui.GComponent));
__reflect(ShaoZhuGuardItem.prototype, "ShaoZhuGuardItem");
