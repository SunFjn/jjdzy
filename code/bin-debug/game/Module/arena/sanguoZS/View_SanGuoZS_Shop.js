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
var View_SanGuoZS_Shop = (function (_super) {
    __extends(View_SanGuoZS_Shop, _super);
    function View_SanGuoZS_Shop() {
        var _this = _super.call(this) || this;
        fairygui.UIObjectFactory.setPackageItemExtension(SanGuoZS_ShopItem.URL, SanGuoZS_ShopItem);
        _this.setSkin("Arena", "Arena_atlas0", "View_SanGuoZS_Shop");
        return _this;
    }
    View_SanGuoZS_Shop.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHandle;
        s.list.setVirtual();
        GGlobal.modelsgzs.CG_SANGUO_ZHANSHEN_OPEN_BZ();
    };
    View_SanGuoZS_Shop.prototype.renderHandle = function (index, obj) {
        obj.setVo(Model_SGZS.shopArr[index]);
    };
    View_SanGuoZS_Shop.prototype.updateShow = function () {
        var s = this;
        s.moneyLb.text = ConfigHelp.numToStr(Model_player.voMine.yuanbao);
        s.list.numItems = Model_SGZS.shopArr.length;
    };
    View_SanGuoZS_Shop.prototype.onShown = function () {
        var s = this;
        IconUtil.setImg(s.titleImg, Enum_Path.BACK_URL + "zsbz.jpg");
        IconUtil.setImg(s.moneyIcon, Enum_Path.ICON70_URL + "4.png");
        s.updateShow();
        GGlobal.control.listen(Enum_MsgType.SANGUO_ZHANSHEN_SHOP, s.updateShow, s);
    };
    View_SanGuoZS_Shop.prototype.onHide = function () {
        var s = this;
        IconUtil.setImg(s.titleImg, null);
        IconUtil.setImg(s.moneyIcon, null);
        s.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.SANGUO_ZHANSHEN_BZ);
        GGlobal.control.remove(Enum_MsgType.SANGUO_ZHANSHEN_SHOP, s.updateShow, s);
    };
    View_SanGuoZS_Shop.URL = "ui://me1skowlm40k3e";
    return View_SanGuoZS_Shop;
}(UIPanelBase));
__reflect(View_SanGuoZS_Shop.prototype, "View_SanGuoZS_Shop");
