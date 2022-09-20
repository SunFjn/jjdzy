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
var View_NZBZ_Panel = (function (_super) {
    __extends(View_NZBZ_Panel, _super);
    function View_NZBZ_Panel() {
        var _this = _super.call(this) || this;
        _this.setSkin("nzbz", "nzbz_atlas0", "View_NZBZ_Panel");
        return _this;
    }
    View_NZBZ_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(Child_NZBZ.URL, Child_NZBZ);
        fairygui.UIObjectFactory.setPackageItemExtension(NZBZ_Item.URL, NZBZ_Item);
        fairygui.UIObjectFactory.setPackageItemExtension(NZBZHead.URL, NZBZHead);
    };
    View_NZBZ_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    View_NZBZ_Panel.prototype.controllerHandler = function () {
        this.updateShow();
    };
    View_NZBZ_Panel.prototype.updateShow = function () {
        this.item0.show();
    };
    View_NZBZ_Panel.prototype.onShown = function () {
        GGlobal.modelnzbz.CG_OPEN_NZBZ();
        GGlobal.reddot.listen(ReddotEvent.CHECK_NZBZ, this.updateShow, this);
    };
    View_NZBZ_Panel.prototype.onHide = function () {
        this.item0.clean();
        GGlobal.layerMgr.close(UIConst.NANZHENG_BEIZHAN);
        GGlobal.reddot.remove(ReddotEvent.CHECK_NZBZ, this.updateShow, this);
    };
    View_NZBZ_Panel.prototype.guide_NZBZ_battle = function (step) {
        this.item0.guide_NZBZ_battle(step);
    };
    View_NZBZ_Panel.prototype.guideClosePanel = function (step) {
        var btn = this.closeButton.asButton;
        GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
        GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
    };
    View_NZBZ_Panel.URL = "ui://xzyn0qe3nb1u0";
    return View_NZBZ_Panel;
}(UIPanelBase));
__reflect(View_NZBZ_Panel.prototype, "View_NZBZ_Panel");
