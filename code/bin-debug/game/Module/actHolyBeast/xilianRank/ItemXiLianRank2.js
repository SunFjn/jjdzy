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
var ItemXiLianRank2 = (function (_super) {
    __extends(ItemXiLianRank2, _super);
    function ItemXiLianRank2() {
        var _this = _super.call(this) || this;
        _this._awards = [];
        _this._bigAwards = [];
        return _this;
    }
    ItemXiLianRank2.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "ItemXiLianRank2"));
    };
    ItemXiLianRank2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        self.list = (self.getChild("list"));
        self.c1 = self.getController("c1");
        self.checkTxt = (self.getChild("checkTxt"));
        self.bpList = (self.getChild("bpList"));
        self.checkTxt.text = HtmlUtil.createLink("查看排行", true, "");
        self.checkTxt.addEventListener(egret.TextEvent.LINK, self.onHand, self);
        self.list.itemRenderer = self.itemRender;
        self.list.callbackThisObj = self;
        self.bpList.itemRenderer = self.itemRender1;
        self.bpList.callbackThisObj = self;
    };
    ItemXiLianRank2.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    ItemXiLianRank2.prototype.itemRender1 = function (idx, obj) {
        var item = obj;
        item.setVo(this._bigAwards[idx], true);
    };
    ItemXiLianRank2.prototype.onHand = function (e) {
        e.stopPropagation();
        GGlobal.layerMgr.open(UIConst.ACTHB_XILIANRANK_VIEW, this._cfg);
    };
    ItemXiLianRank2.prototype.setVO = function (id) {
        var self = this;
        self._cfg = Config.shxlpm_268[id];
        self._awards = ConfigHelp.makeItemListArr(JSON.parse(self._cfg.reward));
        self.list.numItems = self._awards.length;
        if (id == 4) {
            self.c1.selectedIndex = 0;
        }
        else {
            self.c1.selectedIndex = 1;
        }
        if (self._cfg.reward1 <= 0) {
            self.bpList.numItems = 0;
        }
        else {
            self._bigAwards = JSON.parse(self._cfg.reward1);
            self.bpList.numItems = this._bigAwards.length;
        }
    };
    ItemXiLianRank2.URL = "ui://d5y9ngt6cl031q";
    return ItemXiLianRank2;
}(fairygui.GComponent));
__reflect(ItemXiLianRank2.prototype, "ItemXiLianRank2");
