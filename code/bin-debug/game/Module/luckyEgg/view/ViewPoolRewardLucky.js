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
 * @date: 2020-01-07 18:04:55
 */
var ViewPoolRewardLucky = (function (_super) {
    __extends(ViewPoolRewardLucky, _super);
    function ViewPoolRewardLucky() {
        var _this = _super.call(this) || this;
        _this._poolTypeList = [3, 2, 1];
        _this.loadRes("luckyEgg", "luckyEgg_atlas0");
        return _this;
    }
    ViewPoolRewardLucky.createInstance = function () {
        return (fairygui.UIPackage.createObject("luckyEgg", "ViewPoolRewardLucky"));
    };
    ViewPoolRewardLucky.checkOpen = function () {
        if (GGlobal.modelLuckyEgg.eggItemList.length == 0) {
            ViewCommonWarn.text("奖池暂时没有奖励，请先注入奖励");
            return false;
        }
        return true;
    };
    ViewPoolRewardLucky.prototype.childrenCreated = function () {
        GGlobal.createPack("luckyEgg");
        this.view = fairygui.UIPackage.createObject("luckyEgg", "ViewPoolRewardLucky").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewPoolRewardLucky.prototype.initView = function () {
        var t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    };
    //=========================================== API ==========================================
    ViewPoolRewardLucky.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.refreshData();
        t.list.scrollToView(0);
    };
    ViewPoolRewardLucky.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.list.numItems = 0;
    };
    ViewPoolRewardLucky.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewPoolRewardLucky.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._poolTypeList) {
            pItem.setData(t._poolTypeList[pIndex]);
        }
    };
    ViewPoolRewardLucky.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelLuckyEgg;
        t.list.numItems = t._poolTypeList.length;
    };
    ViewPoolRewardLucky.prototype.registerEvent = function (pFlag) {
        var t = this;
    };
    //>>>>end
    ViewPoolRewardLucky.URL = "ui://wx4kos8uxwoqj";
    return ViewPoolRewardLucky;
}(UIModalPanel));
__reflect(ViewPoolRewardLucky.prototype, "ViewPoolRewardLucky");
