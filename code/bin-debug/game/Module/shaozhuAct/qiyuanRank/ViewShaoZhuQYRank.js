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
 * 少主祈愿排名界面
 */
var ViewShaoZhuQYRank = (function (_super) {
    __extends(ViewShaoZhuQYRank, _super);
    function ViewShaoZhuQYRank() {
        var _this = _super.call(this) || this;
        _this.datas = [];
        _this.indexs = [];
        fairygui.UIObjectFactory.setPackageItemExtension(ItemShaoZhuQyRank.URL, ItemShaoZhuQyRank);
        _this.loadRes("shaozhuAct", "shaozhuAct_atlas0");
        return _this;
    }
    ViewShaoZhuQYRank.prototype.childrenCreated = function () {
        var self = this;
        fairygui.UIPackage.addPackage("shaozhuAct");
        var view = fairygui.UIPackage.createObject("shaozhuAct", "ViewShaoZhuQYRank").asCom;
        self.contentPane = view;
        CommonManager.parseChildren(view, self);
        self.list.itemRenderer = self.onListRender;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewShaoZhuQYRank.prototype.onListRender = function (index, render) {
        render.setData(this.datas[index], this.indexs[index]);
    };
    ViewShaoZhuQYRank.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        var s = this;
        s.onUpdate();
    };
    ViewShaoZhuQYRank.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        this.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.SHAOZHU_QY_RANK_VIEW);
    };
    ViewShaoZhuQYRank.prototype.onUpdate = function () {
        this.datas = [];
        this.indexs = [];
        // let cfg:Iszqypm_272 = this._args;
        // let arr = JSON.parse(cfg.rank);
        // let start:number = arr[0][0];
        // let end:number = arr[0][1];
        for (var i = 0; i < 20; i++) {
            var vo = ModelShaoZhuAct.rankData[i];
            this.datas.push(vo);
            this.indexs.push(i);
        }
        this.list.numItems = this.datas.length;
        this.list.scrollToView(0);
    };
    return ViewShaoZhuQYRank;
}(UIModalPanel));
__reflect(ViewShaoZhuQYRank.prototype, "ViewShaoZhuQYRank");
