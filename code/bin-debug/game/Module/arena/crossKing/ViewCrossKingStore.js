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
var ViewCrossKingStore = (function (_super) {
    __extends(ViewCrossKingStore, _super);
    function ViewCrossKingStore() {
        var _this = _super.call(this) || this;
        _this.setSkin("Arena", "Arena_atlas0", "ViewCrossKingStore");
        return _this;
    }
    ViewCrossKingStore.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewCrossKingStore"));
    };
    ViewCrossKingStore.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(VCrossKingStore.URL, VCrossKingStore);
    };
    ViewCrossKingStore.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.list.itemRenderer = this.renderList;
        this.list.callbackThisObj = this;
    };
    ViewCrossKingStore.prototype.onShown = function () {
        this.addListen();
        this.upView();
        IconUtil.setImg(this.titleImg, Enum_Path.BACK_URL + "crossking.jpg");
        GGlobal.modelCrossKing.CG_OPEN_STORE();
    };
    ViewCrossKingStore.prototype.onHide = function () {
        this.removeListen();
        IconUtil.setImg(this.titleImg, null);
    };
    ViewCrossKingStore.prototype.addListen = function () {
        GGlobal.control.listen(Enum_MsgType.CROSSKING_OPEN_STORE, this.upView, this);
        // GGlobal.control.listen(Enum_MsgType.CROSSKING_BUY_ITEM, this.upView, this);
    };
    ViewCrossKingStore.prototype.removeListen = function () {
        GGlobal.control.remove(Enum_MsgType.CROSSKING_OPEN_STORE, this.upView, this);
        // GGlobal.control.remove(Enum_MsgType.CROSSKING_BUY_ITEM, this.upView, this);
        GGlobal.layerMgr.close(UIConst.CROSS_KING_STORE);
        this.list.numItems = 0;
    };
    ViewCrossKingStore.prototype.upView = function () {
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < Model_CrossKing.storeArr.length; i++) {
            var v = Model_CrossKing.storeArr[i];
            if (v.status == 0) {
                arr2.push(v);
            }
            else if (v.status == 1) {
                arr1.push(v);
            }
            else {
                arr3.push(v);
            }
        }
        this._listData = arr1.concat(arr2).concat(arr3);
        this.list.numItems = this._listData.length;
        if (this._listData.length > 0) {
            this.list.scrollToView(0);
        }
        this.lbCount.text = "累计挑战次数：" + Model_CrossKing.storeCount;
        this.moneyIcon.url = CommonManager.getMoneyUrl(4);
        this.moneyLb.text = ConfigHelp.numToStr(Model_player.getCurrencyCount(4));
    };
    ViewCrossKingStore.prototype.renderList = function (index, obj) {
        var item = obj;
        item.vo = this._listData[index];
    };
    ViewCrossKingStore.URL = "ui://yqpfulefn9y02s";
    return ViewCrossKingStore;
}(UIPanelBase));
__reflect(ViewCrossKingStore.prototype, "ViewCrossKingStore");
