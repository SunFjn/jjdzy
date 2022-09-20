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
 * 鉴定排名界面
 */
var ViewAuthenRank = (function (_super) {
    __extends(ViewAuthenRank, _super);
    function ViewAuthenRank() {
        var _this = _super.call(this) || this;
        _this.datas = [];
        _this.indexs = [];
        fairygui.UIObjectFactory.setPackageItemExtension(ItemAuthenRank.URL, ItemAuthenRank);
        _this.loadRes("eightLock", "eightLock_atlas0");
        return _this;
    }
    ViewAuthenRank.prototype.childrenCreated = function () {
        GGlobal.createPack("eightLock");
        var view = fairygui.UIPackage.createObject("eightLock", "ViewAuthenRank").asCom;
        this.contentPane = view;
        CommonManager.parseChildren(view, this);
        this.list.itemRenderer = this.onListRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewAuthenRank.prototype.onListRender = function (index, render) {
        render.setData(this.datas[index], this.indexs[index]);
    };
    ViewAuthenRank.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        var s = this;
        s.onUpdate();
    };
    ViewAuthenRank.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        var s = this;
        s.list.numItems = 0;
        GGlobal.layerMgr.close(s.panelId);
    };
    ViewAuthenRank.prototype.onUpdate = function () {
        this.datas = [];
        this.indexs = [];
        // let cfg:Ibmjsjdpm_262 = this._args;
        // let arr = JSON.parse(cfg.rank);
        // let start:number = arr[0][0];
        // let end:number = arr[0][1];
        for (var i = 0; i < 20; i++) {
            var vo = ModelEightLock.rankData[i];
            this.datas.push(vo);
            this.indexs.push(i);
        }
        this.list.numItems = this.datas.length;
        this.list.scrollToView(0);
    };
    return ViewAuthenRank;
}(UIModalPanel));
__reflect(ViewAuthenRank.prototype, "ViewAuthenRank");
