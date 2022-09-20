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
var UIPanelBase = (function (_super) {
    __extends(UIPanelBase, _super);
    /***传入打包的文件名和图片名字 */
    function UIPanelBase() {
        var _this = _super.call(this) || this;
        _this.isInit = false;
        _this.openLv = 0;
        _this.isShowOpenAnimation = false; //是否显示缩放动画
        _this.isFullScreen = true; //drawcost高的全屏界面设置true
        _this.isShowMask = true;
        _this.lastLifeTime = 0;
        return _this;
    }
    UIPanelBase.prototype.setSkin = function (pkg, atlas, skin) {
        var self = this;
        self.$pkg = pkg;
        self.$atlas = atlas;
        self.$skin = skin;
        if (pkg) {
            RES.getResAsync(pkg, self.fuiCompHandle, self);
        }
        else {
            self.imgCompHandle();
        }
    };
    UIPanelBase.prototype.fuiCompHandle = function (data, key) {
        if (data === void 0) { data = null; }
        if (key === void 0) { key = null; }
        var self = this;
        GGlobal.createPack(self.$pkg);
        if (self.$atlas) {
            RES.getResAsync(self.$atlas, self.imgCompHandle, self);
        }
        else {
            self.imgCompHandle();
        }
    };
    UIPanelBase.prototype.imgCompHandle = function (data, key) {
        if (data === void 0) { data = null; }
        if (key === void 0) { key = null; }
        this.setExtends();
        this.childrenCreated();
    };
    UIPanelBase.prototype.setExtends = function () { };
    UIPanelBase.prototype.initView = function () { };
    UIPanelBase.prototype.childrenCreated = function () {
        var self = this;
        self.view = self.contentPane = fairygui.UIPackage.createObject(self.$pkg, self.$skin).asCom;
        var children = self.view._children;
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            self[child._name] = child;
        }
        var ctrls = self.view.controllers;
        for (var i = 0, len = ctrls.length; i < len; i++) {
            var ctrl = ctrls[i];
            self[ctrl.name] = ctrl;
        }
        this.setPivot(0.5, 0.5);
        if (this.isShowMask) {
            this.modalLayer = new fairygui.GLoader();
            this.modalLayer.fill = fairygui.LoaderFillType.ScaleFree;
            this.modalLayer.url = "ui://jvxpx9emf3sq3dd";
        }
        this.isInit = true;
        this.initView();
        this.show();
    };
    /**显示时播放动画效果*/
    UIPanelBase.prototype.doShowAnimation = function () {
        if (this.isInit) {
            this.resetPosition();
        }
        _super.prototype.doShowAnimation.call(this);
        // if (!this.isShowOpenAnimation) {
        // 	super.doShowAnimation();
        // 	return;
        // }
        // this.scaleX = 0;
        // this.scaleY = 0;
        // egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineIn).call(super.doShowAnimation, this);
    };
    UIPanelBase.prototype.doHideAnimation = function () {
        this.scaleX = 1;
        this.scaleY = 1;
        // if (!this.isShowOpenAnimation) {
        _super.prototype.hideImmediately.call(this);
        // 	return;
        // }
        // egret.Tween.get(this).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.sineIn).call(super.hideImmediately, this);
    };
    UIPanelBase.prototype.defaultHide = function () {
        GGlobal.layerMgr.close(this.panelId);
        this.lastLifeTime = egret.getTimer();
    };
    UIPanelBase.prototype.onShown = function () {
    };
    UIPanelBase.prototype.onHide = function () {
    };
    UIPanelBase.prototype.show = function () {
        var s = this;
        s._isLife = true;
        _super.prototype.show.call(this);
        if (s.modalLayer && this.parent) {
            s.modalLayer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            s.parent.addChildAt(s.modalLayer, s.parent.getChildIndex(s));
        }
        s.resetPosition();
        s.lastLifeTime = egret.getTimer();
        fairygui.GRoot.inst.addEventListener(fairygui.GObject.SIZE_CHANGED, s.resetPosition, s);
    };
    UIPanelBase.prototype.hide = function () {
        _super.prototype.hide.call(this);
        var s = this;
        if (s.modalLayer) {
            s.modalLayer.removeFromParent();
        }
        fairygui.GRoot.inst.removeEventListener(fairygui.GObject.SIZE_CHANGED, s.resetPosition, s);
        s._isLife = false;
    };
    UIPanelBase.prototype.onOpen = function (arg) {
        var s = this;
        s._args = arg;
        if (s.isInit) {
            s.show();
        }
        if (this.isFullScreen)
            GGlobal.setUnitLayerVis(false);
    };
    UIPanelBase.prototype.onClose = function () {
        var s = this;
        if (s.modalLayer) {
            s.modalLayer.removeFromParent();
        }
        if (s.isFullScreen)
            GGlobal.setUnitLayerVis(true);
    };
    UIPanelBase.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
        if (this.modalLayer)
            this.modalLayer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
    };
    UIPanelBase.prototype.clearTextureAndUIPackage = function () {
        var s = this;
        if (s.$pkg) {
            var pkg = GGlobal.packDic[s.$pkg];
            if (pkg) {
                delete GGlobal.packDic[s.$pkg];
            }
            fairygui.UIPackage.removePackage(s.$pkg);
            s.$pkg = null;
        }
        if (s.$atlas) {
            RESManager.destoryRes(s.$atlas);
            s.$atlas = null;
        }
        s.isInit = false;
    };
    UIPanelBase.prototype.dispose = function () {
        this.isInit = false;
        if (!this.displayObject) {
            console.log("界面移除多次" + this.panelId);
        }
        else {
            _super.prototype.dispose.call(this);
        }
        if (this.modalLayer) {
            this.modalLayer.removeFromParent();
        }
    };
    return UIPanelBase;
}(fairygui.Window));
__reflect(UIPanelBase.prototype, "UIPanelBase", ["IUIView"]);
