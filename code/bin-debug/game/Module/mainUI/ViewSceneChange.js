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
var ViewSceneChange = (function (_super) {
    __extends(ViewSceneChange, _super);
    function ViewSceneChange() {
        var _this = _super.call(this) || this;
        _this._sx = 0;
        _this._sy = 0;
        _this.loadRes();
        return _this;
    }
    ViewSceneChange.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "ViewSceneChange"));
    };
    ViewSceneChange.prototype.childrenCreated = function () {
        this.isShowOpenAnimation = false;
        this.view = fairygui.UIPackage.createObject("MainUI", "ViewSceneChange").asCom;
        this.contentPane = this.view;
        this.isShowMask = false;
        this.loadbg = (this.view.getChild("loadbg"));
        ImageLoader.instance.loader(Enum_Path.BACK_URL + "loading.png", this.loadbg);
        this.loadbg.visible = false;
        _super.prototype.childrenCreated.call(this);
    };
    ViewSceneChange.prototype.onShown = function () {
        this.loadbg.visible = true;
        this.loadbg.setScale(1, 10);
        egret.Tween.get(this).wait(10).to({ sx: 40, sy: 50 }, 300).to({ sy: 1 }, 200).call(this.doHideAnimation, this);
    };
    Object.defineProperty(ViewSceneChange.prototype, "sx", {
        get: function () {
            return this._sx;
        },
        set: function (val) {
            this.loadbg.scaleX = val;
            this._sx = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewSceneChange.prototype, "sy", {
        get: function () {
            return this._sy;
        },
        set: function (val) {
            this.loadbg.scaleY = val;
            this._sy = val;
        },
        enumerable: true,
        configurable: true
    });
    ViewSceneChange.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.SCENELOADING);
        // egret.Tween.removeTweens(this);
    };
    ViewSceneChange.URL = "ui://7gxkx46wklpn2z";
    return ViewSceneChange;
}(UIModalPanel));
__reflect(ViewSceneChange.prototype, "ViewSceneChange");
