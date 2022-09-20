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
var ViewBossAppear = (function (_super) {
    __extends(ViewBossAppear, _super);
    function ViewBossAppear() {
        var _this = _super.call(this) || this;
        _this.setSkin("Boss", "Boss_atlas0", "ViewBossAppear");
        return _this;
    }
    ViewBossAppear.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "ViewBossAppear"));
    };
    ViewBossAppear.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.imgText.y = 3;
        this.resetPosition();
    };
    ViewBossAppear.prototype.onShown = function () {
        this.setTitle(this._args);
        this.resetPosition();
    };
    ViewBossAppear.prototype.setTitle = function (arg) {
        if (arg == 1) {
            this.imgText.texture = fairygui.UIPackage.getItemByURL("ui://47jfyc6ejb04b").texture;
        }
        else {
            this.imgText.texture = fairygui.UIPackage.getItemByURL("ui://47jfyc6ejb04c").texture;
        }
        this.alpha = 0.7;
        egret.Tween.get(this).to({ alpha: 1 }, 2000, this.EASE).to({ alpha: 0 }, 200).call(this.closeHandler1, this);
    };
    ViewBossAppear.prototype.closeHandler1 = function () {
        egret.Tween.removeTweens(this);
        GGlobal.layerMgr.close(UIConst.BOSSAPPEAR);
    };
    ViewBossAppear.prototype.EASE = function (perc) {
        return Math.sin(perc * Math.PI * 6);
    };
    ViewBossAppear.prototype.resetPosition = function () {
        this.x = (App.stage.stageWidth - 450) / 2 >> 0;
        this.y = 176;
    };
    ViewBossAppear.URL = "ui://47jfyc6etujy9";
    return ViewBossAppear;
}(UIPanelBase));
__reflect(ViewBossAppear.prototype, "ViewBossAppear");
