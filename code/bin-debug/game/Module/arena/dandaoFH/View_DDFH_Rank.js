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
var View_DDFH_Rank = (function (_super) {
    __extends(View_DDFH_Rank, _super);
    function View_DDFH_Rank() {
        var _this = _super.call(this) || this;
        _this.isCross = false;
        _this.dataArr = [];
        fairygui.UIObjectFactory.setPackageItemExtension(DDFH_RankItem.URL, DDFH_RankItem);
        _this.childrenCreated();
        return _this;
    }
    View_DDFH_Rank.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("Arena", "View_DDFH_Rank").asCom;
        a.contentPane = a.view;
        a.rankLb = (a.view.getChild("rankLb"));
        a.titleLb = (a.view.getChild("titleLb"));
        a.tab0 = (a.view.getChild("tab0"));
        a.tab1 = (a.view.getChild("tab1"));
        a.list = (a.view.getChild("list"));
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandler;
        a.levelImg = (a.view.getChild("levelImg"));
        _super.prototype.childrenCreated.call(this);
        a.tab0.addClickListener(a.tabHandler, a);
        a.tab1.addClickListener(a.tabHandler, a);
        a.tab0.selected = true;
        Model_DDFH.getRankData();
    };
    View_DDFH_Rank.prototype.tabHandler = function (event) {
        var a = this;
        var tab = event.target;
        if (tab.id == a.tab0.id) {
            a.tab1.selected = false;
            a.updateShow();
        }
        else {
            a.tab0.selected = false;
            if (Model_DDFH.crossRankData.length <= 0) {
                GGlobal.modelddfh.CG_DANDAOFH_RANKDATA(2);
            }
            else {
                a.updateShow();
            }
        }
    };
    //排名B:段位L:玩家idU:玩家名字I:积分
    View_DDFH_Rank.prototype.renderHandler = function (index, obj) {
        var item = obj;
        if (index < this.dataArr.length) {
            item.show(this.dataArr[index], this.isCross);
        }
        else {
            item.show([index + 1, 0, 0, "虚位以待", 0], this.isCross);
        }
    };
    View_DDFH_Rank.prototype.updateShow = function () {
        var a = this;
        a.dataArr = [];
        if (a.tab0.selected) {
            if (Model_DDFH.myRank > 10 || Model_DDFH.myRank == 0) {
                a.rankLb.text = "我的排名：10+";
            }
            else {
                a.rankLb.text = "我的排名：" + Model_DDFH.myRank;
            }
            a.isCross = false;
            a.dataArr = Model_DDFH.rankData;
            a.list.numItems = 10;
        }
        else {
            a.isCross = true;
            a.dataArr = Model_DDFH.crossRankData;
            if (Model_DDFH.myCrossRank > 30 || Model_DDFH.myCrossRank == 0) {
                a.rankLb.text = "我的排名：30+";
            }
            else {
                a.rankLb.text = "我的排名：" + Model_DDFH.myCrossRank;
            }
            a.list.numItems = 30;
        }
        a.levelImg.url = CommonManager.getUrl("Arena", "grade_" + (Model_DDFH.level - 1));
    };
    View_DDFH_Rank.prototype.onShown = function () {
        var a = this;
        a.tab0.selected = true;
        a.tab1.selected = false;
        GGlobal.control.listen(Enum_MsgType.DANDAO_FUHUI_RANK, a.updateShow, a);
        GGlobal.modelddfh.CG_DANDAOFH_RANKDATA(1);
        a.updateShow();
    };
    View_DDFH_Rank.prototype.onHide = function () {
        var a = this;
        GGlobal.layerMgr.close(UIConst.DANDAO_FUHUI_RANK);
        GGlobal.control.remove(Enum_MsgType.DANDAO_FUHUI_RANK, a.updateShow, a);
        Model_DDFH.crossRankData = [];
        Model_DDFH.rankData = [];
    };
    View_DDFH_Rank.URL = "ui://me1skowlr4ogf";
    return View_DDFH_Rank;
}(UIModalPanel));
__reflect(View_DDFH_Rank.prototype, "View_DDFH_Rank");
