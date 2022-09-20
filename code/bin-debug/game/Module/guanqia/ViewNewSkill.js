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
var ViewNewSkill = (function (_super) {
    __extends(ViewNewSkill, _super);
    function ViewNewSkill() {
        var _this = _super.call(this) || this;
        _this.isShowOpenAnimation = false;
        _this.loadRes("guanqia", "guanqia_atlas0");
        return _this;
    }
    ViewNewSkill.createInstance = function () {
        return (fairygui.UIPackage.createObject("guanqia", "ViewNewSkill"));
    };
    ViewNewSkill.prototype.childrenCreated = function () {
        GGlobal.createPack("guanqia");
        var s = this;
        s.view = fairygui.UIPackage.createObject("guanqia", "ViewNewSkill").asCom;
        s.contentPane = s.view;
        s.n0 = (s.view.getChild("n0"));
        s.headImg = (s.view.getChild("headImg"));
        s.lbName = (s.view.getChild("lbName"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewNewSkill.prototype.onShown = function () {
        var vo = this._args;
        var midX = (640 - this.width) >> 1;
        var lib = vo.cfg;
        IconUtil.setImg1(Enum_Path.PIC_URL + "skillbg.png", this.n0);
        IconUtil.setImg(this.headImg, Enum_Path.SKILL_URL + lib.icon + ".png");
        this.lbName.text = lib.n;
        var endX = -this.width;
        this.setXY(640 + this.width, App.stage.stageHeight * 0.6);
        egret.Tween.get(this).to({ x: midX }, 300, egret.Ease.backInOut).wait(1000).to({ x: endX }, 300, egret.Ease.backIn).call(this.closeHD, this);
    };
    ViewNewSkill.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.NEWSKILL);
        IconUtil.setImg(this.headImg, null);
        IconUtil.setImg1(null, this.n0);
        IconUtil.setImg(this.headImg, null);
    };
    ViewNewSkill.prototype.closeHD = function () {
        this.doHideAnimation();
    };
    ViewNewSkill.URL = "ui://r92dp953h0ag1q";
    return ViewNewSkill;
}(UIModalPanel));
__reflect(ViewNewSkill.prototype, "ViewNewSkill");
