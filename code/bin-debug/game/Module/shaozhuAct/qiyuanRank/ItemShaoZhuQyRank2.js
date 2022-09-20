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
var ItemShaoZhuQyRank2 = (function (_super) {
    __extends(ItemShaoZhuQyRank2, _super);
    function ItemShaoZhuQyRank2() {
        var _this = _super.call(this) || this;
        _this._awards = [];
        _this._bigAwards = [];
        return _this;
    }
    ItemShaoZhuQyRank2.createInstance = function () {
        return (fairygui.UIPackage.createObject("shaozhuAct", "ItemShaoZhuQyRank2"));
    };
    ItemShaoZhuQyRank2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.checkTxt.text = HtmlUtil.createLink("查看排行", true, "");
        this.checkTxt.addEventListener(egret.TextEvent.LINK, this.onHand, this);
        this.list.itemRenderer = this.itemRender;
        this.list.callbackThisObj = this;
        this.bpList.itemRenderer = this.itemRender1;
        this.bpList.callbackThisObj = this;
    };
    ItemShaoZhuQyRank2.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    ItemShaoZhuQyRank2.prototype.itemRender1 = function (idx, obj) {
        var item = obj;
        item.setVo(this._bigAwards[idx], true);
    };
    ItemShaoZhuQyRank2.prototype.onHand = function (e) {
        e.stopPropagation();
        GGlobal.layerMgr.open(UIConst.SHAOZHU_QY_RANK_VIEW, this._cfg);
    };
    ItemShaoZhuQyRank2.prototype.setVO = function (id) {
        var self = this;
        self._cfg = Config.szqypm_272[id];
        self._awards = ConfigHelp.makeItemListArr(JSON.parse(self._cfg.reward));
        self.list.numItems = self._awards.length;
        if (id == 4) {
            self.c1.selectedIndex = 0;
        }
        else {
            self.c1.selectedIndex = 1;
        }
        if (self._cfg.big <= 0) {
            self.bpList.numItems = 0;
        }
        else {
            self._bigAwards = JSON.parse(self._cfg.big);
            self.bpList.numItems = this._bigAwards.length;
        }
    };
    ItemShaoZhuQyRank2.URL = "ui://w5ll6n5jfoqs1z";
    return ItemShaoZhuQyRank2;
}(fairygui.GComponent));
__reflect(ItemShaoZhuQyRank2.prototype, "ItemShaoZhuQyRank2");
