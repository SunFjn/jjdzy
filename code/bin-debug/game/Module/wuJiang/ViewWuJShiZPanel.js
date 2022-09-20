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
var ViewWuJShiZPanel = (function (_super) {
    __extends(ViewWuJShiZPanel, _super);
    function ViewWuJShiZPanel() {
        var _this = _super.call(this) || this;
        _this._tab2CanOpen = false;
        _this.setSkin("wuJiang", "wuJiang_atlas0", "ViewWuJShiZPanel");
        return _this;
    }
    ViewWuJShiZPanel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(ChildShiZhuang.URL, ChildShiZhuang);
        f.setPackageItemExtension(ItemSZ.URL, ItemSZ);
        f.setPackageItemExtension(VWuJiangGrid.URL, VWuJiangGrid);
    };
    ViewWuJShiZPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.frame.getChild("icon").asLoader.url = "ui://zyx92gzwl0xe7";
    };
    ViewWuJShiZPanel.prototype.onChange = function (evt) {
        if (!this._tab2CanOpen) {
            ModuleManager.isOpen(3108, true);
        }
    };
    ViewWuJShiZPanel.prototype.onShown = function () {
        this.addListen();
        this.viewSZ.show(this._args);
    };
    ViewWuJShiZPanel.prototype.onHide = function () {
        this.removeListen();
        this.viewSZ.hide();
    };
    ViewWuJShiZPanel.prototype.addListen = function () {
        ViewWuJiangPanel._selPage = 1;
        this.viewSZ.addEvent();
    };
    ViewWuJShiZPanel.prototype.removeListen = function () {
        GGlobal.layerMgr.close(UIConst.WU_JIANG_SZ);
        this.viewSZ.removeEvent();
    };
    return ViewWuJShiZPanel;
}(UIPanelBase));
__reflect(ViewWuJShiZPanel.prototype, "ViewWuJShiZPanel");
