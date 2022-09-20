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
/**
 * 红包飘落特效
 */
var TJHBEff = (function (_super) {
    __extends(TJHBEff, _super);
    function TJHBEff() {
        var _this = _super.call(this) || this;
        _this._speed = 10;
        _this.loadRes("ActCom_TJHB", "ActCom_TJHB_atlas0");
        return _this;
    }
    TJHBEff.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("ActCom_TJHB");
        self.isShowMask = false;
        self.view = fairygui.UIPackage.createObject("ActCom_TJHB", "TJHBEff").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    TJHBEff.prototype.onShown = function () {
        var self = this;
        self.eff0.x = 70;
        self.eff0.y = -104;
        self.eff1.x = 275;
        self.eff1.y = -32;
        self.eff2.x = 479;
        self.eff2.y = -69;
        Timer.instance.listen(self.onUpdate, self);
    };
    TJHBEff.prototype.onHide = function () {
        var self = this;
        // self.doHideAnimation();
        Timer.instance.remove(self.onUpdate, self);
        GGlobal.layerMgr.close(UIConst.TJHB_EFF);
    };
    TJHBEff.show = function () {
        if (GGlobal.layerMgr.isOpenView(UIConst.TJHB_EFF))
            return;
        GGlobal.layerMgr.open(UIConst.TJHB_EFF);
    };
    TJHBEff.prototype.onUpdate = function () {
        var self = this;
        self.eff0.y += self._speed;
        self.eff1.y += self._speed;
        self.eff2.y += self._speed;
        if (self.eff0.y >= 1388) {
            // this.onHide();
            self.doHideAnimation();
        }
    };
    TJHBEff.URL = "ui://fm0lrzcteodnv";
    return TJHBEff;
}(UIModalPanel));
__reflect(TJHBEff.prototype, "TJHBEff");
