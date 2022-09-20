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
var Item_ActCom_Rank2 = (function (_super) {
    __extends(Item_ActCom_Rank2, _super);
    function Item_ActCom_Rank2() {
        var _this = _super.call(this) || this;
        _this._awards = [];
        _this._bigAwards = [];
        return _this;
    }
    Item_ActCom_Rank2.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_SystemRank", "Item_ActCom_Rank2"));
    };
    Item_ActCom_Rank2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.checkTxt.text = HtmlUtil.createLink("查看排行", true, "");
        self.checkTxt.addEventListener(egret.TextEvent.LINK, self.onHand, self);
        self.list.itemRenderer = self.itemRender;
        self.list.callbackThisObj = self;
        self.bpList.itemRenderer = self.itemRender1;
        self.bpList.callbackThisObj = self;
    };
    Item_ActCom_Rank2.prototype.itemRender = function (idx, grid) {
        grid.isShowEff = true;
        grid.tipEnabled = true;
        grid.vo = this._awards[idx];
    };
    Item_ActCom_Rank2.prototype.itemRender1 = function (idx, grid) {
        grid.setVo(this._bigAwards[idx], true);
    };
    Item_ActCom_Rank2.prototype.onHand = function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.ACTCOM_RANK_RANK, this._cfg);
    };
    Item_ActCom_Rank2.prototype.setVO = function (id, cfg, cfg1) {
        if (cfg1 === void 0) { cfg1 = null; }
        var self = this;
        // if (Model_GlobalMsg.sysID == UIConst.ACTCOM_RANK) {
        // 	self._cfg = Config.wszwxsxspm_325[id];
        // }
        self._cfg = cfg;
        self._awards = ConfigHelp.makeItemListArr(JSON.parse(self._cfg.reward));
        self.list.numItems = self._awards.length;
        if (self._cfg.big <= 0) {
            self.bpList.numItems = 0;
        }
        else {
            self._bigAwards = JSON.parse(self._cfg.reward1);
            self.bpList.numItems = this._bigAwards.length;
        }
    };
    Item_ActCom_Rank2.prototype.clean = function () {
        var self = this;
        self.bpList.numItems = 0;
        self.list.numItems = 0;
    };
    Item_ActCom_Rank2.URL = "ui://qz5r0meldsdy3";
    return Item_ActCom_Rank2;
}(fairygui.GLabel));
__reflect(Item_ActCom_Rank2.prototype, "Item_ActCom_Rank2");
