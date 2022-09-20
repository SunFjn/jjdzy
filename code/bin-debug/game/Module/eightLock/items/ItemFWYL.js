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
var ItemFWYL = (function (_super) {
    __extends(ItemFWYL, _super);
    function ItemFWYL() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.grids = [];
        return _this;
    }
    ItemFWYL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.btnQW.addClickListener(this.onHand, this);
    };
    ItemFWYL.prototype.onHand = function (evt) {
        var sysID = this._data.open;
        if (sysID && ModuleManager.isOpen(sysID, true)) {
            evt.stopImmediatePropagation();
            GGlobal.layerMgr.open(sysID);
        }
    };
    ItemFWYL.prototype.setData = function (value) {
        this._data = value;
        if (this.grids.length > 0) {
            ConfigHelp.cleanGridview(this.grids);
        }
        var rewards = ConfigHelp.makeItemListArr(JSON.parse(value.reward));
        this.grids = ConfigHelp.addGridview(rewards, this, 199, 48, true, false, 3, 90, 0.8);
        IconUtil.setImg(this.bgImg, "resource/image/sanGuoQD/" + value.sys + ".png");
    };
    ItemFWYL.prototype.getData = function () {
        return this._data;
    };
    ItemFWYL.prototype.clean = function () {
        IconUtil.setImg(this.bgImg, null);
        ConfigHelp.cleanGridEff(this.grids);
    };
    ItemFWYL.URL = "ui://hincjqblsaktf";
    return ItemFWYL;
}(fairygui.GComponent));
__reflect(ItemFWYL.prototype, "ItemFWYL");
