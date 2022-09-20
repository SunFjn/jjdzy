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
var WishTreeTargetItem = (function (_super) {
    __extends(WishTreeTargetItem, _super);
    function WishTreeTargetItem() {
        return _super.call(this) || this;
    }
    WishTreeTargetItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_WishTree", "WishTreeTargetItem"));
    };
    WishTreeTargetItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.btnRec.addClickListener(this.onRec, this);
    };
    WishTreeTargetItem.prototype.setVo = function (v, index, systemId) {
        this._vo = v;
        var rankCfg = Config.xysslb_328[v.id];
        this._systemId = systemId;
        if (v) {
            this.labPoint.text = "许愿次数：" + rankCfg.time;
            this._dataArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rankCfg.reward));
        }
        else {
            this.labPoint.text = "";
            this._dataArr = [];
        }
        this.n4.visible = false;
        if (v.status == 0) {
            this.btnRec.visible = false;
            this.imgGet.visible = false;
            this.btnRec.checkNotice = false;
            this.n4.visible = true;
        }
        else if (v.status == 1) {
            this.btnRec.visible = true;
            this.imgGet.visible = false;
            this.btnRec.checkNotice = true;
        }
        else {
            this.btnRec.visible = false;
            this.imgGet.visible = true;
        }
        this.list.numItems = this._dataArr.length;
    };
    WishTreeTargetItem.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._dataArr[index];
    };
    WishTreeTargetItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    WishTreeTargetItem.prototype.onRec = function () {
        if (this._vo.status == 0) {
            ViewCommonWarn.text("许愿次数不足");
            return;
        }
        GGlobal.modelWishTree.CG_GET_TARGETAWARD(this._vo.id, this._systemId);
    };
    WishTreeTargetItem.URL = "ui://zyevj37nlonve";
    return WishTreeTargetItem;
}(fairygui.GComponent));
__reflect(WishTreeTargetItem.prototype, "WishTreeTargetItem");
