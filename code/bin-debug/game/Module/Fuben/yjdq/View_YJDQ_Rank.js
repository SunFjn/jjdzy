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
var View_YJDQ_Rank = (function (_super) {
    __extends(View_YJDQ_Rank, _super);
    function View_YJDQ_Rank() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_YJDQ_Rank.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("FuBen", "View_YJDQ_Rank").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.list.callbackThisObj = this.view;
        this.list.itemRenderer = this.renderHandle;
        _super.prototype.childrenCreated.call(this);
    };
    View_YJDQ_Rank.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.show(Model_YJDQ.rankData[index]);
    };
    View_YJDQ_Rank.prototype.updateShow = function () {
        this.list.numItems = Model_YJDQ.rankData.length;
    };
    View_YJDQ_Rank.prototype.onShown = function () {
        this.updateShow();
        GGlobal.modelyjdq.CG_YJDQ_OPENRANK();
        GGlobal.control.listen(Enum_MsgType.YJDQ_RANK_UPDATE, this.updateShow, this);
    };
    View_YJDQ_Rank.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.FUBEN_YJDQ_RANK);
        GGlobal.control.remove(Enum_MsgType.YJDQ_RANK_UPDATE, this.updateShow, this);
        this.list.numItems = 0;
    };
    View_YJDQ_Rank.URL = "ui://pkuzcu87ejh47";
    return View_YJDQ_Rank;
}(UIModalPanel));
__reflect(View_YJDQ_Rank.prototype, "View_YJDQ_Rank");
