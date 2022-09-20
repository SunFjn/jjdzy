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
var ViewSGWardPool = (function (_super) {
    __extends(ViewSGWardPool, _super);
    function ViewSGWardPool() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        _this.isShowOpenAnimation = false;
        return _this;
    }
    ViewSGWardPool.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewSGWardPool"));
    };
    ViewSGWardPool.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        var a = this;
        a.view = fairygui.UIPackage.createObject("Arena", "ViewSGWardPool").asCom;
        var b = a.contentPane = a.view;
        a.frame = (b.getChild("frame"));
        a.i0 = (b.getChild("i0"));
        a.i0.setIndex(1);
        a.i1 = (b.getChild("i1"));
        a.i1.setIndex(2);
        a.i2 = (b.getChild("i2"));
        a.i2.setIndex(3);
        a.i3 = (b.getChild("i3"));
        a.i3.setIndex(4);
        a.cards = [a.i0, a.i1, a.i2, a.i3];
        a.frame = (b.getChild("frame"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewSGWardPool.prototype.update = function () {
        var a = this;
        for (var i = 0; i < a.cards.length; i++) {
            a.cards[i].update();
        }
    };
    ViewSGWardPool.prototype.onShown = function () {
        var a = this;
        GGlobal.modelsgws.CG_POOL_1835();
        GGlobal.control.listen(Enum_MsgType.SGWS_POOL, a.update, a);
    };
    ViewSGWardPool.prototype.onHide = function () {
        var a = this;
        GGlobal.control.remove(Enum_MsgType.SGWS_POOL, a.update, a);
        GGlobal.layerMgr.close(UIConst.SGWS_POOL);
    };
    ViewSGWardPool.URL = "ui://me1skowl608aw";
    return ViewSGWardPool;
}(UIModalPanel));
__reflect(ViewSGWardPool.prototype, "ViewSGWardPool");
