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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewGuanQiaRnk = (function (_super) {
    __extends(ViewGuanQiaRnk, _super);
    function ViewGuanQiaRnk() {
        var _this = _super.call(this) || this;
        _this._last = -999999;
        _this.loadRes("guanqia", "guanqia_atlas0");
        fairygui.UIObjectFactory.setPackageItemExtension(GuanQiaRnk.URL, GuanQiaRnk);
        return _this;
    }
    ViewGuanQiaRnk.createInstance = function () {
        return (fairygui.UIPackage.createObject("guanqia", "ViewGuanQiaRnk"));
    };
    ViewGuanQiaRnk.prototype.childrenCreated = function () {
        GGlobal.createPack("guanqia");
        this.view = fairygui.UIPackage.createObject("guanqia", "ViewGuanQiaRnk").asCom;
        this.contentPane = this.view;
        this.lbMine = (this.view.getChild("lbMine"));
        this.lbMineRank = (this.view.getChild("lbMineRank"));
        this.lbMineGuanQ = (this.view.getChild("lbMineGuanQ"));
        this.list = (this.view.getChild("list"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandle;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
        this.resetPosition();
    };
    ViewGuanQiaRnk.prototype.renderHandle = function (index, obj) {
        var item = obj;
        var d = GGlobal.modelGuanQia.rank;
        item.vo = d[index];
    };
    ViewGuanQiaRnk.prototype.onCloseHandler = function () {
        GGlobal.layerMgr.close(UIConst.GUANQIARNK);
    };
    ViewGuanQiaRnk.prototype.onShown = function () {
        this.update();
        this.request();
        GGlobal.control.listen(Enum_MsgType.MSG_GQ_RNK, this.update, this);
    };
    ViewGuanQiaRnk.prototype.onHide = function () {
        GGlobal.control.remove(Enum_MsgType.MSG_GQ_RNK, this.update, this);
        GGlobal.layerMgr.close(UIConst.GUANQIARNK);
        this.list.numItems = 0;
    };
    ViewGuanQiaRnk.prototype.request = function () {
        var now = egret.getTimer();
        if (now - this._last >= 30000) {
            GGlobal.modelGuanQia.CS_GETRANK_1107();
            this._last = now;
        }
    };
    ViewGuanQiaRnk.prototype.update = function () {
        var m = GGlobal.modelGuanQia;
        this.lbMineRank.text = "排名：" + (m.myRank > 0 ? m.myRank : "未上榜");
        this.lbMineGuanQ.text = "当前：" + m.curGuanQiaLv + "关";
        var dt = m.rank;
        this.list.numItems = dt.length;
        this.list.refreshVirtualList();
    };
    ViewGuanQiaRnk.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    ViewGuanQiaRnk.URL = "ui://r92dp953u94lo";
    return ViewGuanQiaRnk;
}(UIModalPanel));
__reflect(ViewGuanQiaRnk.prototype, "ViewGuanQiaRnk");
