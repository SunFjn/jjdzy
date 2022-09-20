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
var GuanQiaBossAni = (function (_super) {
    __extends(GuanQiaBossAni, _super);
    function GuanQiaBossAni() {
        var _this = _super.call(this) || this;
        _this.isShowMask = false;
        _this.touchable = false;
        _this.loadRes("guanqia", "guanqia_atlas0");
        return _this;
    }
    GuanQiaBossAni.createInstance = function () {
        return (fairygui.UIPackage.createObject("guanqia", "GuanQiaBossAni"));
    };
    GuanQiaBossAni.prototype.childrenCreated = function () {
        GGlobal.createPack("guanqia");
        var a = this;
        a.view = fairygui.UIPackage.createObject("guanqia", "GuanQiaBossAni").asCom;
        a.contentPane = a.view;
        this.n0 = (a.view.getChild("n0"));
        a.t0 = a.view.getTransition("t0");
        _super.prototype.childrenCreated.call(this);
    };
    GuanQiaBossAni.prototype.onShown = function () {
        var url;
        if (GGlobal.modelGuanQia.hasSurprise) {
            url = Enum_Path.PIC_URL + "guanqiaboss1.png";
        }
        else {
            url = Enum_Path.PIC_URL + "guanqiaboss.png";
        }
        IconUtil.setImg1(url, this.n0);
        this.t0.play();
        Timer.instance.callLater(this.close234, 2000, this);
    };
    GuanQiaBossAni.prototype.close234 = function () {
        GGlobal.layerMgr.close2(UIConst.BOSSANI);
    };
    GuanQiaBossAni.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.BOSSANI);
        IconUtil.setImg1(null, this.n0);
    };
    GuanQiaBossAni.URL = "ui://r92dp953v2391v";
    return GuanQiaBossAni;
}(UIModalPanel));
__reflect(GuanQiaBossAni.prototype, "GuanQiaBossAni");
