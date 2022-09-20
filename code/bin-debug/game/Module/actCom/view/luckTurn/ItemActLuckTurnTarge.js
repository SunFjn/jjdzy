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
var ItemActLuckTurnTarge = (function (_super) {
    __extends(ItemActLuckTurnTarge, _super);
    function ItemActLuckTurnTarge() {
        return _super.call(this) || this;
    }
    ItemActLuckTurnTarge.createInstance = function () {
        return (fairygui.UIPackage.createObject("actLuckTurn", "ItemActLuckTurnTarge"));
    };
    ItemActLuckTurnTarge.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.itemRenderer = this.renderHandle;
        s.list.callbackThisObj = this;
        s.list.setVirtual();
        s.btnRec.addClickListener(this.onRec, this);
    };
    ItemActLuckTurnTarge.prototype.setVo = function (v) {
        this._vo = v;
        var rankCfg = Config.slfplsb_330[v.id];
        if (v) {
            this.labPoint.text = "获胜次数：" + rankCfg.cs;
            this._dataArr1 = ConfigHelp.makeItemListArr(JSON.parse(rankCfg.show));
        }
        else {
            this.labPoint.text = "";
            this._dataArr1 = [];
        }
        this.lbNo.visible = false;
        if (v.st == 0) {
            this.btnRec.visible = false;
            this.imgGet.visible = false;
            this.btnRec.checkNotice = false;
            this.lbNo.visible = true;
        }
        else if (v.st == 1) {
            this.btnRec.visible = true;
            this.imgGet.visible = false;
            this.btnRec.checkNotice = true;
        }
        else {
            this.btnRec.visible = false;
            this.imgGet.visible = true;
        }
        this.list.numItems = this._dataArr1.length;
    };
    ItemActLuckTurnTarge.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = v.isShowEff = true;
        v.vo = this._dataArr1[index];
    };
    ItemActLuckTurnTarge.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    ItemActLuckTurnTarge.prototype.onRec = function () {
        if (this._vo.st == 0) {
            ViewCommonWarn.text("翻牌次数不足");
            return;
        }
        GGlobal.model_LuckTurn.CG_TARGET_GET_10345(Number(this._vo.id));
    };
    ItemActLuckTurnTarge.URL = "ui://px5jiht9fvskg";
    return ItemActLuckTurnTarge;
}(fairygui.GComponent));
__reflect(ItemActLuckTurnTarge.prototype, "ItemActLuckTurnTarge");
