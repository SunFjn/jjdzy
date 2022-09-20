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
 * 段位奖励界面
 * @author: lujiahao
 * @date: 2019-12-07 14:37:45
 */
var ViewGradeRewardKfwz = (function (_super) {
    __extends(ViewGradeRewardKfwz, _super);
    function ViewGradeRewardKfwz() {
        var _this = _super.call(this) || this;
        _this.loadRes("Arena", "Arena_atlas0");
        return _this;
    }
    ViewGradeRewardKfwz.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewGradeRewardKfwz"));
    };
    ViewGradeRewardKfwz.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewGradeRewardKfwz").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewGradeRewardKfwz.prototype.initView = function () {
        var t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    };
    //=========================================== API ==========================================
    ViewGradeRewardKfwz.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.refreshData();
    };
    ViewGradeRewardKfwz.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t._dataList = null;
        t.list.numItems = 0;
    };
    ViewGradeRewardKfwz.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewGradeRewardKfwz.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    };
    ViewGradeRewardKfwz.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        var t_list = t_model.getGradeList().concat();
        t_list.splice(0, 1);
        t._dataList = t_list;
        t.list.numItems = t_list.length;
        t.gradeCtrl.selectedIndex = t_model.myGrade - 1;
    };
    ViewGradeRewardKfwz.prototype.registerEvent = function (pFlag) {
        var t = this;
    };
    //>>>>end
    ViewGradeRewardKfwz.URL = "ui://me1skowlpmqq75";
    return ViewGradeRewardKfwz;
}(UIModalPanel));
__reflect(ViewGradeRewardKfwz.prototype, "ViewGradeRewardKfwz");
