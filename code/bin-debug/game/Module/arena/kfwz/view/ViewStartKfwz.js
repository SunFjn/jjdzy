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
 * 跨服王者开始动画界面
 * @author: lujiahao
 * @date: 2019-12-12 18:07:37
 */
var ViewStartKfwz = (function (_super) {
    __extends(ViewStartKfwz, _super);
    function ViewStartKfwz() {
        var _this = _super.call(this) || this;
        // this.isClosePanel = false;
        _this.loadRes("Arena", "Arena_atlas0");
        return _this;
    }
    ViewStartKfwz.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewStartKfwz"));
    };
    ViewStartKfwz.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewStartKfwz").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        var t = this;
        t.mc = t.view.getTransition("mc");
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewStartKfwz.prototype.initView = function () {
        var t = this;
        t.list1.itemRenderer = t.onItemRender1;
        t.list1.callbackThisObj = t;
        t.list2.itemRenderer = t.onItemRender2;
        t.list2.callbackThisObj = t;
    };
    //=========================================== API ==========================================
    ViewStartKfwz.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.refreshData();
        IconUtil.setImg(t.bg1, Enum_Path.IMAGE_URL + "kfwz/start_bg1.png");
        IconUtil.setImg(t.bg2, Enum_Path.IMAGE_URL + "kfwz/start_bg2.png");
        t.mc.play(t.onMcComplete, t);
    };
    ViewStartKfwz.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        IconUtil.setImg(t.bg1, null);
        IconUtil.setImg(t.bg2, null);
    };
    ViewStartKfwz.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewStartKfwz.prototype.onItemRender1 = function (pIndex, pItem) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        if (t_model.myBattleList) {
            pItem.setData(t_model.myBattleList[pIndex]);
        }
    };
    ViewStartKfwz.prototype.onItemRender2 = function (pIndex, pItem) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        if (t_model.enemyBattleList) {
            pItem.setData(t_model.enemyBattleList[pIndex]);
        }
    };
    ViewStartKfwz.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t.list1.numItems = t_model.myBattleList.length;
        t.list2.numItems = t_model.enemyBattleList.length;
    };
    ViewStartKfwz.prototype.onMcComplete = function () {
        var t = this;
        t.closeView();
    };
    ViewStartKfwz.prototype.registerEvent = function (pFlag) {
        var t = this;
    };
    //>>>>end
    ViewStartKfwz.URL = "ui://me1skowlpzsw80";
    return ViewStartKfwz;
}(UIModalPanel));
__reflect(ViewStartKfwz.prototype, "ViewStartKfwz");
