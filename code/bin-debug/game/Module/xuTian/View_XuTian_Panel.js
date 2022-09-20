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
var View_XuTian_Panel = (function (_super) {
    __extends(View_XuTian_Panel, _super);
    function View_XuTian_Panel() {
        var _this = _super.call(this) || this;
        _this.setSkin("xuTian", "xuTian_atlas0", "View_XuTian_Panel");
        return _this;
    }
    View_XuTian_Panel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(Child_XuTian.URL, Child_XuTian);
        f.setPackageItemExtension(VXuTianHunt.URL, VXuTianHunt);
    };
    View_XuTian_Panel.prototype.onShown = function () {
        var s = this;
        s.xuT.openPanel();
    };
    View_XuTian_Panel.prototype.onHide = function () {
        var s = this;
        s.xuT.closePanel();
    };
    return View_XuTian_Panel;
}(UIPanelBase));
__reflect(View_XuTian_Panel.prototype, "View_XuTian_Panel");
