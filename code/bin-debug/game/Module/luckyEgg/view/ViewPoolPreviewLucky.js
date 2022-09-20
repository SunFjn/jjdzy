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
 * 类型奖池奖励预览界面
 * @author: lujiahao
 * @date: 2020-01-07 17:55:56
 */
var ViewPoolPreviewLucky = (function (_super) {
    __extends(ViewPoolPreviewLucky, _super);
    function ViewPoolPreviewLucky() {
        var _this = _super.call(this) || this;
        _this._dataList = [];
        _this.loadRes("luckyEgg", "luckyEgg_atlas0");
        return _this;
    }
    ViewPoolPreviewLucky.createInstance = function () {
        return (fairygui.UIPackage.createObject("luckyEgg", "ViewPoolPreviewLucky"));
    };
    ViewPoolPreviewLucky.prototype.childrenCreated = function () {
        GGlobal.createPack("luckyEgg");
        this.view = fairygui.UIPackage.createObject("luckyEgg", "ViewPoolPreviewLucky").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewPoolPreviewLucky.prototype.initView = function () {
        var t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    };
    //=========================================== API ==========================================
    ViewPoolPreviewLucky.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.refreshData();
        var t_selectedIndex = 0;
        if (t._args && "poolType" in t._args) {
            if (t._dataList) {
                for (var i = 0; i < t._dataList.length; i++) {
                    if (t._dataList[i].poolType == t._args.poolType) {
                        t_selectedIndex = i;
                        break;
                    }
                }
            }
        }
        t.list.selectedIndex = -1;
        t.list.selectedIndex = t_selectedIndex;
        t.list.scrollToView(t_selectedIndex);
    };
    ViewPoolPreviewLucky.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t._dataList.length = 0;
        t.list.numItems = 0;
    };
    ViewPoolPreviewLucky.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewPoolPreviewLucky.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    };
    ViewPoolPreviewLucky.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelLuckyEgg;
        var t_qs = t_model.getCurQs();
        var t_list = t_model.getPoolVoListByQs(t_qs);
        t._dataList = t_list.concat();
        t._dataList.reverse();
        t.list.numItems = t._dataList.length;
    };
    ViewPoolPreviewLucky.prototype.registerEvent = function (pFlag) {
        var t = this;
    };
    //>>>>end
    ViewPoolPreviewLucky.URL = "ui://wx4kos8ulxqwm";
    return ViewPoolPreviewLucky;
}(UIModalPanel));
__reflect(ViewPoolPreviewLucky.prototype, "ViewPoolPreviewLucky");
