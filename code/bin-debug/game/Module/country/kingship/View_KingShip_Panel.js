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
var View_KingShip_Panel = (function (_super) {
    __extends(View_KingShip_Panel, _super);
    function View_KingShip_Panel() {
        var _this = _super.call(this) || this;
        _this.setSkin("country", "country_atlas0", "View_KingShip_Panel");
        return _this;
    }
    View_KingShip_Panel.prototype.setExtends = function () {
        var fc = fairygui.UIObjectFactory.setPackageItemExtension;
        fc(ChildKingShipResult.URL, ChildKingShipResult);
        fc(VKingShipPly.URL, VKingShipPly);
    };
    View_KingShip_Panel.prototype.initView = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("country", "View_KingShip_Panel").asCom;
        self.contentPane = self.view;
        self.item = (self.view.getChild("item"));
    };
    View_KingShip_Panel.prototype.updateShow = function () {
        this.item.addListen();
    };
    View_KingShip_Panel.prototype.onShown = function () {
        GGlobal.modelKingship.CG_OPENUI_5201();
        this.updateShow();
    };
    View_KingShip_Panel.prototype.onHide = function () {
        if (this.item)
            this.item.removeListen();
        GGlobal.layerMgr.close(UIConst.COUNTRY_KINGSHIP);
    };
    View_KingShip_Panel.URL = "ui://uwzc58nj5vwc2p";
    return View_KingShip_Panel;
}(UIPanelBase));
__reflect(View_KingShip_Panel.prototype, "View_KingShip_Panel");
