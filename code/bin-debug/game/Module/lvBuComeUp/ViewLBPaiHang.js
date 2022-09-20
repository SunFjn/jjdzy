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
var ViewLBPaiHang = (function (_super) {
    __extends(ViewLBPaiHang, _super);
    function ViewLBPaiHang() {
        var _this = _super.call(this) || this;
        _this.loadRes("LvBuComeUp", "LvBuComeUp_atlas0");
        return _this;
    }
    ViewLBPaiHang.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        GGlobal.createPack("LvBuComeUp");
        var self = this;
        self.view = self.contentPane = fairygui.UIPackage.createObject("LvBuComeUp", "ViewLBPaiHang").asCom;
        self.list = self.view.getChild("list").asList;
        self.list.itemRenderer = self.onRender;
        self.list.setVirtual();
        self.list.callbackThisObj = self;
    };
    ViewLBPaiHang.prototype.onRender = function (index, item) {
        var data = this.datas[index];
        item.vo = data;
        item.index = index;
    };
    ViewLBPaiHang.prototype.onUpdate = function (datas) {
        this.datas = datas;
        this.list.numItems = datas.length;
    };
    ViewLBPaiHang.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        GGlobal.modelLvBuCompup.listen(ModelLvBuComeUp.msg_paiHang, this.onUpdate, this);
        GGlobal.modelLvBuCompup.CG2713();
    };
    ViewLBPaiHang.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        GGlobal.layerMgr.close(UIConst.VIEWLBPAIHANG);
        GGlobal.modelLvBuCompup.remove(ModelLvBuComeUp.msg_paiHang, this.onUpdate, this);
        this.list.numItems = 0;
    };
    return ViewLBPaiHang;
}(UIModalPanel));
__reflect(ViewLBPaiHang.prototype, "ViewLBPaiHang");
