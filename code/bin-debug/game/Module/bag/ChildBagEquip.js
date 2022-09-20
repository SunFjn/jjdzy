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
var ChildBagEquip = (function (_super) {
    __extends(ChildBagEquip, _super);
    function ChildBagEquip() {
        return _super.call(this) || this;
    }
    ChildBagEquip.createInstance = function () {
        return (fairygui.UIPackage.createObject("bag", "ChildBagEquip"));
    };
    ChildBagEquip.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.dataList.itemRenderer = this.renderHandle;
        this.dataList.callbackThisObj = this;
        this.dataList.setVirtual();
        this.btnRL.addClickListener(this.openRL, this);
        this.btnAdd.addClickListener(this.addClick, this);
    };
    ChildBagEquip.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildBagEquip.prototype.openPanel = function (pData) {
        this.update();
    };
    ChildBagEquip.prototype.closePanel = function (pData) {
        this.removeListen();
    };
    ChildBagEquip.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.grid.gridSource = 2;
        item.vo = this._sortList[index];
    };
    ChildBagEquip.prototype.openRL = function (event) {
        GGlobal.layerMgr.open(UIConst.RONGLIAN, 0);
    };
    ChildBagEquip.prototype.addClick = function (event) {
        GGlobal.layerMgr.open(UIConst.VIP);
    };
    ChildBagEquip.prototype.update = function () {
        this._sortList = this.sort();
        this.dataList.numItems = Model_Bag.getCurBagNum();
        this.updateSize();
        this.btnRL.checkNotice = Model_Bag.checkEquipNotice();
    };
    ChildBagEquip.prototype.updateSize = function () {
        var bagCount = Model_Bag.equipList.length;
        this.lbGridNum.text = "容量：" + bagCount + "/" + Model_Bag.getCurBagNum();
    };
    ChildBagEquip.prototype.sort = function () {
        var ret = [];
        var list = Model_Bag.equipList;
        list.sort(this.sortFunc);
        for (var i = 0; i < list.length; i++) {
            ret.push(list[i]);
        }
        return ret;
    };
    ChildBagEquip.prototype.sortFunc = function (a, b) {
        if (a.quality != b.quality) {
            return b.quality - a.quality;
        }
        else {
            return a.paixu - b.paixu;
        }
    };
    ChildBagEquip.prototype.removeListen = function () {
        this.dataList.numItems = 0;
    };
    //>>>>end
    ChildBagEquip.URL = "ui://v4sxjak5etor4";
    return ChildBagEquip;
}(fairygui.GComponent));
__reflect(ChildBagEquip.prototype, "ChildBagEquip", ["IPanel"]);
