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
var ItemFWCol = (function (_super) {
    __extends(ItemFWCol, _super);
    function ItemFWCol() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._awards = [];
        return _this;
    }
    ItemFWCol.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.btnQW.addClickListener(this.onHand, this);
        this.btnGet.addClickListener(this.onHand, this);
        this.n11.callbackThisObj = this;
        this.n11.itemRenderer = this.listReder;
        this.n11.setVirtual();
    };
    ItemFWCol.prototype.listReder = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    ItemFWCol.prototype.onHand = function (evt) {
        var tar = evt.currentTarget;
        switch (tar) {
            case this.btnQW:
                evt.stopImmediatePropagation();
                GGlobal.layerMgr.open(UIConst.BAZHENTU);
                break;
            case this.btnGet:
                GGlobal.modelEightLock.CG4591(this._data.id);
                break;
        }
    };
    ItemFWCol.prototype.setData = function (value) {
        this._data = value;
        this.txtName.text = value.name;
        var finNum = this.getFinNum();
        this.txtInfo.text = HtmlUtil.fontNoSize("(" + finNum + "/" + value.num + ")", finNum >= value.num ? "#00ff00" : "#ff0000");
        this._awards = ConfigHelp.makeItemListArr(JSON.parse(value.reward));
        this.n11.numItems = this._awards.length;
        var state = GGlobal.modelEightLock.fuwenColDic[value.id];
        switch (state) {
            case 0:
            default://未达标
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
                this.btnQW.visible = false;
                this.btnGet.visible = false;
                this.iconGot.visible = true;
                break;
        }
    };
    ItemFWCol.prototype.getData = function () {
        return this._data;
    };
    ItemFWCol.prototype.getFinNum = function () {
        var pinzhi = this._data.pz;
        return ModelEightLock.pinZhiDic[pinzhi] == null ? 0 : ModelEightLock.pinZhiDic[pinzhi];
    };
    ItemFWCol.prototype.clean = function () {
        this.n11.numItems = 0;
        // ConfigHelp.cleanGridEff(this.grids);
    };
    ItemFWCol.URL = "ui://hincjqblvib6b";
    return ItemFWCol;
}(fairygui.GComponent));
__reflect(ItemFWCol.prototype, "ItemFWCol");
