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
var WMSZIntegralItem = (function (_super) {
    __extends(WMSZIntegralItem, _super);
    function WMSZIntegralItem() {
        return _super.call(this) || this;
    }
    WMSZIntegralItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_WMSZ", "WMSZIntegralItem"));
    };
    WMSZIntegralItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.itemRenderer = s.renderHandle;
        s.list.callbackThisObj = s;
        s.list.setVirtual();
    };
    WMSZIntegralItem.prototype.setData = function (v) {
        var s = this;
        if (!v)
            return;
        s._vo = v;
        var cfg = Config.wmjf_779[v.id];
        s.labTarget.text = cfg.point + "";
        s._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
        s.list.numItems = s._listData.length;
        s.c1.selectedIndex = v.status;
        s.btnRec.checkNotice = v.status == 1 ? true : false;
        s.btnRec.addClickListener(s.onRec, s);
    };
    WMSZIntegralItem.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData[index];
    };
    WMSZIntegralItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var s = this;
        s.list.numItems = 0;
        s.btnRec.removeClickListener(s.onRec, s);
    };
    WMSZIntegralItem.prototype.onRec = function () {
        var s = this;
        if (s._vo.status == 0) {
            ViewCommonWarn.text("积分不足");
            return;
        }
        GGlobal.model_ActWMSZ.CG_GET_TARGETAWARD(s._vo.id);
    };
    WMSZIntegralItem.URL = "ui://5na9ulpxgv3t3";
    return WMSZIntegralItem;
}(fairygui.GComponent));
__reflect(WMSZIntegralItem.prototype, "WMSZIntegralItem");
