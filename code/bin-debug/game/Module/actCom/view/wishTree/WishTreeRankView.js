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
 * 许愿树排行奖励
 */
var WishTreeRankView = (function (_super) {
    __extends(WishTreeRankView, _super);
    function WishTreeRankView() {
        var _this = _super.call(this) || this;
        _this.dataArr = [];
        _this._qs = 0;
        _this.childrenCreated();
        return _this;
    }
    WishTreeRankView.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("ActCom_WishTree", "WishTreeRankView").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    WishTreeRankView.prototype.onShown = function () {
        this.dataArr = [];
        this._qs = this._args.qs;
        this.addListen();
        GGlobal.modelWishTree.CG_OPEN_RANKUI();
    };
    WishTreeRankView.prototype.onHide = function () {
        this.removeListen();
        this.list.numItems = 0;
        GGlobal.layerMgr.close(this.panelId);
    };
    WishTreeRankView.prototype.addListen = function () {
        GGlobal.control.listen(UIConst.WISHTREE_RANK, this.update, this);
    };
    WishTreeRankView.prototype.removeListen = function () {
        GGlobal.control.remove(UIConst.WISHTREE_RANK, this.update, this);
    };
    WishTreeRankView.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.setVo(this.dataArr[index], index, this._qs);
    };
    WishTreeRankView.prototype.update = function () {
        var model = GGlobal.modelWishTree;
        var rk = "";
        var ct = "";
        this.dataArr = model.rankArr;
        // this.list.numItems = this.dataArr.length;
        this.list.numItems = 10;
        this.list.scrollToView(0);
        rk = model.myRank ? model.myRank + "" : "未上榜";
        ct = model.myWish ? model.myWish + "" : "0";
        this.lbMy.text = "我的排名：" + rk + "          我的许愿次数：" + ct;
    };
    WishTreeRankView.URL = "ui://zyevj37nlwy26";
    return WishTreeRankView;
}(UIModalPanel));
__reflect(WishTreeRankView.prototype, "WishTreeRankView");
