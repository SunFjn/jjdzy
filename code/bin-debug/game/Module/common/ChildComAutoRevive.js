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
var ChildComAutoRevive = (function (_super) {
    __extends(ChildComAutoRevive, _super);
    function ChildComAutoRevive() {
        return _super.call(this) || this;
    }
    ChildComAutoRevive.createInstance = function () {
        if (!this._inst) {
            this._inst = (fairygui.UIPackage.createObject("common", "ChildComAutoRevive"));
        }
        return this._inst;
    };
    ChildComAutoRevive.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
    };
    ChildComAutoRevive.prototype.clickHD = function () {
        var sceneType = GGlobal.sceneType;
        var type = this.n0.selected ? 1 : 0;
        switch (sceneType) {
            case SceneCtrl.CAOCAOLAIXI:
                GGlobal.modelCaoCao.CG_CaoCaoCome_isaotufuhuo_8525(type);
                break;
            case SceneCtrl.HFHD_ZFZJ:
                GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_isaotufuhuo_9657(type);
                break;
            case SceneCtrl.LVBU:
                GGlobal.modelBoss.CG_OPEN_AUTO_REVIVE_LVBU(type);
                break;
            case SceneCtrl.MENGHUO:
                GGlobal.modelBoss.CG_OPEN_AUTO_REVIVE_MH(type);
                break;
        }
    };
    ChildComAutoRevive.prototype.updateCB = function (ret) {
        this.n0.selected = ret == 1;
    };
    ChildComAutoRevive.prototype.show1 = function () {
        var self = this;
        if (!self.parent) {
            GGlobal.layerMgr.UI_MainBottom.addChildAt(self, 0);
        }
        self.setXY((fairygui.GRoot.inst.width - self.width - 20) >> 1, fairygui.GRoot.inst.height - 270);
        self.n0.selected = false;
        self.n0.addClickListener(self.clickHD, self);
        GGlobal.control.listen("revieauto", self.updateCB, self);
    };
    ChildComAutoRevive.prototype.hide1 = function () {
        var self = this;
        self.removeFromParent();
        self.n0.removeClickListener(self.clickHD, self);
        GGlobal.control.remove("revieauto", self.updateCB, self);
    };
    ChildComAutoRevive.URL = "ui://jvxpx9emzm7h3gb";
    return ChildComAutoRevive;
}(fairygui.GComponent));
__reflect(ChildComAutoRevive.prototype, "ChildComAutoRevive");
