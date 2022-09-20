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
 * 洗练排名界面
 */
var ViewXiLianRank = (function (_super) {
    __extends(ViewXiLianRank, _super);
    function ViewXiLianRank() {
        var _this = _super.call(this) || this;
        _this.datas = [];
        _this.indexs = [];
        _this.loadRes("actHolyBeast", "actHolyBeast_atlas0");
        return _this;
    }
    ViewXiLianRank.prototype.childrenCreated = function () {
        GGlobal.createPack("actHolyBeast");
        this.view = fairygui.UIPackage.createObject("actHolyBeast", "ViewXiLianRank").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.list.itemRenderer = this.onListRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewXiLianRank.prototype.onListRender = function (index, render) {
        render.setData(this.datas[index], this.indexs[index]);
    };
    ViewXiLianRank.prototype.onShown = function () {
        var s = this;
        s.onUpdate();
    };
    ViewXiLianRank.prototype.onHide = function () {
        this.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.ACTHB_XILIANRANK_VIEW);
    };
    ViewXiLianRank.prototype.onUpdate = function () {
        this.datas = [];
        this.indexs = [];
        // let cfg:Ishxlpm_268 = this._args;
        // let arr = JSON.parse(cfg.rank);
        // let start:number = arr[0][0];
        // let end:number = arr[0][1];
        for (var i = 0; i < 20; i++) {
            var vo = Model_ActHolyBeast.rankData[i];
            this.datas.push(vo);
            this.indexs.push(i);
        }
        this.list.numItems = this.datas.length;
        this.list.scrollToView(0);
    };
    return ViewXiLianRank;
}(UIModalPanel));
__reflect(ViewXiLianRank.prototype, "ViewXiLianRank");
