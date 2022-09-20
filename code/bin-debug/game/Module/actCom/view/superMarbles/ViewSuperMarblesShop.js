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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewSuperMarblesShop = (function (_super) {
    __extends(ViewSuperMarblesShop, _super);
    function ViewSuperMarblesShop() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewSuperMarblesShop.createInstance = function () {
        return (fairygui.UIPackage.createObject("superMarbles", "ViewSuperMarblesShop"));
    };
    ViewSuperMarblesShop.prototype.childrenCreated = function () {
        var self = this;
        var view = fairygui.UIPackage.createObject("superMarbles", "ViewSuperMarblesShop").asCom;
        self.contentPane = view;
        CommonManager.parseChildren(view, self);
        self.list.itemRenderer = self.render;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewSuperMarblesShop.prototype.render = function (idx, obj) {
        obj.update(idx);
    };
    ViewSuperMarblesShop.prototype.udpate = function () {
        var self = this;
        self.list.numItems = GGlobal.modelSuperMarbles.shopcfg.length;
        self.costLb.text = GGlobal.modelSuperMarbles.score + "";
        self.n2.url = "ui://gf2tw9lz77k97";
    };
    ViewSuperMarblesShop.prototype.onShown = function () {
        var self = this;
        GGlobal.modelSuperMarbles.CG_shopdata();
        IconUtil.setImg(self.headIcon, Enum_Path.BACK_URL + "cjdzbg.jpg");
        GGlobal.control.listen(UIConst.ACTCOMCJDZ_SHOP, self.udpate, self);
    };
    ViewSuperMarblesShop.prototype.onHide = function () {
        var self = this;
        IconUtil.setImg(self.headIcon, null);
        self.list.numItems = 0;
        GGlobal.control.remove(UIConst.ACTCOMCJDZ_SHOP, self.udpate, self);
        GGlobal.layerMgr.close(UIConst.ACTCOMCJDZ_SHOP);
    };
    ViewSuperMarblesShop.URL = "ui://gf2tw9lzx9uy2";
    return ViewSuperMarblesShop;
}(UIModalPanel));
__reflect(ViewSuperMarblesShop.prototype, "ViewSuperMarblesShop");
