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
var ViewZhuanPanReward = (function (_super) {
    __extends(ViewZhuanPanReward, _super);
    function ViewZhuanPanReward() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewZhuanPanReward.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("sanGuoQingDian", "ViewZhuanPanReward").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.lbMyRank = (this.view.getChild("lbMyRank"));
        this.lbMyCount = (this.view.getChild("lbMyCount"));
        this.lbTips = (this.view.getChild("lbTips"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandler;
        this.list.setVirtual();
        this.isShowOpenAnimation = false;
        _super.prototype.childrenCreated.call(this);
    };
    ViewZhuanPanReward.prototype.onShown = function () {
        GGlobal.modelSGQD.CGOpenRank4125();
        GGlobal.modelSGQD.listen(ModelSGQD.msg_rank_zhuanpan, this.upView, this);
        this.upView();
    };
    ViewZhuanPanReward.prototype.upView = function () {
        this.list.numItems = 50;
        this.lbMyRank.text = ModelSGQD.zpRankMy == 0 ? "我的排名：未上榜" : "我的排名：" + ModelSGQD.zpRankMy;
        this.lbMyCount.text = "转盘次数：" + ModelSGQD.zpCtMy;
        this.lbTips.text = "上榜条件\n转盘" + ConfigHelp.getSystemNum(4605) + "次";
    };
    ViewZhuanPanReward.prototype.onHide = function () {
        this.list.numItems = 0;
        GGlobal.modelSGQD.remove(ModelSGQD.msg_rank_zhuanpan, this.upView, this);
        GGlobal.layerMgr.close(UIConst.SG_ZHUANPAN_REWARD);
    };
    ViewZhuanPanReward.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var v = ModelSGQD.zpRankArr[index];
        grid.setVo(v, index);
    };
    return ViewZhuanPanReward;
}(UIModalPanel));
__reflect(ViewZhuanPanReward.prototype, "ViewZhuanPanReward");
