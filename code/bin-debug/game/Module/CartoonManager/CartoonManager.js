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
var CartoonManager = (function (_super) {
    __extends(CartoonManager, _super);
    function CartoonManager() {
        var _this = _super.call(this) || this;
        _this.isShowOpenAnimation = false;
        _this.isShowMask = false;
        _this.loadRes("CartoonManager", "CartoonManager_atlas0");
        return _this;
        // this.childrenCreated();
    }
    CartoonManager.prototype.childrenCreated = function () {
        GGlobal.createPack("CartoonManager");
        var self = this;
        self.view = fairygui.UIPackage.createObject("CartoonManager", "CartoonManager").asCom;
        self.contentPane = self.view;
        self.backImg = (self.view.getChild("backImg"));
        // ImageLoader.instance.loader(Enum_Path.BACK_URL + "cartoon.jpg", this.backImg);
        IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "cartoon.jpg");
        self.roleImg0 = (self.view.getChild("roleImg0"));
        self.roleImg1 = (self.view.getChild("roleImg1"));
        self.roleImg2 = (self.view.getChild("roleImg2"));
        self.t0 = self.view.getTransition("t0");
        var sc = 1.3;
        self.role1 = UIRole.create();
        self.role1.uiparent = self.roleImg0.displayObject;
        self.role1.setBody(1);
        self.role1.setWeapon(1);
        self.role1.setScaleXY(sc, sc);
        self.role1.onAdd();
        // self.role2 = UIRole.create();
        // self.role2.uiparent = self.roleImg1.displayObject as egret.DisplayObjectContainer;
        // self.role2.setBody(2);
        // self.role2.setWeapon(2);
        // self.role2.setScaleXY(sc, sc);
        // self.role2.onAdd();
        self.role3 = UIRole.create();
        self.role3.uiparent = self.roleImg2.displayObject;
        self.role3.setBody(3);
        self.role3.setWeapon(3);
        self.role3.setScaleXY(sc, sc);
        self.role3.onAdd();
        _super.prototype.childrenCreated.call(this);
        // GGlobal.control.notify(Enum_MsgType.ROLE_CREATE_COMPLETE);
        self.t0.play(self.onComplete, self);
    };
    CartoonManager.prototype.onComplete = function () {
        var self = this;
        switch (ModelLogin.job) {
            case 1:
                self.selImg = self.roleImg0;
                self.role1.onRemove();
                break;
            case 2:
                self.selImg = self.roleImg1;
                self.role2.onRemove();
                break;
            case 3:
                self.selImg = self.roleImg2;
                this.role3.onRemove();
                break;
        }
        self.selImg.setSize(400, 400);
        // ImageLoader.instance.loader(Enum_Path.JUESE_URL + "jump/" + ModelLogin.job + ".png", roleImg);
        IconUtil.setImg(self.selImg, Enum_Path.JUESE_URL + "jump/" + ModelLogin.job + ".png");
        self.selImg.setScale(3 / 4, 3 / 4);
        egret.Tween.get(self.selImg).to({ x: 400, y: -66 }, 1000).call(this.doHideAnimation, this);
        Timer.instance.callLater(self.OnNotify, 700, self);
    };
    CartoonManager.prototype.OnNotify = function () {
        GGlobal.control.notify(Enum_MsgType.CARTONGEND);
    };
    CartoonManager.prototype.onShown = function () {
    };
    CartoonManager.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.CARTOON);
        var s = this;
        IconUtil.setImg(s.backImg, null);
        IconUtil.setImg(s.selImg, null);
        s.role1.onRemove();
        // s.role2.onRemove()
        s.role3.onRemove();
        s.roleImg0.texture = null;
        s.roleImg1.texture = null;
        s.roleImg2.texture = null;
        s.backImg.texture = null;
        s.dispose();
    };
    CartoonManager.URL = "ui://qghqlkzyr80f3";
    return CartoonManager;
}(UIModalPanel));
__reflect(CartoonManager.prototype, "CartoonManager");
