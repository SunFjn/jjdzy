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
var ItemFWJD = (function (_super) {
    __extends(ItemFWJD, _super);
    function ItemFWJD() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._awards = [];
        return _this;
    }
    ItemFWJD.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.btnQW.addClickListener(this.onHand, this);
        this.btnGet.addClickListener(this.onHand, this);
        this.n11.callbackThisObj = this;
        this.n11.itemRenderer = this.listReder;
        this.n11.setVirtual();
    };
    ItemFWJD.prototype.listReder = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    ItemFWJD.prototype.onHand = function (evt) {
        var tar = evt.currentTarget;
        switch (tar) {
            case this.btnQW:
                evt.stopImmediatePropagation();
                GGlobal.layerMgr.open(UIConst.BAZHENTU_JIANDING);
                break;
            case this.btnGet:
                GGlobal.modelEightLock.CG4611(this._data.id);
                break;
        }
    };
    ItemFWJD.prototype.setData = function (value) {
        this._data = value;
        this.txtName.text = "\u5B8C\u7F8E\u9274\u5B9A" + value.time + "\u6B21";
        var cnt = ModelEightLock.hasJianDing;
        this.txtInfo.text = HtmlUtil.fontNoSize("(" + cnt + "/" + value.time + ")", cnt >= value.time ? "#00ff00" : "#ff0000");
        this._awards = ConfigHelp.makeItemListArr(JSON.parse(value.reward));
        this.n11.numItems = this._awards.length;
        switch (GGlobal.modelEightLock.getFWDJState(value)) {
            case 0: //未达条件
            default:
                this.btnQW.visible = true;
                this.btnGet.visible = false;
                this.iconGot.visible = false;
                break;
            case 1://可领取
                this.btnQW.visible = false;
                this.btnGet.visible = this.btnGet.checkNotice = true;
                this.iconGot.visible = false;
                break;
            case 2://已领取
                this.btnQW.visible = this.btnGet.visible = false;
                this.iconGot.visible = true;
                break;
        }
    };
    ItemFWJD.prototype.getData = function () {
        return this._data;
    };
    ItemFWJD.prototype.clean = function () {
        this.n11.numItems = 0;
        // ConfigHelp.cleanGridEff(this.grids);
    };
    ItemFWJD.URL = "ui://hincjqblsaktd";
    return ItemFWJD;
}(fairygui.GComponent));
__reflect(ItemFWJD.prototype, "ItemFWJD");
