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
 * 对对联排行榜界面
 */
var ViewRankDDL = (function (_super) {
    __extends(ViewRankDDL, _super);
    function ViewRankDDL() {
        var _this = _super.call(this) || this;
        _this._qs = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewRankDDL.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActCom_DDL", "ViewRankDDL").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewRankDDL.prototype.onShown = function () {
        this.addListen();
        this._qs = this._args.qs;
        GGlobal.model_DDL.CG_OPEN_RANKUI();
    };
    ViewRankDDL.prototype.onHide = function () {
        this.removeListen();
        this.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.DDL_RANK);
    };
    ViewRankDDL.prototype.addListen = function () {
        GGlobal.control.listen(UIConst.DDL_RANK, this.updateView, this);
    };
    ViewRankDDL.prototype.removeListen = function () {
        GGlobal.control.remove(UIConst.DDL_RANK, this.updateView, this);
    };
    /**
     * 更新界面数据
     */
    ViewRankDDL.prototype.updateView = function () {
        var model = GGlobal.model_DDL;
        var self = this;
        self.lbMyRank.text = model.myRank > 0 ? "我的排名：" + model.myRank : "我的排名：未上榜";
        self.lbMyCount.text = "我对出" + model.myCount + "联";
        var max = 0;
        for (var keys in Config.ddlrank_297) {
            var cfg = Config.ddlrank_297[keys];
            var arr = ConfigHelp.SplitStr(cfg.rank);
            max = arr[0][1];
        }
        self.list.numItems = max;
    };
    ViewRankDDL.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.setVo(GGlobal.model_DDL.rankArr[index], index, this._qs);
    };
    ViewRankDDL.URL = "ui://ke8qv0ckxn887";
    return ViewRankDDL;
}(UIModalPanel));
__reflect(ViewRankDDL.prototype, "ViewRankDDL");
