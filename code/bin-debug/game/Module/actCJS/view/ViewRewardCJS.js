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
 * @date: 2019-11-21 20:19:15
 */
var ViewRewardCJS = (function (_super) {
    __extends(ViewRewardCJS, _super);
    function ViewRewardCJS() {
        var _this = _super.call(this) || this;
        _this.loadRes("actCJS", "actCJS_atlas0");
        return _this;
    }
    ViewRewardCJS.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCJS", "ViewRewardCJS"));
    };
    ViewRewardCJS.prototype.childrenCreated = function () {
        GGlobal.createPack("actCJS");
        this.view = fairygui.UIPackage.createObject("actCJS", "ViewRewardCJS").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewRewardCJS.prototype.initView = function () {
        this.list.itemRenderer = this.onItemRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    //=========================================== API ==========================================
    ViewRewardCJS.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        var t_model = GGlobal.modelCJS;
        t_model.CG_AchievementTree_openFloorUI_10571();
        t.refreshData();
        t.list.scrollToView(0);
    };
    ViewRewardCJS.prototype.onHide = function () {
        this.registerEvent(false);
        this.list.numItems = 0;
    };
    ViewRewardCJS.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewRewardCJS.prototype.onItemRender = function (pIndex, pItem) {
        if (this._dataList) {
            pItem.setData(this._dataList[pIndex]);
        }
    };
    ViewRewardCJS.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelCJS;
        var t_qs = t_model.getCurQs();
        var t_sourceList = t_model.getRewardVoListByQs(t_qs).concat();
        t_sourceList.sort(function (pA, pB) {
            return pB.sortValue - pA.sortValue;
        });
        t._dataList = t_sourceList;
        t.list.numItems = t_sourceList.length;
    };
    ViewRewardCJS.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.CJS_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.CJS_REWARD_UPDATE, t.onRewardUpdate, t);
    };
    //======================================== handler =========================================
    ViewRewardCJS.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ViewRewardCJS.prototype.onRewardUpdate = function () {
        var t = this;
        t.refreshData();
    };
    //>>>>end
    ViewRewardCJS.URL = "ui://ehocr0vupwnzb";
    return ViewRewardCJS;
}(UIModalPanel));
__reflect(ViewRewardCJS.prototype, "ViewRewardCJS");
