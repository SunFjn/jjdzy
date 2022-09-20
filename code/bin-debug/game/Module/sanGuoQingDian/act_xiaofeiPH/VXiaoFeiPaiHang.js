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
var VXiaoFeiPaiHang = (function (_super) {
    __extends(VXiaoFeiPaiHang, _super);
    function VXiaoFeiPaiHang() {
        var _this = _super.call(this) || this;
        _this.loadRes("sanGuoQingDian", "sanGuoQingDian_atlas0");
        return _this;
    }
    VXiaoFeiPaiHang.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("sanGuoQingDian", "VXiaoFeiPaiHang").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.list.itemRenderer = function (i, r) { r.setData(i); };
        _super.prototype.childrenCreated.call(this);
    };
    VXiaoFeiPaiHang.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        this.list.numItems = 50;
    };
    // private getDatas() {
    //     const voact = GGlobal.modelActivity.get(UIConst.SANGUOQD, UIConst.XIAOFEIPH);
    //     var datas = [];
    //     const lib = Config.sgxfph_261;
    //     for(let key in lib) {
    //         const cfg = lib[key];
    //         if(cfg.qs == voact.qs) {
    //             datas.push(cfg);
    //         }
    //     }
    //     return datas;
    // }
    VXiaoFeiPaiHang.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        GGlobal.layerMgr.close(this.panelId);
        this.list.numItems = 0;
    };
    return VXiaoFeiPaiHang;
}(UIModalPanel));
__reflect(VXiaoFeiPaiHang.prototype, "VXiaoFeiPaiHang");
