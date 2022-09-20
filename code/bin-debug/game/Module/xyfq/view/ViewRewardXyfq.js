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
 * @date: 2020-04-09 16:24:53
 */
var ViewRewardXyfq = (function (_super) {
    __extends(ViewRewardXyfq, _super);
    function ViewRewardXyfq() {
        var _this = _super.call(this) || this;
        _this.loadRes("xyfq", "xyfq_atlas0");
        return _this;
    }
    ViewRewardXyfq.createInstance = function () {
        return (fairygui.UIPackage.createObject("xyfq", "ViewRewardXyfq"));
    };
    ViewRewardXyfq.prototype.childrenCreated = function () {
        GGlobal.createPack("xyfq");
        this.view = fairygui.UIPackage.createObject("xyfq", "ViewRewardXyfq").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewRewardXyfq.prototype.initView = function () {
        var t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    };
    //=========================================== API ==========================================
    ViewRewardXyfq.prototype.onShown = function () {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        t.registerEvent(true);
        t.refreshData();
        t.list.scrollToView(0);
    };
    ViewRewardXyfq.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.list.numItems = 0;
    };
    ViewRewardXyfq.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewRewardXyfq.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    };
    ViewRewardXyfq.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        t._dataList = t_model.getQianVoList().concat();
        t._dataList.reverse();
        t.list.numItems = t._dataList.length;
    };
    ViewRewardXyfq.prototype.registerEvent = function (pFlag) {
        var t = this;
    };
    //>>>>end
    ViewRewardXyfq.URL = "ui://7hwmix0gbnypt";
    return ViewRewardXyfq;
}(UIModalPanel));
__reflect(ViewRewardXyfq.prototype, "ViewRewardXyfq");
