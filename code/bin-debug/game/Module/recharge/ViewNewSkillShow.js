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
var ViewNewSkillShow = (function (_super) {
    __extends(ViewNewSkillShow, _super);
    function ViewNewSkillShow() {
        var _this = _super.call(this) || this;
        _this.loadRes("shouchong", "shouchong_atlas0");
        return _this;
    }
    ViewNewSkillShow.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouchong", "ViewNewSkillShow"));
    };
    ViewNewSkillShow.prototype.childrenCreated = function () {
        GGlobal.createPack("shouchong");
        var s = this;
        s.contentPane = fairygui.UIPackage.createObject("shouchong", "ViewNewSkillShow").asCom;
        s.view = s.contentPane;
        this.closeButton = s.btnHand = (s.view.getChild("btnHand"));
        this.closeButton.visible = false;
        _super.prototype.childrenCreated.call(this);
    };
    ViewNewSkillShow.prototype.onCloseHD = function () {
        GGlobal.layerMgr.close2(UIConst.SHENJIAN_GETTER);
    };
    ViewNewSkillShow.prototype.onShown = function () {
        this.eff = EffectMgr.addEff("uieff/10000", this.displayListContainer, 220, 300, 800, -1, true);
        this.btnHand.addClickListener(this.onCloseHD, this);
    };
    ViewNewSkillShow.prototype.onHide = function () {
        this.btnHand.removeClickListener(this.onCloseHD, this);
        GGlobal.layerMgr.close(UIConst.SHENJIAN_GETTER);
        if (this.eff) {
            EffectMgr.instance.removeEff(this.eff);
            this.eff = null;
        }
    };
    ViewNewSkillShow.URL = "ui://zzz8io3rbvbpl";
    return ViewNewSkillShow;
}(UIModalPanel));
__reflect(ViewNewSkillShow.prototype, "ViewNewSkillShow");
