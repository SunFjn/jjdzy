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
var HeFu_CZFL_Item = (function (_super) {
    __extends(HeFu_CZFL_Item, _super);
    function HeFu_CZFL_Item() {
        return _super.call(this) || this;
    }
    HeFu_CZFL_Item.createInstance = function () {
        return (fairygui.UIPackage.createObject("hefuActCZFL", "HeFu_CZFL_Item"));
    };
    HeFu_CZFL_Item.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.btnGet.addClickListener(this.onClickGet, this);
        this.btnRec.addClickListener(this.onClickRec, this);
    };
    HeFu_CZFL_Item.prototype.setVo = function (obj) {
        this._cfg = Config.hfkhczfljl_286[obj.id];
        var colorStr = obj.num >= this._cfg.cs ? Color.GREENSTR : Color.REDSTR;
        this.lab.text = this._cfg.name + "<font color='" + colorStr + "'>（" + obj.num + "/" + this._cfg.cs + "）</font>";
        this._status = obj ? obj.status : 0;
        if (this._status == 0) {
            this.btnGet.touchable = this.btnGet.visible = false;
            this.btnRec.touchable = this.btnRec.visible = true;
            this.btnGet.grayed = true;
            this.imgGet.visible = false;
        }
        else if (this._status == 1) {
            this.btnGet.checkNotice = this.btnGet.touchable = this.btnGet.visible = true;
            this.btnRec.touchable = this.btnRec.visible = false;
            this.btnGet.grayed = false;
            this.imgGet.visible = false;
        }
        else if (this._status == 2) {
            this.btnGet.touchable = this.btnGet.visible = false;
            this.btnRec.touchable = this.btnRec.visible = false;
            this.imgGet.visible = true;
        }
        else {
            this.btnGet.touchable = this.btnGet.visible = false;
            this.btnRec.touchable = this.btnRec.visible = false;
            this.imgGet.visible = false;
        }
        this._listData = null;
        //奖励显示
        this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(this._cfg.reward));
        this.list.numItems = this._listData ? this._listData.length : 0;
    };
    HeFu_CZFL_Item.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this._listData[index];
    };
    HeFu_CZFL_Item.prototype.onClickGet = function () {
        if (this._status == 0) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        GGlobal.model_actCom.CG_CZFL_GETREWARD(this._cfg.id);
    };
    HeFu_CZFL_Item.prototype.onClickRec = function (e) {
        GGlobal.layerMgr.open(this._cfg.open);
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    HeFu_CZFL_Item.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    HeFu_CZFL_Item.URL = "ui://07jsdu7hqftx3";
    return HeFu_CZFL_Item;
}(fairygui.GComponent));
__reflect(HeFu_CZFL_Item.prototype, "HeFu_CZFL_Item");
