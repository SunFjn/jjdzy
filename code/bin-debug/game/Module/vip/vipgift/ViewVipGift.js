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
var ViewVipGift = (function (_super) {
    __extends(ViewVipGift, _super);
    function ViewVipGift() {
        var _this = _super.call(this) || this;
        _this.isShowOpenAnimation = false;
        _this.setSkin("vip", "vip_atlas0", "ViewVipGift");
        return _this;
    }
    ViewVipGift.createInstance = function () {
        return (fairygui.UIPackage.createObject("vip", "ViewVipGift"));
    };
    ViewVipGift.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ItemVipGift.URL, ItemVipGift);
    };
    ViewVipGift.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        s.n3.callbackThisObj = s;
        s.n3.itemRenderer = s.itemRender;
        s.n3.setVirtual();
    };
    ViewVipGift.prototype.itemRender = function (idx, ovj) {
        var item = ovj;
        item.setdata(this._sortDta[idx]);
    };
    ViewVipGift.prototype.updateList = function () {
        var m = GGlobal.modelvip;
        var num = m.getMaxVip() + 1;
        var head = [];
        var tail = [];
        for (var i = 0; i < num; i++) {
            if (m.vipGiftData.indexOf(i + 1) != -1)
                tail.push(i);
            else
                head.push(i);
        }
        this._sortDta = head.concat(tail);
        this.n3.numItems = num;
    };
    ViewVipGift.prototype.onShown = function () {
        var s = this;
        s.updateList();
        GGlobal.control.listen(UIConst.VIP, s.updateList, s);
    };
    ViewVipGift.prototype.onHide = function () {
        var s = this;
        GGlobal.control.remove(UIConst.VIP, s.updateList, s);
        GGlobal.layerMgr.close2(UIConst.VIPGIFT);
        s.n3.numItems = 0;
    };
    ViewVipGift.URL = "ui://w4xdcvn7fbywa";
    return ViewVipGift;
}(UIPanelBase));
__reflect(ViewVipGift.prototype, "ViewVipGift");
