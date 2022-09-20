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
var View_BaowWu_Use = (function (_super) {
    __extends(View_BaowWu_Use, _super);
    function View_BaowWu_Use() {
        var _this = _super.call(this) || this;
        var a = _this;
        a.isShowOpenAnimation = false;
        a.childrenCreated();
        return _this;
    }
    View_BaowWu_Use.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("role", "View_BaowWu_Use").asCom;
        a.contentPane = a.view;
        CommonManager.parseChildren(a.view, a);
        a.grid0.isShow = false;
        a.grid1.isShow = false;
        a.useBt0.data = 1;
        a.useBt1.data = 2;
        _super.prototype.childrenCreated.call(this);
        a.useBt0.addClickListener(a.useHandle, this);
        a.useBt1.addClickListener(a.useHandle, this);
    };
    View_BaowWu_Use.prototype.useHandle = function (event) {
        var a = this;
        var index = event.target.data;
        var vo = a._args;
        if (vo.id != Model_BaoWu.equipBWIDArr[index - 1]) {
            GGlobal.modelbw.CG_CHANGE_BAOWU(index, vo.id);
            a.doHideAnimation();
        }
        else {
            ViewCommonWarn.text("当前宝物已装备");
        }
    };
    View_BaowWu_Use.prototype.updateShow = function () {
        var a = this;
        a.image0.visible = true;
        a.image1.visible = true;
        if (Model_BaoWu.equipBWIDArr[0] > 0) {
            a.useBt0.checkNotice = false;
            var vo = Model_BaoWu.baowuArr[0];
            a.grid0.vo = vo;
            a.image0.visible = false;
            if (Model_BaoWu.equipBWIDArr[1] > 0) {
                var vo_1 = Model_BaoWu.baowuArr[1];
                a.grid1.vo = vo_1;
                a.image1.visible = false;
                a.useBt1.checkNotice = false;
            }
            else {
                a.grid1.vo = null;
                a.useBt1.checkNotice = Model_BaoWu.checkChangeBtNotice(1);
            }
        }
        else {
            a.grid0.vo = null;
            a.useBt0.checkNotice = Model_BaoWu.checkChangeBtNotice(0);
            if (Model_BaoWu.equipBWIDArr[1] > 0) {
                var vo = Model_BaoWu.baowuArr[0];
                a.grid1.vo = vo;
                a.image1.visible = false;
                a.useBt1.checkNotice = false;
            }
            else {
                a.grid1.vo = null;
                a.useBt1.checkNotice = Model_BaoWu.checkChangeBtNotice(1);
            }
        }
    };
    View_BaowWu_Use.prototype.onShown = function () {
        var a = this;
        a.updateShow();
        GGlobal.control.listen(Enum_MsgType.BAOWU_DATA_UPDATE, a.updateShow, a);
    };
    View_BaowWu_Use.prototype.onHide = function () {
        var a = this;
        GGlobal.layerMgr.close(UIConst.BAOWU_EQUIP);
        GGlobal.control.remove(Enum_MsgType.BAOWU_DATA_UPDATE, a.updateShow, a);
    };
    View_BaowWu_Use.prototype.guide_equip_baowu = function (step) {
        var a = this;
        if (!a.grid0.vo) {
            GuideStepManager.instance.showGuide(a.useBt0, a.useBt0.width / 2, a.useBt0.height / 2);
            GuideStepManager.instance.showGuide1(step.source.index, a.useBt0, a.useBt0.width / 2, a.useBt0.height, 90, -106, 35);
        }
        else {
            GuideStepManager.instance.showGuide(a.useBt1, a.useBt1.width / 2, a.useBt1.height / 2);
            GuideStepManager.instance.showGuide1(step.source.index, a.useBt1, a.useBt1.width / 2, a.useBt1.height, 90, -106, 35);
        }
    };
    View_BaowWu_Use.URL = "ui://3tzqotadqqvu27";
    return View_BaowWu_Use;
}(UIModalPanel));
__reflect(View_BaowWu_Use.prototype, "View_BaowWu_Use");
