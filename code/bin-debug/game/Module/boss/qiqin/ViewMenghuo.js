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
var ViewMenghuo = (function (_super) {
    __extends(ViewMenghuo, _super);
    function ViewMenghuo() {
        var _this = _super.call(this) || this;
        _this.setSkin("Boss", "Boss_atlas0", "ViewMenghuo");
        return _this;
    }
    ViewMenghuo.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Child7MengHuo.URL, Child7MengHuo);
        f(MHTargetItem.URL, MHTargetItem);
        f(MengHuoSceneInfo.URL, MengHuoSceneInfo);
        f(MengHuoItem.URL, MengHuoItem);
    };
    ViewMenghuo.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    ViewMenghuo.prototype.onShown = function () {
        var s = this;
        var r = GGlobal.reddot;
        s.n4.open();
    };
    ViewMenghuo.prototype.onHide = function () {
        var s = this;
        s.n4.close();
        var r = GGlobal.reddot;
        GGlobal.layerMgr.close(UIConst.MHBOSS);
    };
    ViewMenghuo.URL = "ui://47jfyc6ehul73c";
    return ViewMenghuo;
}(UIPanelBase));
__reflect(ViewMenghuo.prototype, "ViewMenghuo");
