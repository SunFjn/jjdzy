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
var ItemHLDuiHuan = (function (_super) {
    __extends(ItemHLDuiHuan, _super);
    function ItemHLDuiHuan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemHLDuiHuan.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.btnHand.addClickListener(this.onHand, this);
        this.btnHand.text = "兑换";
    };
    ItemHLDuiHuan.prototype.onHand = function () {
        GGlobal.modelSGQD.CG4103(this._data.id);
    };
    ItemHLDuiHuan.prototype.setData = function (value) {
        this._data = value;
        this.container1.setGrids(value.cailiao, 3, 110);
        var arr = JSON.parse(value.cailiao);
        if (arr.length == 1) {
            this["n3"].x = 125;
            this.container2.x = 161;
        }
        else {
            this["n3"].x = 235;
            this.container2.x = 271;
        }
        this.container2.setGrids(value.daoju);
        this.updateState();
    };
    ItemHLDuiHuan.prototype.getData = function () {
        return this._data;
    };
    ItemHLDuiHuan.prototype.updateState = function () {
        var needs = JSON.parse(this._data.cailiao);
        var bool = true;
        for (var i = 0; i < needs.length; i++) {
            var arr = needs[i];
            var cnt = Model_Bag.getItemCount(arr[1]);
            if (cnt < arr[2]) {
                bool = false;
                break;
            }
        }
        if (needs.length == 0) {
            bool = false;
        }
        var rewards = JSON.parse(this._data.daoju);
        var xianZhi = this._data.cishu;
        var dhCnt = GGlobal.modelSGQD.haoLiInfo[this._data.id] == null ? 0 : GGlobal.modelSGQD.haoLiInfo[this._data.id];
        if (xianZhi > 0 && dhCnt >= xianZhi) {
            bool = false;
            this.iconFin.visible = true;
            this.btnHand.visible = false;
        }
        else {
            this.iconFin.visible = false;
            this.btnHand.visible = true;
        }
        this.txtInfo.text = "\u6536\u96C6\u4EE5\u4E0B\u7269\u54C1, \u53EF\u5151\u6362" + HtmlUtil.fontNoSize("(" + (bool ? rewards.length : 0) + "/" + rewards.length + ")", bool ? "#00ff00" : "#ff0000");
        this.txtDHCnt.text = this._data.cishu - dhCnt + "/" + this._data.cishu;
        if (xianZhi == 0 || dhCnt >= xianZhi) {
            this.txtDHCnt.text = "";
        }
        this.btnHand.checkNotice = bool;
    };
    ItemHLDuiHuan.prototype.onRemove = function () {
        this.container1.setGrids(null);
        this.container2.setGrids(null);
    };
    ItemHLDuiHuan.URL = "ui://kdt501v2tipm6";
    return ItemHLDuiHuan;
}(fairygui.GComponent));
__reflect(ItemHLDuiHuan.prototype, "ItemHLDuiHuan");
