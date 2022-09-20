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
/**
 * @author: lujiahao
 * @date: 2020-04-10 10:33:24
 */
var ViewCompoundXyfq = (function (_super) {
    __extends(ViewCompoundXyfq, _super);
    function ViewCompoundXyfq() {
        var _this = _super.call(this) || this;
        _this.loadRes("xyfq", "xyfq_atlas0");
        return _this;
    }
    ViewCompoundXyfq.createInstance = function () {
        return (fairygui.UIPackage.createObject("xyfq", "ViewCompoundXyfq"));
    };
    ViewCompoundXyfq.prototype.childrenCreated = function () {
        GGlobal.createPack("xyfq");
        this.view = fairygui.UIPackage.createObject("xyfq", "ViewCompoundXyfq").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewCompoundXyfq.prototype.initView = function () {
        var t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    };
    //=========================================== API ==========================================
    ViewCompoundXyfq.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.refreshData();
        t.list.scrollToView(0);
    };
    ViewCompoundXyfq.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.list.numItems = 0;
    };
    ViewCompoundXyfq.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewCompoundXyfq.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    };
    ViewCompoundXyfq.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        t._dataList = t_model.getCompQianVoList().concat();
        t._dataList.reverse();
        t.list.numItems = t._dataList.length;
    };
    ViewCompoundXyfq.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.XYFQ_UPDATE, t.onUpdate, t);
    };
    //======================================== handler =========================================
    ViewCompoundXyfq.prototype.onUpdate = function () {
        var t = this;
        t.list.refreshVirtualList();
    };
    //>>>>end
    ViewCompoundXyfq.URL = "ui://7hwmix0gszt5v";
    return ViewCompoundXyfq;
}(UIModalPanel));
__reflect(ViewCompoundXyfq.prototype, "ViewCompoundXyfq");
