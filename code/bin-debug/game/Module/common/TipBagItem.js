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
var TipBagItem = (function (_super) {
    __extends(TipBagItem, _super);
    function TipBagItem() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    TipBagItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TipBagItem"));
    };
    TipBagItem.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "TipBagItem").asCom;
        this.contentPane = this.view;
        this.childTip = (this.view.getChild("childTip"));
        _super.prototype.childrenCreated.call(this);
    };
    TipBagItem.prototype.onShown = function () {
        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
        this.childTip.lbDes.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        this.childTip.lbSource.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
    };
    TipBagItem.prototype.onHide = function () {
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
        this.childTip.lbDes.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        this.childTip.lbSource.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        GGlobal.layerMgr.close(UIConst.TIP_BAG_ITEM);
    };
    TipBagItem.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.show(arg);
        this.resize();
    };
    TipBagItem.prototype.show = function (obj) {
        this.childTip.vo = obj;
    };
    TipBagItem.prototype.resize = function () {
        this.setXY((fairygui.GRoot.inst.width - this.frame.width) / 2, (fairygui.GRoot.inst.height - this.frame.height) / 2);
    };
    TipBagItem.URL = "ui://jvxpx9em7g6v23";
    return TipBagItem;
}(UIModalPanel));
__reflect(TipBagItem.prototype, "TipBagItem");
