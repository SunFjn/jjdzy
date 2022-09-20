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
 * @date: 2020-04-08 17:31:31
 */
var ViewRankXyfq = (function (_super) {
    __extends(ViewRankXyfq, _super);
    function ViewRankXyfq() {
        var _this = _super.call(this) || this;
        _this.loadRes("xyfq", "xyfq_atlas0");
        return _this;
    }
    ViewRankXyfq.createInstance = function () {
        return (fairygui.UIPackage.createObject("xyfq", "ViewRankXyfq"));
    };
    ViewRankXyfq.prototype.childrenCreated = function () {
        GGlobal.createPack("xyfq");
        this.view = fairygui.UIPackage.createObject("xyfq", "ViewRankXyfq").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewRankXyfq.prototype.initView = function () {
        var t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    };
    //=========================================== API ==========================================
    ViewRankXyfq.prototype.onShown = function () {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        t_model.CG_LuckSign_openRankUI_12153();
        t.registerEvent(true);
        t.refreshData();
        t.list.scrollToView(0);
    };
    ViewRankXyfq.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.list.numItems = 0;
    };
    ViewRankXyfq.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewRankXyfq.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    };
    ViewRankXyfq.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        t._dataList = t_model.getRankCfgList();
        if (t._dataList)
            t.list.numItems = t._dataList.length;
        else
            t.list.numItems = 0;
        if (t_model.myRankId > 0)
            t.tfMyRank.text = "\u6211\u7684\u6392\u540D\uFF1A" + t_model.myRankId;
        else
            t.tfMyRank.text = "我的排名：暂未上榜";
        t.tfMyCount.text = "\u62BD\u7B7E\uFF1A" + t_model.myRankCount + "\u6B21";
        t.tfDes.text = "\u524D\u4E09\u540D\u4E0A\u699C\u9700\u8981\u62BD\u7B7E" + t_model.rankRequire + "\u6B21";
    };
    ViewRankXyfq.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.XYFQ_RANK_UPDATE, t.onRankUpdate, t);
    };
    //======================================== handler =========================================
    ViewRankXyfq.prototype.onRankUpdate = function () {
        var t = this;
        t.refreshData();
    };
    //>>>>end
    ViewRankXyfq.URL = "ui://7hwmix0gbnypo";
    return ViewRankXyfq;
}(UIModalPanel));
__reflect(ViewRankXyfq.prototype, "ViewRankXyfq");
