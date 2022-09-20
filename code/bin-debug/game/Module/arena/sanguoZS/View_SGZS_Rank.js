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
var View_SGZS_Rank = (function (_super) {
    __extends(View_SGZS_Rank, _super);
    function View_SGZS_Rank() {
        var _this = _super.call(this) || this;
        fairygui.UIObjectFactory.setPackageItemExtension(SGZS_RankItem.URL, SGZS_RankItem);
        _this.childrenCreated();
        return _this;
    }
    View_SGZS_Rank.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("Arena", "View_SGZS_Rank").asCom;
        this.contentPane = this.view;
        this.rankLb = (this.view.getChild("rankLb"));
        this.list = (this.view.getChild("list"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandle;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    View_SGZS_Rank.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.vo = Config.warreward_222[14 - index];
    };
    View_SGZS_Rank.prototype.onShown = function () {
        this.list.numItems = 14;
        this.rankLb.text = "我的排名：" + Model_SGZS.myRank;
    };
    View_SGZS_Rank.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.SANGUO_ZHANSHEN_REWARD);
        this.list.numItems = 0;
    };
    View_SGZS_Rank.URL = "ui://me1skowlp24e9";
    return View_SGZS_Rank;
}(UIModalPanel));
__reflect(View_SGZS_Rank.prototype, "View_SGZS_Rank");
